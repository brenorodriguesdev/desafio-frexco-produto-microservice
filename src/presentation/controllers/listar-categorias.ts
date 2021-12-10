import { ListarCategoriasUseCase } from "../../domain/useCases/listar-categorias";
import { Controller } from "../contracts/controller";

export class ListarCategoriasController implements Controller {
    constructor (private readonly listarCategoriasUseCase: ListarCategoriasUseCase) {}
    async handle(): Promise<any> {
        const categorias = await this.listarCategoriasUseCase.listar()
        return categorias
    }
}