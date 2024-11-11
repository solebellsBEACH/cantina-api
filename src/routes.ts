import { Router } from 'express';
import { ProductController } from './core/controllers/products.controllers';
import { ProductService } from './core/services/products.service';
import { UserController } from './core/controllers/user.controllers';
import { UserService } from './core/services/user.service';
import { CategoryController } from './core/controllers/category.controllers';
import { CategoryService } from './core/services/category.service';
import { OrderController } from './core/controllers/orders.controllers';
import { OrderService } from './core/services/orders.service';

const router = Router();

// Criação de instâncias dos controladores
const productController = new ProductController(new ProductService());
const userController = new UserController(new UserService());
const categoryController = new CategoryController(new CategoryService());
const orderController = new OrderController(new OrderService());


// Product Routes
router.post('/products', productController.create.bind(productController));
router.get('/products', productController.getAll.bind(productController));
router.get('/products/:id', productController.getById.bind(productController));
router.put('/products/:id', productController.update.bind(productController));
router.delete('/products/:id', productController.delete.bind(productController));

// User Routes
router.get('/user', userController.getUser.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));
router.post('/buyFood/:id', userController.buyFood.bind(userController));

// Category Routes
router.post('/categories', categoryController.create.bind(categoryController));
router.get('/categories', categoryController.getCategories.bind(categoryController));
router.get('/categories/:id', categoryController.getCategoryById.bind(categoryController));
router.put('/categories/:id', categoryController.update.bind(categoryController));
router.delete('/categories/:id', categoryController.delete.bind(categoryController));


router.post('/orders', orderController.create.bind(orderController));
router.get('/orders/:id', orderController.getOrderById.bind(orderController));
router.get('/orders', orderController.getOrders.bind(orderController));
router.get('/ordersByUser/:id', orderController.getOrderUser.bind(orderController));
router.put('/orders/:id', orderController.updateStatus.bind(orderController));
router.delete('/orders/:id', orderController.delete.bind(orderController));

export default router;
