import { Produto } from "../../../data/entities/produto"
import { makeCategoria } from "./categoria"

export const makeProduto = (id: number): Produto => {
    const produto = new Produto()
    produto.id = id
    produto.nome = 'nome ' + id
    produto.categoria = makeCategoria(1)
    return produto
}