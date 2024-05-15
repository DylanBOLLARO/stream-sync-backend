import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class GetMoviePipe implements PipeTransform {
	transform(value: any, metadata: any) {
		if (value && metadata?.data === 'take') return +value;
		if (value && metadata?.data === 'skip') return +value;
		if (value && metadata?.data === 'select')
			return value.map((id: string) => +id);
		return value;
	}
}
