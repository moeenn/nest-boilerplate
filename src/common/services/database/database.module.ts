import { Global, Module } from "@nestjs/common"
import { Database } from "./database"
import { DatabaseConfig } from "./database.config"

@Global()
@Module({
	providers: [Database, DatabaseConfig],
	exports: [Database],
})
export class DatabaseModule {}
