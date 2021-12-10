import { ListarCategoriasService } from "../../../data/services/listar-categorias"
import { CategoriaRepositoryTypeORM } from "../../../infra/categoria-repository"
import { ListarCategoriasController } from "../../../presentation/controllers/listar-categorias"

export const makeListarCategoriasController = (): ListarCategoriasController => {
    const categoriaRepositoryTypeORM = new CategoriaRepositoryTypeORM()
    const listarCategoriasService = new ListarCategoriasService(categoriaRepositoryTypeORM)
    return new ListarCategoriasController(listarCategoriasService)
}