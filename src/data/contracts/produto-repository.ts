import { Produto } from "../entities/produto";

export interface ProdutoRepository {
    getAll: () => Promise<Produto[]>
    create: (produto: Produto) => Promise<Produto>
    update: (produto: Produto) => Promise<void>
    getById: (id: number) => Promise<Produto>
    deleteById: (id: number) => Promise<void>
}