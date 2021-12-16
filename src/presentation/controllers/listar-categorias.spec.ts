import { CategoriaModel } from "../../domain/models/categoria"
import { ListarCategoriasUseCase } from "../../domain/useCases/listar-categorias"
import { makeCategoria } from "../../tests/factories/entities/categoria"
import { ListarCategoriasController } from "./listar-categorias"

interface SutTypes {
    listarCategoriasUseCase: ListarCategoriasUseCase,
    sut: ListarCategoriasController
}

const makeCategoriasModel = (): CategoriaModel[] => {
    const categoria = makeCategoria(1)
    return [categoria]
}

const makeListarCategoriasUseCase = (): ListarCategoriasUseCase => {
    class ListarProdutosUseCaseStub implements ListarCategoriasUseCase {
        async listar(): Promise<CategoriaModel[]> {
            return new Promise(resolve => resolve(makeCategoriasModel()))
        }
    }
    return new ListarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarCategoriasUseCase = makeListarCategoriasUseCase()
    const sut = new ListarCategoriasController(listarCategoriasUseCase)
    return {
        listarCategoriasUseCase,
        sut
    }
}

describe('ListarCategorias controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarCategoriasUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarCategoriasUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o listar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarCategoriasUseCase } = makeSut()
        jest.spyOn(listarCategoriasUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar categorias', async () => {
        const { sut } = makeSut()
        const categorias = await sut.handle()
        expect(categorias).toEqual(makeCategoriasModel())
    })

})