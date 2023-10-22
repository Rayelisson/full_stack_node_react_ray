
import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import notesRoutes from "./routes/notes"
const app = express();

app.use(express.json())

app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
     next(Error("Endpoint not found"))
})





// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request , res: Response, next: NextFunction) => {
     console.log(error)
     let errorMessage = "An unknown error occurred"
     if (error instanceof Error) errorMessage = error.message
     res.status(500).json({error: errorMessage})
});

export default app;
