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
		const { searchString, select } = params;

		const where: any = {};

		if (select?.length > 0) {
			where.id = { in: select };
		}

		if (searchString) {
			where.title = { contains: searchString, mode: 'insensitive' };
		}

		return where;
	}

	@Get('/favorite')
	@UsePipes(new GetMoviePipe())
	async favorite(@Query('select') select?: Array<string>) {
		if (!select || select?.length == 0) return;
		return await this.movieService.getMovies({
			where: this.createSearch({ select }),
		});
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

	@Get('filter/:searchString')
	@UsePipes(new GetMoviePipe())
	async getFilteredMovies(
		@Param('searchString') searchString: string,
		@Query('take') take?: number,
		@Query('page') page?: number,
		@Query('cursor') cursor?: string,
		@Query('orderBy') orderBy?: string,
		// @Query('select') select?: number[],
	) {
		const skip = (page ?? 0) * (take ?? 0);

		return await this.movieService.getMovies({
			where: this.createSearch({
				searchString,
			}),
			skip,
			cursor,
			orderBy: { audience_rating: orderBy },
			take,
		});
	}

	@Get()
	@UsePipes(new GetMoviePipe())
	async getMovies(
		@Query('take') take?: number,
		@Query('page') page?: number,
		@Query('cursor') cursor?: string,
		@Query('orderBy') orderBy?: string,
		@Query('select') select?: number[],
	) {
		const skip = (page ?? 0) * (take ?? 0);
		return await this.movieService.getMovies({
			where: this.createSearch({
				select,
			}),
			skip,
			cursor,
			orderBy: { audience_rating: orderBy },
			take,
		});
	}
}
