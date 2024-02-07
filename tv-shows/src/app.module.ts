import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { configuration, IConfig, validate } from "./public/configuration";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TvShow } from "./tv-shows/entities/tv-show.entity";
import { TvShowsModule } from "./tv-shows/tv-shows.module";
import { TvShowsController } from "./tv-shows/tv-shows.controller";
import { User } from "./users/entities/user.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

// todo: add all entities here
const ENTITIES = [TvShow, User];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["config/development.env"],
      load: [configuration],
      isGlobal: true,
      cache: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<IConfig>) => {
        console.log("config", config);
        return {
          type: "postgres",
          host: config.get("DB_HOST"),
          port: config.get("DB_PORT"),
          username: config.get("DB_USERNAME"),
          password: config.get("DB_PASSWORD"),
          database: config.get("DB_DATABASE"),
          entities: ENTITIES,
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    TvShowsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, TvShowsController],
  providers: [AppService],
})
export class AppModule {}
