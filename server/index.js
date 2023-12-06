import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL } = process.env;

const db = new pg.Client({ connectionString: DATABASE_URL });

const client = createClient();
const app = express();

await db.connect();
await client.connect();

app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  if ((await client.exists("all_tasks")) === 1) {
    const tasks = await client.get("all_tasks");
    res.send(JSON.parse(tasks));
  } else {
    db.query("SELECT * FROM tasks").then((result) => {
      client.set("all_tasks", JSON.stringify(result.rows));
      res.send(result.rows);
    });
  }
});

app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM tasks WHERE id = $1", [id]).then((result) => {
    console.log(result);
    res.send(result.rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
