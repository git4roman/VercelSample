import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

app.use(cors());

let dataStore = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/data", (req, res) => {
  res.json(dataStore);
});

app.post("/api/data", (req, res) => {
  const newData = req.body;
  dataStore.push(newData);
  res.status(201).json(newData);
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
