import { Categoria } from "../entities/categoria";

export interface CategoriaRepository {
    findById: () => Promise<Categoria>
}