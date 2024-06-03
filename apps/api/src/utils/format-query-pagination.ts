export const getPaginationSelectFromQuery = (page: number, limit: number) => {
  return { skip: (page - 1) * limit, take: limit };
};

export const getElasticPaginationSelectFromQuery = (page: number, limit: number) => {
  return { from: (page - 1) * limit, size: limit };
};
