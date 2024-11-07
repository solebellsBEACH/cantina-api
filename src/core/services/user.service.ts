import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dtos/User/CreateUserDto';
import { UpdateUserDto } from '../dtos/User/UpdateUserDto';

const prisma = new PrismaClient();

export class UserService {
    async createUser(data: CreateUserDto) {
        return prisma.user.create({
            data,
        });
    }

    async getAllUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [users, totalCount] = await prisma.$transaction([
            prisma.user.findMany({
                skip,
                take: limit,
            }),
            prisma.user.count(),
        ]);

        const totalPages = Math.ceil(totalCount / limit);
        return {
            users,
            count: totalCount,
            totalPages,
            next: page < totalPages ? `/users?page=${page + 1}&limit=${limit}` : null,
            previous: page > 1 ? `/users?page=${page - 1}&limit=${limit}` : null,
        };
    }

    async getUserById(id: number) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: number, data: UpdateUserDto) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: number) {
        return prisma.user.delete({
            where: { id },
        });
    }
}
