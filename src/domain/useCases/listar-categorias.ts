import { CategoriaModel } from "../models/categoria";

export interface ListarCategoriasUseCase {
    listar: () => Promise<CategoriaModel[]>
}