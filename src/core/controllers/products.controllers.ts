import { Request, Response } from 'express';
import { ProductService } from '../services/products.service';
import { CreateProductDto } from '../dtos/Product/CreateProductDto';
import { UpdateProductDto } from '../dtos/Product/UpdateProductDto';

export class ProductController {
    constructor(private productService: ProductService) { }

    async create(req: Request, res: Response) {
        const data: CreateProductDto = req.body;
        const product = await this.productService.createProduct(data);
        res.status(201).json(product);
    }

    async getAll(req: Request, res: Response) {
        res.json({ message: "Welcome to the Cantina API!" });
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const product = await this.productService.getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data: UpdateProductDto = req.body;
        const updatedProduct = await this.productService.updateProduct(id, data);
        res.json(updatedProduct);
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.productService.deleteProduct(id);
        res.status(204).send();
    }
}
