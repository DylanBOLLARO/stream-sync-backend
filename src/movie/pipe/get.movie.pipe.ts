import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class GetMoviePipe implements PipeTransform {
	transform(value: any, metadata: any) {
		if (value && metadata?.data === 'take') return +value;
		if (value && metadata?.data === 'page') {
			if (value < 1) value = 1;
			return +value - 1;
		}
		if (value && metadata?.data === 'select')
			return value.map((id: string) => +id);
		return value;
	}
}
