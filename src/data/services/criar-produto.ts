import { CriarProdutoModel } from "../../domain/models/criar-produto";
import { ProdutoModel } from "../../domain/models/produto";
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produto";
import { CategoriaRepository } from "../contracts/categoria-repository";
import { ProdutoRepository } from "../contracts/produto-repository";

export class CriarProdutoService implements CriarProdutoUseCase {
    constructor (private readonly categoriaRepository: CategoriaRepository, private readonly produtoRepository: ProdutoRepository) {}
    async criar (data: CriarProdutoModel): Promise<ProdutoModel | Error> {
        const categoria = await this.categoriaRepository.getById(data.idCategoria)
        if (!categoria) {
            return new Error('Essa categoria não foi encontrada!')
        }
        
        await this.produtoRepository.create({
            categoria,
            nome: data.nome
        })
    }
}