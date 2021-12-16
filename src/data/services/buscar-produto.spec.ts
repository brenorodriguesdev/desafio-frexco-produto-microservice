import { makeProduto } from "../../tests/factories/entities/produto"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { BuscarProdutoService } from "./buscar-produto"

interface SutTypes {
    produtoRepository: ProdutoRepository,
    sut: BuscarProdutoService
}


const makeSut = (): SutTypes => {
    const produtoRepository = makeProdutoRepository()
    const sut = new BuscarProdutoService(produtoRepository)
    return {
        produtoRepository,
        sut
    }
}

describe('BuscarProduto Service', () => {
    test('Garantir que produtoRepository findById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const findByIdSpy = jest.spyOn(produtoRepository, 'getById')
        await sut.buscar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.buscar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o produtoRepository findById retornar nullo retornar um error', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.buscar(1)
        expect(error).toEqual(new Error('Esse produto não foi encontrado!'))
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o produto', async () => {
        const { sut } = makeSut()
        const produtoResponse = await sut.buscar(1)
        const produto = makeProduto(1)
        expect(produtoResponse).toEqual(produto)
    })
})