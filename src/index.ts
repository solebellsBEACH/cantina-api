import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});

app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});