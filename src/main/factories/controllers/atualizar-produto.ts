import { AtualizarProdutoService } from "../../../data/services/atualizar-produto"
import { CategoriaRepositoryTypeORM } from "../../../infra/categoria-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { AtualizarProdutoController } from "../../../presentation/controllers/atualizar-produto"
import { makeAtualizarProdutoValidator } from "../validators/atualizar-produto"

export const makeAtualizarProdutoController = (): AtualizarProdutoController => {
    const produtoRepositoryTypeORM = new ProdutoRepositoryTypeORM()
    const categoriaRepositoryTypeORM = new CategoriaRepositoryTypeORM()
    const atualizarProdutoService = new AtualizarProdutoService(categoriaRepositoryTypeORM, produtoRepositoryTypeORM)
    return new AtualizarProdutoController(makeAtualizarProdutoValidator(), atualizarProdutoService)
}