import { Router, Request, Response } from 'express';
import pool from './db';

const router = Router();

router.get('/items', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar items' });
    }
});

export default router;
