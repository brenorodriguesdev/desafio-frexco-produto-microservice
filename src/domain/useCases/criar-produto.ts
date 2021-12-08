import { CriarProdutoModel } from "../models/criar-produto";
import { ProdutoModel } from "../models/produto";

export interface CriarProdutoUseCase {
    criar: (data: CriarProdutoModel) => Promise<ProdutoModel | Error>
}