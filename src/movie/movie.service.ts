import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private movieRepository: Repository<MovieEntity>
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
        const newMovie = this.movieRepository.create(movieDto); 
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
