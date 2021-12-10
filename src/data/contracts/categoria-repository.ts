import { Categoria } from "../entities/categoria";

export interface CategoriaRepository {
    getById: (id: number) => Promise<Categoria>
    getAll: () => Promise<Categoria[]>
}