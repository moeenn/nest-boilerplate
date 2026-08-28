import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConsoleLogger, NestApplicationOptions } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ServerConfig } from "./config/server.config"
import { ValidationPipe } from "@nestjs/common"

const options: NestApplicationOptions = {
	logger: new ConsoleLogger({
		colors: false,
		json: true,
	}),
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule, options)
	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	const configService = app.get(ConfigService)
	const serverConfig = new ServerConfig(configService)
	await app.listen(serverConfig.port)
}

bootstrap()
