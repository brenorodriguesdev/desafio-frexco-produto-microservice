import { CriarProdutoUseCase } from "../../domain/useCases/criar-produto";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class CriarProdutoController implements Controller {
    constructor (private readonly validator: Validator, private readonly criarProdutoUseCase: CriarProdutoUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { idCategoria, nome } = AMQPRequest.payload
        const produto = await this.criarProdutoUseCase.criar({
            nome,
            idCategoria
        })
        if (produto instanceof Error) {
            throw produto
        }
        return produto
    }
}