import { getRepository } from "typeorm"
import { CategoriaRepository } from "../data/contracts/categoria-repository"
import { Categoria } from "../data/entities/categoria"

export class CategoriaRepositoryTypeORM implements CategoriaRepository {
    async getById(id: number): Promise<Categoria> {
        const categoriaRepository = getRepository(Categoria)
        return await categoriaRepository.findOne(id)
    }

    async getAll(): Promise<Categoria[]> {
        const categoriaRepository = getRepository(Categoria)
        return await categoriaRepository.find()
    }
}