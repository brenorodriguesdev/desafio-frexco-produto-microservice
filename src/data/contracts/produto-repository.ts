import { Produto } from "../entities/produto";

export interface ProdutoRepository {
    getAll: () => Promise<Produto[]>
    create: (produto: Produto) => Promise<Produto>
    update: (produto: Produto) => Promise<void>
    deleteById: (id: number) => Promise<void>
}