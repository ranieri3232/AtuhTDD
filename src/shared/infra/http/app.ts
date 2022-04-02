import express, { Response, Request } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'api is working' });
  return 0;
});

export { app };
