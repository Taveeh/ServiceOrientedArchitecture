import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TvShow } from "./entities/tv-show.entity";
import { Repository } from "typeorm";
import { CreateTvShowDto } from "./dto/create-tv-show.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class TvShowService {
  constructor(
    @InjectRepository(TvShow)
    private readonly tvShowRepository: Repository<TvShow>,
    @Inject("RATING_SERVICE")
    private readonly ratingClient: ClientKafka
  ) {}

  async create(createTvShowDto: CreateTvShowDto) {
    return this.tvShowRepository.save({
      ...createTvShowDto,
      releaseDate: new Date(),
    });
  }

  findAll() {
    return this.tvShowRepository.find();
  }

  async updateRating(rating: number) {
    this.ratingClient.emit("rating_update", { rating: rating });
  }
}
