import { ProdutoModel } from "../models/produto";

export interface CriarProdutoUseCase {
    criar: (data: ProdutoModel) => Promise<ProdutoModel | Error>
}