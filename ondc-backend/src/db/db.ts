import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

import { users } from "../schema/users";

dotenv.config();

const pool = new Pool({
  connectionString:
    "postgresql://postgres:iChPNZUKH8y9cu1l@db.icsiffdsxhtactvsszva.supabase.co:5432/postgres",
});

export const db = drizzle(pool);
