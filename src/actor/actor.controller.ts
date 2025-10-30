import { Controller, Post, Body } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorEntity } from './entites/actor.entity';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  async create(@Body() createActorDto: CreateActorDto): Promise<ActorEntity> {
    return this.actorService.create(createActorDto);
  }
}
