import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UsePipes,
	Query,
	ParseIntPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateMovieValidationPipe } from './pipe/create.movie.pipe';
import { GetMoviePipe } from './pipe/get.movie.pipe';

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	private createSearch(params: any) {
		const { select, searchString } = params;

		let where: any = {};

		if (select) {
			where = {
				id: {
					in: select,
				},
			};
		}

		if (searchString) {
			where = {
				name: { contains: searchString, mode: 'insensitive' },
			};
		}

		return where;
	}

	@Post()
	@UsePipes(new CreateMovieValidationPipe())
	create(@Body() createMovieDto: CreateMovieDto) {
		return this.movieService.create(createMovieDto);
	}

	@Get(':id')
	@UsePipes(new ParseIntPipe())
	async getFormationById(@Param('id') id: string) {
		return (
			await this.movieService.getMovies({
				where: {
					id,
				},
			})
		)[0];
	}

	@Get()
	@Get('filter/:searchString')
	@UsePipes(new GetMoviePipe())
	async getMovies(
		@Param('searchString') searchString: string,
		@Query('take') take?: number,
		@Query('skip') skip?: number,
		@Query('cursor') cursor?: string,
		@Query('orderBy') orderBy?: 'asc' | 'desc',
		@Query('select') select?: Array<number>,
	) {
		return this.movieService.getMovies({
			where: this.createSearch({
				select,
				searchString,
			}),
			skip,
			cursor,
			orderBy,
			take,
		});
	}
}
