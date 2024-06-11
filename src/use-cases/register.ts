import { UsersRepository } from "@/repositories/users-repository"
import bcrypt from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { User } from "@prisma/client"


interface RegisterUseCaseRequest {
  email: string
  name: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await bcrypt.hash(password, 6)
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }

  }
}
