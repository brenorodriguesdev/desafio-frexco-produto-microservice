import { DeletarProdutoUseCase } from "../../domain/useCases/deletar-produto";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class DeletarProdutoController implements Controller {
    constructor (private readonly validator: Validator, private readonly deletarProdutoUseCase: DeletarProdutoUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { id } = AMQPRequest.payload
        const result = await this.deletarProdutoUseCase.deletar(id)
        if (result instanceof Error) {
            throw result
        }
    }
}