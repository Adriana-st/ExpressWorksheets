import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";

const port = env.port;

const app: Application = express();

app.use('/api/v1/cars', carRoutes);
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Adriana "
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({
    message: "this is bananas",
    });
});

app.get('/apples', async (_req : Request, res: Response) => {
    res.json({
    message: "this is apples",
    });
});

app.get('/oranges', async (_req : Request, res: Response) => {
    res.json({
    message: "this is oranges",
    });
});

app.listen(port, () => {
    console.log("Server is running on port", port);
    });
