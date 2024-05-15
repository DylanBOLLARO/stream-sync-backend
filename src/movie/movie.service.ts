import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async create(createMovieDto: CreateMovieDto) {
		return await this.prisma.movie.create({ data: createMovieDto });
	}

	async findOne(id: number) {
		return await this.prisma.movie.findUnique({ where: { id: +id } });
	}

	async getMovies(params: {
		skip?: number;
		take?: number;
		cursor?: any;
		where?: any;
		orderBy?: any;
	}) {
		return this.prisma.movie.findMany(params);
	}
}
