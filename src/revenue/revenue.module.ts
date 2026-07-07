import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Revenue, RevenueSchema } from 'src/Schema/revenue.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: Revenue.name,
      schema: RevenueSchema
      },
  ]), AuthModule
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
  exports: [RevenueService]
})

export class RevenueModule {}
