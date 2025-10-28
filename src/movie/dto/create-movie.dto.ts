import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    release_year: number;
}
