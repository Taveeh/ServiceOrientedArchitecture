import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpService } from "@nestjs/axios";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/login")
  login(@Body() body: { email: string; password: string }) {
    return this.httpService.axiosRef
      .post("http://authentication-api:3001/auth/login", body)
      .then((data) => data.data);
  }

  @Get("/tvshows")
  findAllTvShows(@Req() request: Request) {
    const authorization = request.headers["authorization"];

    return this.httpService.axiosRef
      .get("http://tv-shows-api:3002/tvshows", {
        headers: { Authorization: authorization },
      })
      .then((data) => data.data);
  }

  @Get("/:name")
  getHelloName(@Param("name") name: string) {
    return this.httpService.axiosRef
      .get(
        `https://soafunctionoctavian.azurewebsites.net/api/soafunction?name=${name}`
      )
      .then((data) => data.data);
  }
}
