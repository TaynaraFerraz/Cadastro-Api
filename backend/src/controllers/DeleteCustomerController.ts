import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteCustomerservice } from "../services/deleteCustomerService"


class DeleteCustomerController{
     
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as {id: string}
        const customerService = await new DeleteCustomerservice()

        const customer = await customerService.execute({id})

        reply.send(customer)
    }
}

export { DeleteCustomerController }