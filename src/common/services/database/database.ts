import { Injectable } from "@nestjs/common"
import { Pool } from "pg"
import { DatabaseConfig } from "./database.config"

@Injectable()
export class Database {
	pool: Pool

	constructor(databaseConfig: DatabaseConfig) {
		this.pool = new Pool({
			connectionString: databaseConfig.url,
			max: databaseConfig.maxPoolSize,
		})
	}
}
