// controllers/orders.controller.ts
import { Request, Response } from 'express';
import { OrderService } from '../services/orders.service';

export class OrderController {
    constructor(private orderService: OrderService) {
    }

    private handleNotFound = (res: Response, message: string) => {
        res.status(404).json({ message });
    };

    async create(req: Request, res: Response) {
        const data = req.body;
        try {
            const order = await this.orderService.create(data);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(500).json(error);
        }
    }

    async getOrders(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const filters = {
            userId: req.query.userId ? parseInt(req.query.userId as string) : undefined,
            productId: req.query.productId ? parseInt(req.query.productId as string) : undefined,
            status: req.query.status as string,
        };

        try {
            const orders = await this.orderService.getOrders(page, limit, filters);
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json(error);
        }
    }

    async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await this.orderService.getOrderByUser(Number(id));
            if (!order) {
                return this.handleNotFound(res, 'Order not found');
            }
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).json(error);
        }
    }

    async getOrderUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await this.orderService.getOrderByUser(Number(id));
            if (!order) {
                return this.handleNotFound(res, 'Order not found');
            }
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).json(error);
        }
    }

    async updateStatus(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedOrder = await this.orderService.updateStatus(Number(id), data.status);
            if (!updatedOrder) {
                return this.handleNotFound(res, 'Order not found');
            }
            res.status(200).json(updatedOrder);
        } catch (error: any) {
            res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedOrder = await this.orderService.delete(Number(id));
            if (!deletedOrder) {
                return this.handleNotFound(res, 'Order not found');
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json(error);
        }
    }
}
