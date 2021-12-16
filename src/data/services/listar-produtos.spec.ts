import { makeProduto } from "../../tests/factories/entities/produto"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { ListarProdutosService } from "./listar-produtos"

interface SutTypes {
    produtoRepository: ProdutoRepository,
    sut: ListarProdutosService
}


const makeSut = (): SutTypes => {
    const produtoRepository = makeProdutoRepository()
    const sut = new ListarProdutosService(produtoRepository)
    return {
        produtoRepository,
        sut
    }
}

describe('ListarProdutos Service', () => {
    test('Garantir que produtoRepository getAll seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const getAllSpy = jest.spyOn(produtoRepository, 'getAll')
        await sut.listar()
        expect(getAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o produtoRepository getAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'getAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.listar()
        expect(produtos).toEqual([makeProduto(1), makeProduto(2)])
    })
})