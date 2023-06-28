import { faker } from "@faker-js/faker";
import postgres from "postgres";
import fs from "fs";

const sql = postgres("postgres://localhost:5432/todo");
const writableStream = fs.createWriteStream("data.csv");

await sql`DELETE FROM tasks`;

for (let i = 0; i < 1_000; i++) {
  const description = faker.lorem.words();
  const priority = faker.number.int({ min: 1, max: 3 });

  writableStream.write(`${description}, ${priority}\n`);
}

writableStream.close();
sql.end();

// await sql`COPY tasks (description, priority) FROM '/Users/danny/Code/work/projects/fec/data.csv' WITH DELIMITER ',' CSV`;
