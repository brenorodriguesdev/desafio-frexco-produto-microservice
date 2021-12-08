import { ListarProdutosService } from "../../../data/services/listar-produtos"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { ListarProdutosController } from "../../../presentation/controllers/listar-produtos"

export const makeListarProdutosController = (): ListarProdutosController => {
    const produtoRepositoryTypeORM = new ProdutoRepositoryTypeORM()
    const listarProdutosService = new ListarProdutosService(produtoRepositoryTypeORM)
    return new ListarProdutosController(listarProdutosService)
}