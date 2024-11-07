import { PrismaClient } from "@prisma/client";
import { CreateCategoryDto } from "../dtos/Category/CreateCategoryDto";
import { UpdateCategoryDto } from "../dtos/Category/UpdateCategoryDto";

const prisma = new PrismaClient();

export class CategoryService {
    async create(data: CreateCategoryDto) {
        return await prisma.category.create({
            data,
        });
    }

    async getCategories() {
        return await prisma.category.findMany();
    }

    async getCategoryById(id: number) {
        return await prisma.category.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateCategoryDto) {
        return await prisma.category.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.category.delete({
            where: { id },
        });
    }
}