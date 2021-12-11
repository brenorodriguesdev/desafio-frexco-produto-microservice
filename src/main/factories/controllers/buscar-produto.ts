import { BuscarProdutoService } from "../../../data/services/buscar-produto"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { BuscarProdutoController } from "../../../presentation/controllers/buscar-produto"
import { makeBuscarProdutoValidator } from "../validators/buscar-produto"

export const makeBuscarProdutoController = (): BuscarProdutoController => {
    const produtoRepositoryTypeORM = new ProdutoRepositoryTypeORM()
    const buscarProdutoService = new BuscarProdutoService(produtoRepositoryTypeORM)
    return new BuscarProdutoController(makeBuscarProdutoValidator(), buscarProdutoService)
}