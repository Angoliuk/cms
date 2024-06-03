import { GetNewsQuerySchema } from "@/cms-shared/validation";
import { CountRequest, SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { NEWS_VISIBILITY } from "@prisma/client";

import { INDEXES } from "../modules/elasticsearch";
import { getElasticPaginationSelectFromQuery } from "./format-query-pagination";

export const getElasticNewsQuery = ({
  limit,
  onlyVisible = true,
  orderBy,
  page,
  search,
  tags,
}: { onlyVisible?: boolean; search?: string; tags?: string[] } & GetNewsQuerySchema): {
  countQuery: CountRequest;
  searchQuery: SearchRequest;
} => {
  const should = [];
  const must = [];
  const mustNot = [];

  if (search) {
    should.push({
      multi_match: {
        fields: ["title^3", "description"],
        fuzziness: "AUTO",
        query: search,
      },
    });
  }

  if (tags) {
    must.push({
      terms: {
        "tags.name.keyword": tags,
      },
    });
  }

  if (onlyVisible) {
    must.push({ term: { isDraft: false } });
    mustNot.push(
      {
        exists: {
          field: "deletedAt",
        },
      },
      { term: { visibility: NEWS_VISIBILITY.HIDDEN } },
    );
  }

  let baseQuery: CountRequest = {
    index: INDEXES.NEWS,
  };

  if (should.length) {
    baseQuery = {
      ...baseQuery,
      query: {
        ...(baseQuery?.query ?? {}),
        bool: {
          ...(baseQuery?.query?.bool ?? {}),
          minimum_should_match: should.length > 0 ? 1 : 0,
          should,
        },
      },
    };
  }

  if (must.length) {
    baseQuery = {
      ...baseQuery,
      query: {
        ...(baseQuery?.query ?? {}),
        bool: {
          ...(baseQuery?.query?.bool ?? {}),
          must,
        },
      },
    };
  }

  if (mustNot.length) {
    baseQuery = {
      ...baseQuery,
      query: {
        ...(baseQuery?.query ?? {}),
        bool: {
          ...(baseQuery?.query?.bool ?? {}),
          must_not: mustNot,
        },
      },
    };
  }

  const searchQuery: SearchRequest = {
    sort: orderBy,
    ...baseQuery,
    ...getElasticPaginationSelectFromQuery(page, limit),
  };

  return { countQuery: baseQuery, searchQuery };
};

export const getElasticPromotionsRegExpQuery = ({
  limit,
  onlyVisible = true,
  page,
  search,
}: {
  limit: number;
  onlyVisible?: boolean;
  page: number;
  search: string;
}): {
  countQuery: CountRequest;
  searchQuery: SearchRequest;
} => {
  const should = [
    {
      regexp: {
        search: {
          case_insensitive: true,
          flags: "ALL",
          value: search,
        },
      },
    },
  ];
  const must = [];

  if (onlyVisible) {
    must.push({ term: { isDraft: false } });
  }

  let baseQuery: CountRequest = {
    index: INDEXES.PROMOTIONS,
  };

  if (should.length) {
    baseQuery = {
      ...baseQuery,
      query: {
        ...(baseQuery?.query ?? {}),
        bool: {
          ...(baseQuery?.query?.bool ?? {}),
          minimum_should_match: should.length > 0 ? 1 : 0,
          should,
        },
      },
    };
  }

  if (must.length) {
    baseQuery = {
      ...baseQuery,
      query: {
        ...(baseQuery?.query ?? {}),
        bool: {
          ...(baseQuery?.query?.bool ?? {}),
          must,
        },
      },
    };
  }

  const searchQuery: SearchRequest = {
    ...baseQuery,
    ...getElasticPaginationSelectFromQuery(page, limit),
  };

  return { countQuery: baseQuery, searchQuery };
};
