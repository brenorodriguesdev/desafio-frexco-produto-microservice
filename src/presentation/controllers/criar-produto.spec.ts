import { CriarProdutoModel } from "../../domain/models/criar-produto"
import { ProdutoModel } from "../../domain/models/produto"
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produto"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { CriarProdutoController } from "./criar-produto"

interface SutTypes {
    validator: Validator,
    criarProdutoUseCase: CriarProdutoUseCase,
    sut: CriarProdutoController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeProdutoModel = (): ProdutoModel => {
    const produto = makeProduto(1)
    return {
        id: produto.id,
        nome: 'any_nome',
        categoria: produto.categoria
    }
}

const makeCriarProdutoUseCase = (): CriarProdutoUseCase => {
    class CriarProdutosUseCaseStub implements CriarProdutoUseCase {
        async criar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProdutoModel()))
        }
    }
    return new CriarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarProdutoUseCase = makeCriarProdutoUseCase()
    const sut = new CriarProdutoController(validator, criarProdutoUseCase)
    return {
        validator,
        criarProdutoUseCase,
        sut
    }
}

const makeData = (): CriarProdutoModel => ({
   nome: 'any_nome',
   idCategoria: 1
})

const makeRequest = (): AMQPRequest => ({
    payload: makeData(),
})

describe('CriarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o validate retornar uma exce????o repassar?? essa exce????o', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exce????o', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarProdutoUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exce????o repassar?? essa exce????o', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornar?? uma exce????o com esse error', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar um produto', async () => {
        const { sut } = makeSut()
        const produto = await sut.handle(makeRequest())
        expect(produto).toEqual(makeProdutoModel())
    })

})