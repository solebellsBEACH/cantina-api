import { PrismaClient, Prisma } from '@prisma/client';

import { getPaginatedResults, PaginationResponse } from './paginate.service';
import { CreateOrderDto } from '../dtos/Orders/CreateOrderDto';

const prisma = new PrismaClient();


export class OrderService {
    async create(data: CreateOrderDto) {
        return prisma.order.create({
            data,
        });
    }

    async getOrders(
        page: number,
        limit: number,
        filters: { userId?: number; productId?: number; status?: string }
    ): Promise<PaginationResponse<Prisma.OrderGetPayload<{}>>> {
        const where: Prisma.OrderWhereInput = {
            ...(filters.userId && { userId: filters.userId }),
            ...(filters.productId && { productId: filters.productId }),
            ...(filters.status && { status: filters.status }),
        };

        return getPaginatedResults<Prisma.OrderGetPayload<{}>, Prisma.OrderWhereInput>(
            prisma.order,
            page,
            limit,
            where
        );
    }


    async getOrderById(id: number) {
        return prisma.order.findUnique({
            where: { id },
        });
    }

    async getOrderByUser(userId: number) {
        try {
            const orders = await prisma.order.findMany({
                where: {
                    userId: userId, // Filtra os pedidos pelo ID do usuário
                },
            });

            return orders;
        } catch (error: any) {
            throw new Error('Error fetching orders for user: ' + error?.message);
        }
    }

    async updateStatus(id: number, status: string) {
        return prisma.order.update({
            where: { id },
            data: { status },
        });
    }

    async delete(id: number) {
        return prisma.order.delete({
            where: { id },
        });
    }
}
