import { CategoriaRepository } from "../../../data/contracts/categoria-repository"
import { Categoria } from "../../../data/entities/categoria"
import { makeCategoria } from "../entities/categoria"

export const makeCategoriaRepository = (): CategoriaRepository => {
    class CategoriaRepositoryStub implements CategoriaRepository {
        async getById(): Promise<Categoria> {
            return new Promise(resolve => resolve(makeCategoria(1)))
        }

        async getAll(): Promise<Categoria[]> {
            return new Promise(resolve => resolve([makeCategoria(1), makeCategoria(2)]))
        }

    }
    return new CategoriaRepositoryStub()
}