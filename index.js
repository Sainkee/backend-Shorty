import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./models/route/route.js";
import dbConnect from "./dbConnect.js";



const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Use the router for the /shorten route
app.use("/", router);
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
