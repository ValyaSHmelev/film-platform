import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";

@Entity({
    name: "reviews"
})
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
    })
    text: string;

    @Column({
        type: 'decimal',
        precision: 3,
        unsigned: true,
        default: 0,
        scale: 1
    })
    rating: number;

    @Column({
        type: 'uuid',
    })
    movie_id: string;

    @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'movie_id' })
    movie: MovieEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
