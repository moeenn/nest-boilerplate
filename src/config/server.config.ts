import assert from "node:assert/strict"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ServerConfig {
	public readonly port: number

	constructor(configService: ConfigService) {
		const port = configService.get<number>("SERVER_PORT")
		assert(port != undefined)
		this.port = port
	}
}
