import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator"

export class CreateUserRequest {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email!: string

	@IsNotEmpty()
	@IsString()
	name!: string

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string
}
