import { CategoriaModel } from "../../domain/models/categoria";
import { ListarCategoriasUseCase } from "../../domain/useCases/listar-categorias";
import { CategoriaRepository } from "../contracts/categoria-repository";

export class ListarCategoriasService implements ListarCategoriasUseCase {
    constructor (private readonly categoriaRepository: CategoriaRepository) {}
    async listar (): Promise<CategoriaModel[]> {
        const categorias = await this.categoriaRepository.getAll()
        return categorias
    }
}