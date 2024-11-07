import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/Category/CreateCategoryDto';
import { CategoryService } from '../services/category.service';
import { UpdateCategoryDto } from '../dtos/Category/UpdateCategoryDto';

export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    private handleError(res: Response, error: any) {
        res.status(500).json({ message: error.message });
    }

    private handleNotFound(res: Response, message: string) {
        res.status(404).json({ message });
    }

    async create(req: Request, res: Response) {
        const data: CreateCategoryDto = req.body;
        try {
            const category = await this.categoryService.create(data);
            res.send(201).json(category);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await this.categoryService.getCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }

    async getCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const category = await this.categoryService.getCategoryById(Number(id));
            if (!category) {
                return this.handleNotFound(res, 'Category not found');
            }
            res.status(200).json(category);
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data: UpdateCategoryDto = req.body;
        try {
            const updatedCategory = await this.categoryService.update(Number(id), data);
            if (!updatedCategory) {
                return this.handleNotFound(res, 'Category not found');
            }
            res.status(200).json(updatedCategory);
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedCategory = await this.categoryService.delete(Number(id));
            if (!deletedCategory) {
                return this.handleNotFound(res, 'Category not found');
            }
            res.status(204).send();
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }
}
