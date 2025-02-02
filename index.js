import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import Routes from "./src/routes/index.js"
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(Routes);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
