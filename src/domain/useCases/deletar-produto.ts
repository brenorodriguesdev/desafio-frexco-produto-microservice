export interface DeletarProdutoUseCase {
    deletar: (idProduto: number) => Promise<void | Error>
}