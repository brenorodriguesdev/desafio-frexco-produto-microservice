import { AtualizarProdutoUseCase } from "../../domain/useCases/atualizar-produto";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class AtualizarProdutoController implements Controller {
    constructor (private readonly validator: Validator, private readonly atualizarProdutoUseCase: AtualizarProdutoUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { idCategoria, nome, id } = AMQPRequest.payload
        const result = await this.atualizarProdutoUseCase.atualizar({
            id,
            nome,
            idCategoria
        })
        if (result instanceof Error) {
            throw result
        }
    }
}