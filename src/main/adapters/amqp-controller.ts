import { Controller } from "../../presentation/contracts/controller"

export const adaptController = (controller: Controller) => {
    return async (payload: any) => await controller.handle({ payload })
}