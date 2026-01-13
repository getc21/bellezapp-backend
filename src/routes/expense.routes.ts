import express from 'express';
import * as expenseController from '../controllers/expense.controller';
import { authenticateToken } from '../middleware/auth';
import { validateStoreAccess, validateStoreAccessIfProvided } from '../middleware/storePermission';

const router = express.Router();

router.use(authenticateToken);

// 📊 RUTAS DE REPORTES (REQUIEREN storeId OBLIGATORIO)
router.get('/reports', validateStoreAccess, expenseController.getExpenseReport);
router.get('/reports/compare', validateStoreAccess, expenseController.compareExpensePeriods);

// 🏷️ CATEGORÍAS DE GASTOS
router.get('/categories', validateStoreAccessIfProvided, expenseController.getExpenseCategories);
router.post('/categories', validateStoreAccess, expenseController.createExpenseCategory);

// 📋 GASTOS CRUD
router.get('/', validateStoreAccessIfProvided, expenseController.getExpenses);
router.post('/', validateStoreAccess, expenseController.createExpense);
router.patch('/:id', validateStoreAccessIfProvided, expenseController.updateExpense);
router.delete('/:id', validateStoreAccessIfProvided, expenseController.deleteExpense);

export default router;
