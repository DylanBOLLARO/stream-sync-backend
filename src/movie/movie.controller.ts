import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateMovieValidationPipe } from './pipe/create.movie.pipe';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UsePipes(new CreateMovieValidationPipe())
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<any[]> {
    const search = searchString
      ? {
          OR: [
            { title: { contains: searchString, mode: 'insensitive' } },
            { synopsis: { contains: searchString, mode: 'insensitive' } },
          ],
        }
      : {};

    return this.movieService.findAll(search, take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }
}
