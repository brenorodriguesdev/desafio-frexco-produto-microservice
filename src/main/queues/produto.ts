import { adaptQueue } from "../adapters/amqp-controller";
import { makeAtualizarProdutoController } from "../factories/controllers/atualizar-produto";
import { makeBuscarProdutoController } from "../factories/controllers/buscar-produto";
import { makeCriarProdutoController } from "../factories/controllers/criar-produto";
import { makeDeletarProdutoController } from "../factories/controllers/deletar-produto";
import { makeListarProdutosController } from "../factories/controllers/listar-produtos";

export default (channel: any): void => {
    channel.consume('criar-produto', adaptQueue(channel, makeCriarProdutoController()));
    channel.consume('atualizar-produto', adaptQueue(channel, makeAtualizarProdutoController()));
    channel.consume('deletar-produto', adaptQueue(channel, makeDeletarProdutoController()));
    channel.consume('listar-produtos', adaptQueue(channel, makeListarProdutosController()));
    channel.consume('buscar-produto', adaptQueue(channel, makeBuscarProdutoController()));
}