import { PrismaClient, Prisma } from '@prisma/client';
import { CreateProductDto } from '../dtos/Product/CreateProductDto';
import { UpdateProductDto } from '../dtos/Product/UpdateProductDto';
import { getPaginatedResults, PaginationResponse } from './paginate.service';

const prisma = new PrismaClient();

export class ProductService {
    async createProduct(data: CreateProductDto) {
        return prisma.product.create({ data });
    }

    async getAllProducts(page: number, limit: number, filters: { name?: string, price?: number, establishmentId?: number }): Promise<PaginationResponse<Prisma.$ProductPayload>> {
        const where: Prisma.ProductWhereInput = {
            ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
            ...(filters.price && { price: filters.price }),
            ...(filters.establishmentId && { establishmentId: filters.establishmentId })
        };

        // Use the generic pagination function for fetching products
        return getPaginatedResults<Prisma.$ProductPayload>(prisma.product, page, limit, where);
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
