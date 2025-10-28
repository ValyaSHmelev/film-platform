import { IsNotEmpty, IsString, IsNumber, IsUUID, Min, Max } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number;

    @IsUUID()
    @IsNotEmpty()
    movie_id: string;
}
