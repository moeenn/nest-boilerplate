import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { UserResponse } from "./dto/user.response"
import { type Paginated } from "src/common/responses/paginated"
import { LimitOffset } from "src/common/responses/limit_offset"
import { CreateUserRequest } from "./dto/createUser.request"
import { UpdateUserRequest } from "./dto/updateUserRequest"

@Controller("/api/v1/users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async list(@Query() args: LimitOffset): Paginated<UserResponse> {
		const users = await this.userService.list(args.limit, args.offset)
		return {
			total: users.total,
			data: users.data.map((u) => UserResponse.fromModel(u)),
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: CreateUserRequest) {
		await this.userService.create({
			email: body.email,
			name: body.name,
			password: body.password,
			role: "CUSTOMER",
		})
	}

	@Put("/:id")
	@HttpCode(HttpStatus.OK)
	async update(@Param("id") id: string, @Body() body: UpdateUserRequest) {
		await this.userService.update(id, body.name, body.password)
	}

	@Delete("/:id")
	async remove(@Param("id") id: string) {
		this.userService.remove(id)
	}
}
