import { Injectable } from "@nestjs/common"
import { Database } from "src/common/database/database"
import { User, UserSchema } from "./user.model"
import { Paginated } from "src/common/database/types"

@Injectable()
export class UserRepo {
	constructor(private readonly db: Database) {}

	#listUsersQuery = `
		select
			u.*,
			count(*) over() as total
		from users u
		where u.deleted_at is null
		limit $1
		offset $2
	`

	async listUsers(limit: number, offset = 0): Paginated<User> {
		const results = await this.db.pool.query(this.#listUsersQuery, [
			limit,
			offset,
		])

		if (results.rowCount === 0) {
			return { total: 0, data: [] }
		}

		return {
			total: parseInt(results.rows[0].total),
			data: results.rows.map((row) => UserSchema.parse(row)),
		}
	}

	#findByEmailQuery = `
		select u.*
		from users u
		where u.email = $1
		and u.deleted_at is null
		limit 1
	`

	async findByEmail(email: string): Promise<User | undefined> {
		const result = await this.db.pool.query(this.#findByEmailQuery, [email])
		if (result.rowCount === 0) {
			return
		}
		return UserSchema.parseAsync(result.rows[0])
	}

	#findByIdQuery = `
		select u.*
		from users u
		where u.id = $1
		and u.deleted_at is null
		limit 1
	`

	async findById(id: string): Promise<User | undefined> {
		const result = await this.db.pool.query(this.#findByIdQuery, [id])
		if (result.rowCount === 0) {
			return
		}
		return UserSchema.parseAsync(result.rows[0])
	}

	#deleteUserQuery = `
		update users
		set deleted_at = now()
		where id = $1
	`

	async deleteUser(id: string): Promise<void> {
		await this.db.pool.query(this.#deleteUserQuery, [id])
	}

	#createUserQuery = `
		insert into users (id, email, name, role, password, created_at)
		values ($1, $2, $3, $4, $5, $6)
	`

	async create(user: User): Promise<void> {
		await this.db.pool.query(this.#createUserQuery, [
			user.id,
			user.email,
			user.name,
			user.role,
			user.password,
			user.created_at,
		])
	}

	#updateUserQuery = `
		update users
		set name = coalesce($2, name),
			password = coalesce($3, password)
		where id = $1
	`

	async updateUser(
		id: string,
		name: string | undefined,
		password: string | undefined,
	): Promise<void> {
		await this.db.pool.query(this.#updateUserQuery, [id, name, password])
	}
}
