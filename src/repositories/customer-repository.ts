import { Customer, Prisma } from "@prisma/client";

export interface CustomerRepository{
    findByCpf(cpf : string) : Promise<Customer | null>
    findByEmail(email : string) : Promise<Customer | null>
    create(data : Prisma.CustomerUncheckedCreateInput) : Promise<Customer>
}