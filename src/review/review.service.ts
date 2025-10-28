import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity) 
        private reviewRepository: Repository<ReviewEntity>,
        private movieService: MovieService
    ) { }

    async create(dto: CreateReviewDto) {
        const { movie_id, text, rating } = dto;
        const movie = await this.movieService.findById(movie_id);
        const review = this.reviewRepository.create({
            movie,
            text,
            rating
        });
        return await this.reviewRepository.save(review);
    }
}
