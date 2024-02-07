import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateTvShowDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty()
    @IsNumber()
    rating: number;
}