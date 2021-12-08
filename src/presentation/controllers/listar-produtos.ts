import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos";
import { Controller } from "../contracts/controller";

export class ListarProdutosController implements Controller {
    constructor (private readonly listarProdutosUseCase: ListarProdutosUseCase) {}
    async handle(): Promise<any> {
        const produtos = await this.listarProdutosUseCase.listar()
        return produtos
    }
}