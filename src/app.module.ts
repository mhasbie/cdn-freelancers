import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppsResolver } from './app.resolver';
import { AppService } from './app.service';
import { User } from './entity/user.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			debug: true,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql')
		}),
		TypeOrmModule.forRoot({
			type: 'mongodb',
			url: process.env.MONGODB_CONNECTION_STRING,
			database: process.env.MONGODB_DATABASE,
			entities: [
				__dirname + '/**/*.entity{.ts,.js}',
			],
			ssl: true,
			useUnifiedTopology: true,
			useNewUrlParser: true
		}),
		TypeOrmModule.forFeature([User])
	],
	controllers: [AppController],
	providers: [AppService, AppsResolver],
})
export class AppModule {}
