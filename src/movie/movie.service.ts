import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorEntity } from '../actor/entites/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private movieRepository: Repository<MovieEntity>,
        @InjectRepository(MoviePosterEntity)
        private moviePosterRepository: Repository<MoviePosterEntity>,
        @InjectRepository(ActorEntity)
        private actorRepository: Repository<ActorEntity>
    ) {}

    async findAll(): Promise<MovieEntity[]> {
        return this.movieRepository.find({
            where: {
                is_available: true
            },
            order: {
                created_at: 'DESC'
            }
        });
    }

    async findById(id: string): Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        return movie;
    }

    async create(movieDto: CreateMovieDto): Promise<MovieEntity> {
        const { actor_ids, image_url, description, release_year, title } = movieDto;
        const actors = await this.actorRepository.find({ where: { id: In(actor_ids) } });

        if (actors.length !== actor_ids.length) {
            throw new NotFoundException('Some actors not found');
        }

        let poster: MoviePosterEntity | null = null;

        if (image_url) {
            poster = this.moviePosterRepository.create({
                url: image_url
            });
            await this.moviePosterRepository.save(poster);
        }

        const newMovie = this.movieRepository.create({
            title,
            description,
            release_year,
            actors,
            poster
        }); 
        return await this.movieRepository.save(newMovie);
    }

    async update(id: string, movieDto: CreateMovieDto): Promise<MovieEntity> {
        const movie = await this.findById(id);

        Object.assign(movie, movieDto);
        return await this.movieRepository.save(movie);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.movieRepository.delete(id);
    }
}
