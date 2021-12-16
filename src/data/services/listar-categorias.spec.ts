import { makeCategoria } from "../../tests/factories/entities/categoria"
import { makeCategoriaRepository } from "../../tests/factories/repositories/categoria-repository"
import { CategoriaRepository } from "../contracts/categoria-repository"
import { ListarCategoriasService } from "./listar-categorias"

interface SutTypes {
    categoriaRepository: CategoriaRepository,
    sut: ListarCategoriasService
}


const makeSut = (): SutTypes => {
    const categoriaRepository = makeCategoriaRepository()
    const sut = new ListarCategoriasService(categoriaRepository)
    return {
        categoriaRepository,
        sut
    }
}

describe('ListarCategorias Service', () => {
    test('Garantir que categoriaRepository getAll seja chamado com os valores corretos', async () => {
        const { sut, categoriaRepository } = makeSut()
        const getAllSpy = jest.spyOn(categoriaRepository, 'getAll')
        await sut.listar()
        expect(getAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o categoriaRepository getAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, categoriaRepository } = makeSut()
        jest.spyOn(categoriaRepository, 'getAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar categorias', async () => {
        const { sut } = makeSut()
        const categorias = await sut.listar()
        expect(categorias).toEqual([makeCategoria(1), makeCategoria(2)])
    })
})