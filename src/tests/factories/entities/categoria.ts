import { Categoria } from "../../../data/entities/categoria"

export const makeCategoria = (id: number): Categoria => {
    const categoria = new Categoria()
    categoria.id = id
    categoria.nome = 'nome ' + id
    return categoria
}