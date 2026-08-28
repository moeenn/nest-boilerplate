import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserModule } from "./modules/user/user.module"
import { DatabaseModule } from "./common/services/database/database.module"
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { APP_GUARD } from "@nestjs/core"

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				throttlers: [
					{
						ttl: +configService.get<number>("RATE_LIMIT_TTL_MS", 60000), // 60000 ms = 60 seconds.
						limit: +configService.get<number>("RATE_LIMIT_LIMIT", 30),
					},
				],
			}),
		}),
		DatabaseModule,
		UserModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule { }
