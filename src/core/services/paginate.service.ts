
export interface PaginationResponse<T> {
    data: T[];       // Lista de resultados paginados
    page: number;    // Página atual
    limit: number;   // Número de itens por página
    total: number;   // Total de itens encontrados
}

export async function getPaginatedResults<T, WhereInput>(
    model: { findMany: (args: { where?: WhereInput; skip?: number; take?: number }) => Promise<T[]>; count: (args: { where?: WhereInput }) => Promise<number> },
    page: number,
    limit: number,
    where: WhereInput
): Promise<PaginationResponse<T>> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        model.findMany({
            where,
            skip,
            take: limit,
        }),
        model.count({ where }),
    ]);

    return {
        data,
        page,
        limit,
        total,
    };
}
