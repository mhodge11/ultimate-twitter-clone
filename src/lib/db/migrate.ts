import { db } from "@/lib/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async () => {
  console.log("migrations running...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration finishied!!");
};

main()
  .then(() => {
    console.log("finished");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit();
  });
