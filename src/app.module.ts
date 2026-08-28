import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./modules/user/user.module"
import { DatabaseModule } from "./common/database/database.module"

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ConfigModule,
		DatabaseModule,
		UserModule,
	],
})
export class AppModule {}
