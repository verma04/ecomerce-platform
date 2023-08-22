import db from "db/db";

async function main() {
  const user = await db.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log(user);
}

main();
