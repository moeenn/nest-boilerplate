import { IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateUserRequest {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	name!: string | undefined

	@IsOptional()
	@IsString()
	@MinLength(8)
	password!: string
}
