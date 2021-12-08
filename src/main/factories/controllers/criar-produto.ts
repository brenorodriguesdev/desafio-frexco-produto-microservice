import { CriarProdutoService } from "../../../data/services/criar-produto"
import { CategoriaRepositoryTypeORM } from "../../../infra/categoria-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { CriarProdutoController } from "../../../presentation/controllers/criar-produto"
import { makeCriarProdutoValidator } from "../validators/criar-produto"

export const makeCriarProdutoController = (): CriarProdutoController => {
    const produtoRepositoryTypeORM = new ProdutoRepositoryTypeORM()
    const categoriaRepositoryTypeORM = new CategoriaRepositoryTypeORM()
    const criarProdutoService = new CriarProdutoService(categoriaRepositoryTypeORM, produtoRepositoryTypeORM)
    return new CriarProdutoController(makeCriarProdutoValidator(), criarProdutoService)
}