import { IsArray, IsInt, IsNotEmpty, Max, Min, IsUUID } from "class-validator";

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

    @IsArray()
    @IsUUID('4', { each: true })
    actor_ids: string[];
}
