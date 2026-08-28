import assert from "node:assert/strict"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class DatabaseConfig {
	url: string
	maxPoolSize: number = 10

	constructor(configService: ConfigService) {
		const url = configService.get<string>("DATABASE_URL")
		assert(url != undefined)
		this.url = url
	}
}
