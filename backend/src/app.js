import express, { application } from "express";

import userRoutes from "./routes/user";
import loginRoutes from "./routes/login";
import productRoutes from "./routes/product";
import clientRoutes from "./routes/client.routes";



import path from "path";
import morgan from "morgan";
import cors from "cors";
import { upload } from "./middleware/storage";


const app = express();


//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(upload)
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/product", productRoutes);
app.use("/api/client", clientRoutes);


//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
