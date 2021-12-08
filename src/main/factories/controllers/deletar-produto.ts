import { DeletarProdutoService } from "../../../data/services/deletar-produto"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { DeletarProdutoController } from "../../../presentation/controllers/deletar-produto"
import { makeDeletarProdutoValidator } from "../validators/deletar-produto"

export const makeDeletarProdutoController = (): DeletarProdutoController => {
    const produtoRepositoryTypeORM = new ProdutoRepositoryTypeORM()
    const deletarProdutoService = new DeletarProdutoService(produtoRepositoryTypeORM)
    return new DeletarProdutoController(makeDeletarProdutoValidator(), deletarProdutoService)
}