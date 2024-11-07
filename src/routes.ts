import { Router } from 'express';
import { ProductController } from './core/controllers/products.controllers';
import { ProductService } from './core/services/products.service';
import { UserService } from './core/services/user.service';
import { UserController } from './core/controllers/user.controllers';

const router = Router();
const productController = new ProductController(new ProductService());
const userController = new UserController(new UserService());

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

export default router;