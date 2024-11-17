import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// app.use(cors(corsOptions));
const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

const port = 5000;

// Sample data
let users = [
  { id: 1, name: "Nisung Kerung" },
  { id: 2, name: "Biddhan Pokhrel" },
  { id: 3, name: "Roman Ghimire" },
];

app.get("/api/v1/users", (req, res) => {
  res.json(users);
});
app.post("/api/v1/users", (req, res) => {
  const { name } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  res.status(200).json({ msg: newUser });
});

app.use("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
