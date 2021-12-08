import { ProdutoModel } from "../../domain/models/produto";
import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos";
import { ProdutoRepository } from "../contracts/produto-repository";

export class ListarProdutosService implements ListarProdutosUseCase {
    constructor (private readonly produtoRepository: ProdutoRepository) {}
    async listar (): Promise<ProdutoModel[]> {
        const produtos = await this.produtoRepository.getAll()
        return produtos
    }
}