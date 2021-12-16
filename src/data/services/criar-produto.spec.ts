import { CriarProdutoModel } from "../../domain/models/criar-produto"
import { makeCategoria } from "../../tests/factories/entities/categoria"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeCategoriaRepository } from "../../tests/factories/repositories/categoria-repository"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { CategoriaRepository } from "../contracts/categoria-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { CriarProdutoService } from "./criar-produto"

interface SutTypes {
    categoriaRepository: CategoriaRepository,
    produtoRepository: ProdutoRepository,
    sut: CriarProdutoService
}


const makeSut = (): SutTypes => {
    const categoriaRepository = makeCategoriaRepository()
    const produtoRepository = makeProdutoRepository()
    const sut = new CriarProdutoService(categoriaRepository, produtoRepository)
    return {
        categoriaRepository,
        produtoRepository,
        sut
    }
}

const makeData = (): CriarProdutoModel => ({
    nome: 'any_nome',
    idCategoria: 1
})

describe('CriarProduto Service', () => {
    test('Garantir que categoriaRepository getById seja chamado com os valores corretos', async () => {
        const { sut, categoriaRepository } = makeSut()
        const getByIdSpy = jest.spyOn(categoriaRepository, 'getById')
        await sut.criar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o categoriaRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, categoriaRepository } = makeSut()
        jest.spyOn(categoriaRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o categoriaRepository getById retornar nullo retornar um error', async () => {
        const { sut, categoriaRepository } = makeSut()
        jest.spyOn(categoriaRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error('Essa categoria não foi encontrada!'))
    })

    test('Garantir que produtoRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const createSpy = jest.spyOn(produtoRepository, 'create')
        await sut.criar(makeData())
        expect(createSpy).toHaveBeenCalledWith({
            categoria: makeCategoria(1),
            nome: 'any_nome'
        })
    })

    test('Garantir que se o produtoRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o produto', async () => {
        const { sut } = makeSut()
        const produtoResponse = await sut.criar(makeData())
        const produto = makeProduto(1)
        expect(produtoResponse).toEqual(produto)
    })
})