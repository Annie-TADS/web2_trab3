import { Module } from '@nestjs/common';
import { EndpointAccessesService } from './endpoint-accesses.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [EndpointAccessesService, PrismaService],
  exports: [EndpointAccessesService]
})
export class EndpointAccessesModule {}
