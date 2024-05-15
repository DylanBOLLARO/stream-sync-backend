import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CreateMovieValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value.genres === 'string') {
      value.genres = [value.genres];
    }

    if (typeof value.directors === 'string') {
      value.directors = [value.directors];
    }

    if (typeof value.actors === 'string') {
      value.actors = [value.actors];
    }
    delete value.image_urls;
    delete value.url;
    delete value.images;
    return value;
  }
}
