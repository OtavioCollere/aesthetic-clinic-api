import { UsersRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { EmailNotFoundError } from "../errors/email-not-found-error";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { hash } from "bcryptjs";

export interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

export interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new EmailAlreadyExistsError()
        }

        const password_hash = await hash(password, 6);

        const user = await this.usersRepository.create({ name, email, password_hash })

        return { user };
    }
}