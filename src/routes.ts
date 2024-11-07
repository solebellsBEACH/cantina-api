import { Router } from 'express';
import { ProductController } from './core/controllers/products.controllers';
import { ProductService } from './core/services/products.service';

export const router = Router();
const productController = new ProductController(new ProductService());

// Product Routes
router.post('/products', productController.create.bind(productController));
router.get('/products', productController.getAll.bind(productController));
router.get('/products/:id', productController.getById.bind(productController));
router.put('/products/:id', productController.update.bind(productController));
router.delete('/products/:id', productController.delete.bind(productController));

