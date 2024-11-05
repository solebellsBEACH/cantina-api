import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from '../dtos/Product/CreateProductDto';
import { UpdateProductDto } from '../dtos/Product/UpdateProductDto';

const prisma = new PrismaClient();

export class ProductService {
    async createProduct(data: CreateProductDto) {
        return prisma.produto.create({ data });
    }

    async getAllProducts() {
        return prisma.produto.findMany();
    }

    async getProductById(id: number) {
        return prisma.produto.findUnique({ where: { id } });
    }

    async updateProduct(id: number, data: UpdateProductDto) {
        return prisma.produto.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: number) {
        return prisma.produto.delete({ where: { id } });
    }
}
