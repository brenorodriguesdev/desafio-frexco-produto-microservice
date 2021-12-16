import { AtualizarProdutoModel } from "../../domain/models/atualizar-produto"
import { makeCategoria } from "../../tests/factories/entities/categoria"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeCategoriaRepository } from "../../tests/factories/repositories/categoria-repository"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { CategoriaRepository } from "../contracts/categoria-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { AtualizarProdutoService } from "./atualizar-produto"

interface SutTypes {
    categoriaRepository: CategoriaRepository,
    produtoRepository: ProdutoRepository,
    sut: AtualizarProdutoService
}


const makeSut = (): SutTypes => {
    const categoriaRepository = makeCategoriaRepository()
    const produtoRepository = makeProdutoRepository()
    const sut = new AtualizarProdutoService(categoriaRepository, produtoRepository)
    return {
        categoriaRepository,
        produtoRepository,
        sut
    }
}

const makeData = (): AtualizarProdutoModel => ({
    id: 1,
    nome: 'any_nome',
    idCategoria: 1
})

describe('AtualizarProduto Service', () => {

    test('Garantir que produtoRepository getById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const getByIdSpy = jest.spyOn(produtoRepository, 'getById')
        await sut.atualizar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o produtoRepository getById retornar nullo retornar um error', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error('Esse produto não foi encontrado!'))
    })

    test('Garantir que categoriaRepository getById seja chamado com os valores corretos', async () => {
        const { sut, categoriaRepository } = makeSut()
        const getByIdSpy = jest.spyOn(categoriaRepository, 'getById')
        await sut.atualizar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o categoriaRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, categoriaRepository } = makeSut()
        jest.spyOn(categoriaRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o categoriaRepository getById retornar nullo retornar um error', async () => {
        const { sut, categoriaRepository } = makeSut()
        jest.spyOn(categoriaRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error('Essa categoria não foi encontrada!'))
    })

    test('Garantir que produtoRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const createSpy = jest.spyOn(produtoRepository, 'update')
        await sut.atualizar(makeData())
        expect(createSpy).toHaveBeenCalledWith({
            id: 1,
            categoria: makeCategoria(1),
            nome: 'any_nome'
        })
    })

    test('Garantir que se o produtoRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'update').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

})