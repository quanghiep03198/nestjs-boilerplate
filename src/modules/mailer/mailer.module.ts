import { Module } from '@nestjs/common';
import { MailerOptions, MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		NestMailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService): MailerOptions => {
				return {
					transport: {
						service: 'gmail',
						port: Number(configService.get<string>('MAILER_PORT')),
						dnsTimeout: 60 * 1000,
						connectionTimeout: 60 * 1000,
						tls: {
							ciphers: 'SSLv3',
							rejectUnauthorized: false,
						},
						auth: {
							user: configService.get<string>('MAILER_AUTH_USER'), // generated ethereal user
							pass: configService.get<string>('MAILER_AUTH_PASS'), // generated ethereal password
						},
					},
					template: {
						dir: process.cwd() + '/templates/',
						adapter: new HandlebarsAdapter(),
						options: {
							strict: true,
						},
					},
				};
			},
		}),
	],
})
export class MailerModule {}
