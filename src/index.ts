import express from "express";
import { router } from "./routes/login";
import cookieSession from "cookie-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["teststring"] }));
app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
