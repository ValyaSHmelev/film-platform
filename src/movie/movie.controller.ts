import { Controller, Get, Post, Body, Param, Put, Delete  } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MovieEntity> {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() movieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieService.create(movieDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() movieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieService.update(id, movieDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.movieService.delete(id);
  }
}
