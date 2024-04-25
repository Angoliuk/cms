import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();

  if (usersCount < 1) return;

  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: "123123123",
    },
  });
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
