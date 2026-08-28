import { Injectable } from "@nestjs/common"
import { CreateUserArgs, User } from "./user.model"
import { Paginated } from "src/common/database/types"
import crypto from "node:crypto"
import { UserRepo } from "./user.repo"
import argon2 from "argon2"

@Injectable()
export class UserService {
	constructor(private readonly userRepo: UserRepo) {}

	async list(limit: number, offset = 0): Paginated<User> {
		return this.userRepo.listUsers(limit, offset)
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this.userRepo.findByEmail(email)
	}

	async findById(id: string): Promise<User | undefined> {
		return this.userRepo.findById(id)
	}

	async create(args: CreateUserArgs) {
		const newUser: User = {
			id: crypto.randomUUID(),
			email: args.email,
			name: args.name,
			role: args.role,
			password: await argon2.hash(args.password),
			created_at: new Date(),
			deleted_at: null,
		}

		return this.userRepo.create(newUser)
	}

	async update(
		id: string,
		name: string | undefined,
		password: string | undefined,
	) {
		if (password) {
			password = await argon2.hash(password)
		}
		return this.userRepo.updateUser(id, name, password)
	}

	async remove(id: string): Promise<void> {
		return this.userRepo.deleteUser(id)
	}
}
