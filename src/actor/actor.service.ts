import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entites/actor.entity';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
    constructor(
        @InjectRepository(ActorEntity) 
        private readonly actorRepository: Repository<ActorEntity>) { }

    async create(createActorDto: CreateActorDto): Promise<ActorEntity> {
        const actor = this.actorRepository.create(createActorDto);
        return this.actorRepository.save(actor);
    }
}
