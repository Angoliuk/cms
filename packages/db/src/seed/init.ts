import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();

  console.log("Current users count: ", usersCount);

  if (usersCount === 0) {
    const passwordHash = await argon2.hash("123123123");
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: passwordHash,
      },
    });
  }

  const configsCount = await prisma.promotionConfig.count();

  if (configsCount === 0) {
    await prisma.promotionConfig.createMany({
      data: [
        { location: "LIST", promotionsPerPage: 2 },
        { location: "SEARCH", promotionsPerPage: 2 },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
