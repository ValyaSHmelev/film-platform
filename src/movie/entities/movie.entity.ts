import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn
} from "typeorm";
import { ReviewEntity } from "../../review/entities/review.entity";
import { ActorEntity } from "../../actor/entites/actor.entity";
import { MoviePosterEntity } from "./poster.entity";

enum Genre {
    ACTION = 'Action',
    COMEDY = 'Comedy',
    DRAMA = 'Drama',
    HORROR = 'Horror',
    ROMANCE = 'Romance',
    THRILLER = 'Thriller'
}

@Entity({
    name: "movies"
})
export class MovieEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 128
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'int',
        unsigned: true,
    })
    release_year: number;

    @Column({
        type: 'decimal',
        precision: 3,
        unsigned: true,
        default: 0,
        scale: 1
    })
    rating: number;

    @Column({ 
        type: 'boolean',
        default: false
    })
    is_available: boolean;

    @Column({
        type: 'enum',
        enum: Genre,
        default: Genre.DRAMA
    })
    genre: Genre;

    @Column({
        type: 'uuid',
        nullable: true
    })
    poster_id: string;

    @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn({
        name: 'poster_id',
        referencedColumnName: 'id'
    })
    poster: MoviePosterEntity | null;

    @OneToMany(() => ReviewEntity, (review) => review.movie)
    reviews: ReviewEntity[];

    @ManyToMany(() => ActorEntity, (actor) => actor.movies)
    @JoinTable({
        name: 'movie_actors',
        joinColumn: {
            name: 'movie_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'actor_id',
            referencedColumnName: 'id'
        }
    })
    actors: ActorEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
