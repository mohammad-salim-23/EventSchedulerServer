import express, { Request, Response } from "express";
import cors from 'cors';
import router from "./app/routers";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
  ],
  credentials:true
}));


app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Alhamdulilah Server is running....' });
});


app.use(globalErrorHandler)

export default app;
