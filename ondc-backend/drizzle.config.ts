import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "./src/schema.ts",
  out: "./drizzle/migrations",
  driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "db.icsiffdsxhtactvsszva.supabase.co",
    user: "postgres",
    password: "iChPNZUKH8y9cu1l",
    database: "postgres",
  },
} satisfies Config;
