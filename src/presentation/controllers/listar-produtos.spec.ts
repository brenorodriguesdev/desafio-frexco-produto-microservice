import { ProdutoModel } from "../../domain/models/produto"
import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { ListarProdutosController } from "./listar-produtos"

interface SutTypes {
    listarProdutosUseCase: ListarProdutosUseCase,
    sut: ListarProdutosController
}

const makeProdutosModel = (): ProdutoModel[] => {
    const produto = makeProduto(1)
    return [{
        id: produto.id,
        nome: 'any_nome',
        categoria: produto.categoria
    }]
}

const makeListarProdutosUseCase = (): ListarProdutosUseCase => {
    class ListarProdutosUseCaseStub implements ListarProdutosUseCase {
        async listar(): Promise<ProdutoModel[]> {
            return new Promise(resolve => resolve(makeProdutosModel()))
        }
    }
    return new ListarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarProdutosUseCase = makeListarProdutosUseCase()
    const sut = new ListarProdutosController(listarProdutosUseCase)
    return {
        listarProdutosUseCase,
        sut
    }
}

describe('ListarProdutos controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarProdutosUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o listar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        jest.spyOn(listarProdutosUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.handle()
        expect(produtos).toEqual(makeProdutosModel())
    })

})