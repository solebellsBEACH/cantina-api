import { Router } from 'express';
import { ProductController } from './core/controllers/products.controllers';
import { ProductService } from './core/services/products.service';
import { UserController } from './core/controllers/user.controllers';
import { UserService } from './core/services/user.service';
import { CategoryController } from './core/controllers/category.controllers';
import { CategoryService } from './core/services/category.service';

const router = Router();

// Criação de instâncias dos controladores
const productController = new ProductController(new ProductService());
const userController = new UserController(new UserService());
const categoryController = new CategoryController(new CategoryService());

// Product Routes
router.post('/products', productController.create.bind(productController));
router.get('/products', productController.getAll.bind(productController));
router.get('/products/:id', productController.getById.bind(productController));
router.put('/products/:id', productController.update.bind(productController));
router.delete('/products/:id', productController.delete.bind(productController));

// User Routes
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));

// Category Routes
router.post('/categories', categoryController.create.bind(categoryController));
router.get('/categories', categoryController.getCategories.bind(categoryController));
router.get('/categories/:id', categoryController.getCategoryById.bind(categoryController));
router.put('/categories/:id', categoryController.update.bind(categoryController));
router.delete('/categories/:id', categoryController.delete.bind(categoryController));

export default router;
