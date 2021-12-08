import { CategoriaModel } from "./categoria";

export interface ProdutoModel {
    id?: number
    nome: string
    categoria: CategoriaModel
}