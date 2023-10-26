

import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import notesRoutes from "./routes/notes"
import userRoutes from "./routes/user"
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
const app = express();

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/users", userRoutes)
app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
     next(createHttpError(404,"Endpoint not found"))
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request , res: Response, next: NextFunction) => {
     console.log(error)
     let errorMessage = "An unknown error occurred"
     let statusCode = 500
     if (isHttpError(error)) {
           statusCode = error.status
           errorMessage = error.message
     } 
     res.status(statusCode).json({error: errorMessage})
});

export default app;
