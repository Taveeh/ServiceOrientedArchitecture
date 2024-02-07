import { ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateTvShowDto } from "./dto/create-tv-show.dto";
import { TvShowService } from "./tv-show.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TvShow } from "./entities/tv-show.entity";
import { TransformInterceptor } from "../public/interceptors/transform.interceptor";

@ApiTags("TvShows")
@Controller("tvshows")
export class TvShowsController {
  constructor(private readonly tvShowsService: TvShowService) {}

  @Post()
  @UseInterceptors(new TransformInterceptor(CreateTvShowDto))
  create(@Body() createTvShowDto: CreateTvShowDto) {
    return this.tvShowsService.create(createTvShowDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<TvShow[]> {
    return this.tvShowsService.findAll();
  }

  @Put()
  updateRating(@Body() body: { rating: number }) {
    console.log("We got here");
    return this.tvShowsService.updateRating(body.rating);
  }
}
