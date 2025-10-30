import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity({
    name: "movie_posters"
})
export class MoviePosterEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    url: string;

    @OneToOne(() => MovieEntity, (movie) => movie.poster)
    movie: MovieEntity;

    @CreateDateColumn()
    created_at: Date;
}
