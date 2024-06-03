import { Prisma } from "@/db";
import { Injectable, OnModuleInit } from "@nestjs/common";

import { PrismaService } from "../prisma";
import { NewsElasticService } from "./news-elastic.service";

@Injectable()
export class NewsService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private readonly newsElasticService: NewsElasticService,
  ) {}

  async count<T extends Prisma.NewsCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.NewsCountArgs>,
  ) {
    return await this.prisma.news.count(countData);
  }

  async create<T extends Prisma.NewsCreateArgs>(
    createData: Prisma.SelectSubset<T, Prisma.NewsCreateArgs>,
  ) {
    const news = await this.prisma.news.create(createData);

    const elasticNews = await this.prisma.news.findUnique({
      include: { tags: true },
      where: { id: news.id },
    });
    if (!elasticNews) return news;
    await this.newsElasticService.index(elasticNews);

    return news;
  }

  async createMany(newsItems: Prisma.NewsCreateManyInput[]) {
    // Prisma do not return created items on createMany, so I use transaction
    // 🤡🤡🤡

    const itemsToCreate = [];

    for (const newsItem of newsItems) {
      const itemInDb = await this.getOne({ where: { externalId: newsItem.externalId } });
      if (itemInDb) continue;

      const isInList = Boolean(itemsToCreate.find(item => item.externalId === newsItem.externalId));
      if (isInList) continue;

      itemsToCreate.push(newsItem);
    }

    const news = await this.prisma.$transaction(
      itemsToCreate.map(newsItem =>
        this.prisma.news.create({ data: newsItem, select: { id: true } }),
      ),
    );

    const elasticNews = await this.prisma.news.findMany({
      include: { tags: true },
    });
    if (!elasticNews) return news;
    await this.newsElasticService.indexMany(elasticNews);

    return news;
  }

  async delete<T extends Prisma.NewsDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.NewsDeleteArgs>,
  ) {
    const deletedNews = await this.prisma.news.delete(deleteData);
    await this.newsElasticService.delete(deletedNews.id);
    return deletedNews;
  }

  async get<T extends Prisma.NewsFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.NewsFindManyArgs>,
  ) {
    return await this.prisma.news.findMany(getData);
  }

  async getOne<T extends Prisma.NewsFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.NewsFindUniqueArgs>,
  ) {
    return await this.prisma.news.findUnique(getData);
  }

  async onModuleInit() {
    // Well, I just remove all index and then create it from scratch on module init
    // in order to keep postgres and elastic data synced
    // Maybe, it will be better to check created/updated/deleted items and do partial updates
    // But it will be more much more code and potentially has a lot of bugs
    await this.newsElasticService.clear();

    const news = await this.prisma.news.findMany({
      include: { tags: true },
    });

    if (!news.length) return;

    await this.newsElasticService.indexMany(news);
  }

  async update<T extends Prisma.NewsUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.NewsUpdateArgs>,
  ) {
    const news = await this.prisma.news.update(updateData);

    const elasticNews = await this.prisma.news.findUnique({
      include: { tags: true },
      where: { id: news.id },
    });
    if (!elasticNews) return news;
    await this.newsElasticService.update(elasticNews.id, elasticNews);

    return news;
  }
}
