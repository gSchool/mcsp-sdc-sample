import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const client = createClient();
const app = express();

await client.connect();

app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  // if ((await client.exists("all_tasks")) === 1) {
  //   const tasks = await client.get("all_tasks");
  //   console.log("using tasks from cache");
  //   res.send(JSON.parse(tasks));
  // } else {
  sql`SELECT * FROM tasks`.then((rows) => {
    console.log("using tasks from db");
    client.set("all_tasks", JSON.stringify(rows));
    res.send(rows);
  });
  // }
});

app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  sql`SELECT * FROM tasks WHERE id = ${id}`.then((rows) => {
    res.send(rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
