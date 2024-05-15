import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.prisma.movie.create({ data: createMovieDto });
  }

  async findAll(search: any, take: number, skip: number) {
    return this.prisma.movie.findMany({
      where: {
        ...search,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
    });
  }

  async findOne(id: number) {
    return await this.prisma.movie.findUnique({ where: { id: +id } });
  }
}
