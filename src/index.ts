import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
const swaggerFile = require('./swagger/swagger-output.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log("API documentation: http://localhost:3000/docs");
});
