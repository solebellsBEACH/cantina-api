import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/User/CreateUserDto';
import { UpdateUserDto } from '../dtos/User/UpdateUserDto';

export class UserController {
    constructor(private userService: UserService) { }

    async create(req: Request, res: Response) {
        const data: CreateUserDto = req.body;
        const user = await this.userService.createUser({ ...data, role: 'admin' });
        res.status(201).json(user);
    }

    // async getById(req: Request, res: Response) {
    //     const id = parseInt(req.params.id);
    //     const user = await this.userService.getUserById(id);
    //     if (user) {
    //         res.json(user);
    //     } else {
    //         res.status(404).send('User not found');
    //     }
    // }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data: UpdateUserDto = req.body;
        const updatedUser = await this.userService.updateUser(id, data);
        res.json(updatedUser);
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.userService.deleteUser(id);
        res.status(204).send();
    }
}
