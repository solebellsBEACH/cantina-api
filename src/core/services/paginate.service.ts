// src/services/paginationService.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface PaginationResponse<T> {
    items: T[];
    count: number;
    totalPages: number;
    next: string | null;
    previous: string | null;
}

// Generic function for paginated queries
export const getPaginatedResults = async <T>(
    model: Prisma.ModelName,
    page: number,
    limit: number,
    filters: Prisma.ProductWhereInput
): Promise<PaginationResponse<T>> => {
    const skip = (page - 1) * limit; // Pagination logic: skip records

    const [items, totalCount] = await prisma.$transaction([
        prisma[model].findMany({
            where: filters,
            skip,
            take: limit,
        }),
        prisma[model].count({ where: filters }),
    ]);

    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    return {
        items,
        count: totalCount,
        totalPages,
        next: page < totalPages ? `/products?page=${page + 1}&limit=${limit}` : null,
        previous: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
    };
};
