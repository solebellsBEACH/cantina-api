import { PrismaClient, Prisma } from '@prisma/client';
import { CreateProductDto } from '../dtos/Product/CreateProductDto';
import { UpdateProductDto } from '../dtos/Product/UpdateProductDto';

const prisma = new PrismaClient();

export class ProductService {
    async createProduct(data: CreateProductDto) {
        return prisma.product.create({ data });
    }

    async getAllProducts(page: number, limit: number, filters: { name?: string, price?: number, establishmentId?: number }) {
        const skip = (page - 1) * limit; // Pagination logic: skip records
        const where: Prisma.ProductWhereInput = {
            ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }), // Fix: 'mode' should be 'insensitive' (QueryMode)
            ...(filters.price && { price: filters.price }),
            ...(filters.establishmentId && { establishmentId: filters.establishmentId })
        };

        const [products, totalCount] = await prisma.$transaction([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
            }),
            prisma.product.count({
                where,
            }),
        ]);

        const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

        // Return paginated data
        return {
            products,
            count: totalCount,
            totalPages,
            next: page < totalPages ? `/products?page=${page + 1}&limit=${limit}` : null,
            previous: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
        };
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
