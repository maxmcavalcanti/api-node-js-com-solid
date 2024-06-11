import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import bcrypt from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"


interface RegisterUseCaseRequest {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password }: RegisterUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await bcrypt.hash(password, 6)
    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}
