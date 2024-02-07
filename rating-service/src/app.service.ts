import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  update(rating: number) {
    console.log('Rating ---->', rating);
  }
}
