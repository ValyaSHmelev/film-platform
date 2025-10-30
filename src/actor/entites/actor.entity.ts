import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";

@Entity({
    name: "actors"
})
export class ActorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string;

    @Column({
        type: 'uuid',
    })
    movie_id: string;

    @ManyToMany(() => MovieEntity, (movie) => movie.actors)
    movies: MovieEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}