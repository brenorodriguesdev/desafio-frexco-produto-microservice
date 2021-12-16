import { AtualizarProdutoModel } from "../../domain/models/atualizar-produto"
import { AtualizarProdutoUseCase } from "../../domain/useCases/atualizar-produto"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { AtualizarProdutoController } from "./atualizar-produto"

interface SutTypes {
    validator: Validator,
    atualizarProdutoUseCase: AtualizarProdutoUseCase,
    sut: AtualizarProdutoController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeAtualizarProdutoUseCase = (): AtualizarProdutoUseCase => {
    class AtualizarProdutoUseCaseStub implements AtualizarProdutoUseCase {
        async atualizar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AtualizarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const atualizarProdutoUseCase = makeAtualizarProdutoUseCase()
    const sut = new AtualizarProdutoController(validator, atualizarProdutoUseCase)
    return {
        validator,
        atualizarProdutoUseCase,
        sut
    }
}

const makeData = (): AtualizarProdutoModel => ({
    id: 1,
    nome: 'nome',
    idCategoria: 1
})

const makeRequest = (): AMQPRequest => ({
    payload: makeData()
})

describe('AtualizarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o validate retornar uma exceção repassará essa exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que atualizar seja chamado com os valores corretos', async () => {
        const { sut, atualizarProdutoUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(atualizarProdutoUseCase, 'atualizar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o atualizar retornar uma exceção repassará essa exceção', async () => {
        const { sut, atualizarProdutoUseCase } = makeSut()
        jest.spyOn(atualizarProdutoUseCase, 'atualizar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o atualizar uma error retornará uma exceção com esse error', async () => {
        const { sut, atualizarProdutoUseCase } = makeSut()
        jest.spyOn(atualizarProdutoUseCase, 'atualizar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


})