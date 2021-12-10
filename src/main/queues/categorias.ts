import { adaptQueue } from "../adapters/amqp-controller";
import { makeListarCategoriasController } from "../factories/controllers/listar-categorias";

export default (channel: any): void => {
    channel.consume('listar-categorias', adaptQueue(channel, makeListarCategoriasController()));
}