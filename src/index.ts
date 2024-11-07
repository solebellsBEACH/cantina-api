import swaggerUi from 'swagger-ui-express';
import express, { NextFunction, Request, Response } from 'express';
import router from './routes';
const swaggerFile = require('./swagger/swagger-output.json');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});
;
// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json())
app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:3000/ and Swagger in http://localhost:3000/docs`);
});