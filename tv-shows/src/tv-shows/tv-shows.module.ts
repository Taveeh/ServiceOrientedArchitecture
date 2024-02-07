import { Module } from "@nestjs/common";
import { TvShowsController } from "./tv-shows.controller";
import { TvShowService } from "./tv-show.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TvShow } from "./entities/tv-show.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([TvShow]),
    ClientsModule.register([
      {
        name: "RATING_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "rating",
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "rating-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [TvShowsController],
  providers: [TvShowService],
  exports: [TvShowService],
})
export class TvShowsModule {}
