import { ProdutoModel } from "../../domain/models/produto";
import { BuscarProdutoUseCase } from "../../domain/useCases/buscar-produto";
import { ProdutoRepository } from "../contracts/produto-repository";

export class BuscarProdutoService implements BuscarProdutoUseCase {
    constructor (private readonly produtoRepository: ProdutoRepository) {}
    async buscar (id: number): Promise<ProdutoModel | Error> {
        const produto = await this.produtoRepository.getById(id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }
        
        return produto
    }
}