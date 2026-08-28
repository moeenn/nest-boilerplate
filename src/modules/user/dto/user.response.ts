import { User } from "../user.model"

export class UserResponse {
	constructor(
		public id: string,
		public email: string,
		public name: string,
		public role: string,
		public createdAt: string,
	) {}

	static fromModel(user: User): UserResponse {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			createdAt: user.created_at.toISOString(),
		}
	}
}
