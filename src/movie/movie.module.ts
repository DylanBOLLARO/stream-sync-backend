import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	imports: [PrismaModule],
	controllers: [MovieController],
	providers: [MovieService, PrismaService],
})
export class MovieModule {}
