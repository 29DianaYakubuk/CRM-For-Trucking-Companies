import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/items.routes';
import { notFound, errorHandler } from './middleware/error';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
});