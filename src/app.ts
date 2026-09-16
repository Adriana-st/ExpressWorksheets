import express, {Application, Request, Response} from "express" ;

const PORT = process.env.PORT || 3000;

const app: Application = express();

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

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });
