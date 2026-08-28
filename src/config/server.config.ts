import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ServerConfig {
	public readonly port: number

	constructor(configService: ConfigService) {
		this.port = configService.get<number>("SERVER_PORT", 5000)
	}
}
