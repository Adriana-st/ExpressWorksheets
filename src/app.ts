import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { logger } from "./middleware/logging.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';


export const app: Application = express();
app.use(logger);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/cars', carRoutes);


app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Adriana"
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

