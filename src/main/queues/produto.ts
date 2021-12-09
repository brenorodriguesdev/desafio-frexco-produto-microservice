import { adaptQueue } from "../adapters/amqp-controller";
import { makeAtualizarProdutoController } from "../factories/controllers/atualizar-produto";
import { makeCriarProdutoController } from "../factories/controllers/criar-produto";
import { makeDeletarProdutoController } from "../factories/controllers/deletar-produto";
import { makeListarProdutosController } from "../factories/controllers/listar-produtos";

export default (channel: any): void => {
    channel.consume('criar-produto', adaptQueue(makeCriarProdutoController()), { noAck: true });
    channel.consume('atualizar-produto', adaptQueue(makeAtualizarProdutoController()), { noAck: true });
    channel.consume('deletar-produto', adaptQueue(makeDeletarProdutoController()), { noAck: true });
    channel.consume('listar-produtos', adaptQueue(makeListarProdutosController()), { noAck: true });
}