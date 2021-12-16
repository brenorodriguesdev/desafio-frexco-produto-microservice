import { createConnection, getRepository, getConnection } from 'typeorm'
import { Categoria } from '../data/entities/categoria'
import { makeCategoria } from '../tests/factories/entities/categoria'
import { CategoriaRepositoryTypeORM } from './categoria-repository'

const makeSut = (): CategoriaRepositoryTypeORM => {
    return new CategoriaRepositoryTypeORM()
}

describe('CategoriaRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    test('Garantir que a categoria seja retornado', async () => {
        const sut = makeSut()

        const categoriaRepository = getRepository(Categoria)
        const id = await categoriaRepository.count() + 1
    
        const categoriaCreated = await categoriaRepository.save({
            id,
            nome: 'nome'
        })

        const categoria = await sut.getById(categoriaCreated.id)

        expect(categoria.id).toBe(categoriaCreated.id)
        expect(categoria.nome).toBe('nome')

        await categoriaRepository.delete(categoriaCreated.id)
    })

    test('Garantir que as categorias sejam retornados', async () => {
        const sut = makeSut()

        const categoriaRepository = getRepository(Categoria)
        const id = await categoriaRepository.count() + 1
    
        const categoriaCreated = await categoriaRepository.save({
            id,
            nome: 'nome'
        })

        const categorias = await sut.getAll()

        const categoria = categorias.find(categoria => categoria.id === categoriaCreated.id)

        expect(categoria.id).toBe(categoriaCreated.id)
        expect(categoria.nome).toBe('nome')

        await categoriaRepository.delete(categoriaCreated.id)
    })

})