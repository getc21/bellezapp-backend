import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';

// Import POS routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import storeRoutes from './routes/store.routes';
import categoryRoutes from './routes/category.routes';
import supplierRoutes from './routes/supplier.routes';
import locationRoutes from './routes/location.routes';
import productRoutes from './routes/product.routes';
import customerRoutes from './routes/customer.routes';
import discountRoutes from './routes/discount.routes';
import orderRoutes from './routes/order.routes';
import cashRoutes from './routes/cash.routes';
import financialRoutes from './routes/financial.routes';
import expenseRoutes from './routes/expense.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: '*', // Temporarily allow all origins for debugging
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['x-access-token', 'x-auth-token'],
  maxAge: 3600,
  optionsSuccessStatus: 200
};

// Middleware - CORS MUST come first, before helmet
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bellezapp POS Backend is running' });
});

// POS API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handling
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

