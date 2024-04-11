import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import compression from 'compression'
import helmet from 'helmet'

declare const module: any

async function bootstrap() {
	const logger = new Logger('Server')

	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('v1/api')
	app.enableCors()
	app.use(helmet())
	app.use(
		compression({
			level: 6,
			threshold: 10 * 1024
		})
	)

	const configService = app.get<ConfigService>(ConfigService)

	await app.listen(configService.get<string>('PORT'), async () => {
		const url = await app.getUrl()
		logger.log(url)
	})

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}
bootstrap()
