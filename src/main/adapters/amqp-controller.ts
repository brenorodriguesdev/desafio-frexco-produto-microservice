import { Controller } from "../../presentation/contracts/controller"

export const adaptQueue = (controller: Controller) => {
    return async (payload: any) => await controller.handle({ payload: JSON.parse(payload) })
}