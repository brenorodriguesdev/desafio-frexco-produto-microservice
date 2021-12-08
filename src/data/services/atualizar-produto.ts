import { AtualizarProdutoModel } from "../../domain/models/atualizar-produto";
import { AtualizarProdutoUseCase } from "../../domain/useCases/atualizar-produto";
import { CategoriaRepository } from "../contracts/categoria-repository";
import { ProdutoRepository } from "../contracts/produto-repository";

export class AtualizarProdutoService implements AtualizarProdutoUseCase {
    constructor (private readonly categoriaRepository: CategoriaRepository, private readonly produtoRepository: ProdutoRepository) {}
    async atualizar (data: AtualizarProdutoModel): Promise<void | Error> {

        const produto = await this.produtoRepository.getById(data.id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }
        
        const categoria = await this.categoriaRepository.getById(data.idCategoria)
        if (!categoria) {
            return new Error('Essa categoria não foi encontrada!')
        }

        await this.produtoRepository.update({
            id: data.id,
            categoria,
            nome: data.nome
        })
    }
}