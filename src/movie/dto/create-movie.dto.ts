import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  genres: Array<string>;
  directors: Array<string>;
  actors: Array<string>;

  @IsNotEmpty()
  @IsString()
  audience_rating: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
