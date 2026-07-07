import { Controller, Post, Get, Patch, Delete, Req, Body, Param, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { AuthGuard } from 'src/guards/authGuard/auth.guards';
import { CreateRevenueDto } from 'src/dto/Revenue_Dto/createRevenue.dto';
import { UpdateRevenueDto } from 'src/dto/Revenue_Dto/updateRevenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @UseGuards(AuthGuard)
  @Post("create-revenue")
  createRevenue(@Body() createRevenueDto: CreateRevenueDto, @Req() req:any) {
    return this.revenueService.createRevenue(createRevenueDto, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  updateRevenue(@Body() updateRevenueDto: UpdateRevenueDto, @Req() req: any, @Param("id") id: string) {
    return this.revenueService.updateRevenue(id, updateRevenueDto, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  deleteRevenue(@Param("id") id: string, @Req() req: any) {
    return this.revenueService.deleteRevenue(id, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Get()
  fetchingRevenue(@Req() req: any) {
    return this.revenueService.findRevenueTotal(req.user.sub)
  }
}
