import z from "zod"

export const UserRoleSchema = z.enum(["ADMIN", "CUSTOMER"])
export type UserRole = z.infer<typeof UserRoleSchema>

export const UserSchema = z.object({
	id: z.uuid(),
	email: z.email(),
	name: z.string(),
	role: UserRoleSchema,
	password: z.string(),
	created_at: z.coerce.date(),
	deleted_at: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

export type CreateUserArgs = Omit<User, "id" | "created_at" | "deleted_at">
