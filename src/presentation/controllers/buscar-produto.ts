import { BuscarProdutoUseCase } from "../../domain/useCases/buscar-produto";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class BuscarProdutoController implements Controller {
    constructor (private readonly validator: Validator, private readonly buscarProdutoUseCase: BuscarProdutoUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { id } = AMQPRequest.payload
        const produto = await this.buscarProdutoUseCase.buscar(id)
        if (produto instanceof Error) {
            throw produto
        }
        return produto
    }
}