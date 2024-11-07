import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from '../dtos/Product/CreateProductDto';
import { UpdateProductDto } from '../dtos/Product/UpdateProductDto';

const prisma = new PrismaClient();

export class ProductService {
    async createProduct(data: CreateProductDto) {
        return prisma.product.create({ data });
    }

    async getAllProducts() {
        return prisma.product.findMany();
    }

    async getProductById(id: number) {
        return prisma.product.findUnique({ where: { id } });
    }

    async updateProduct(id: number, data: UpdateProductDto) {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: number) {
        return prisma.product.delete({ where: { id } });
    }
}
