import { createConnection, getRepository, getConnection } from 'typeorm'
import { Produto } from '../data/entities/produto'
import { makeCategoria } from '../tests/factories/entities/categoria'
import { ProdutoRepositoryTypeORM } from './produto-repository'

const makeSut = (): ProdutoRepositoryTypeORM => {
    return new ProdutoRepositoryTypeORM()
}

describe('ProdutoRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
        await getConnection().close();
    })

    beforeEach(async () => {
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
    })

    test('Garantir que a produto seja criado', async () => {
        const sut = makeSut()

        const produto = await sut.create({
            nome: 'nome',
            categoria: makeCategoria(1)
        })

        expect(produto.id).toBeTruthy()
        expect(produto.nome).toBe('nome')
        expect(produto.categoria.id).toBe(1)
  

    })


    test('Garantir que o produto seja retornado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            nome: 'nome',
            categoria: makeCategoria(1)
        })


        const produto = await sut.getById(produtoCreated.id)

        expect(produto.id).toBe(produtoCreated.id)
        expect(produto.nome).toBe('nome')
        expect(produto.categoria.id).toBe(1)


    })

    test('Garantir que os produtos sejam retornados', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            nome: 'nome',
            categoria: makeCategoria(1)
        })


        const produtos = await sut.getAll()

        const produto = produtos[0]

        expect(produto.id).toBe(produtoCreated.id)
        expect(produto.nome).toBe('nome')
        expect(produto.categoria.id).toBe(1)

    })

    test('Garantir que o produto seja deletado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            nome: 'nome',
            categoria: makeCategoria(1)
        })

        await sut.deleteById(produtoCreated.id)
        const produto = await sut.getById(produtoCreated.id)

        expect(produto).toBeUndefined()

    })

    test('Garantir que o produto seja atualizado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            nome: 'nome',
            categoria: makeCategoria(1)
        })

        const id = produtoCreated.id
        produtoCreated.nome = 'outro_nome'
        await sut.update(produtoCreated)
        const produto = await sut.getById(id)
        expect(produto.id).toBe(id)
        expect(produto.nome).toBe('outro_nome')
        expect(produto.categoria.id).toBe(1)
    })

})