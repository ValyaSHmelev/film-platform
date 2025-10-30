import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorEntity } from '../actor/entites/actor.entity';
import { In } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private movieRepository: Repository<MovieEntity>,
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
        const { actor_ids, ...movieData } = movieDto;
        const actors = await this.actorRepository.find({ where: { id: In(actor_ids) } });

        if (actors.length !== actor_ids.length) {
            throw new NotFoundException('Some actors not found');
        }

        const newMovie = this.movieRepository.create({
            ...movieData,
            actors
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
