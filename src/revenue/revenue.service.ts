import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Revenue } from 'src/Schema/revenue.schema';
import { CreateRevenueDto } from 'src/dto/Revenue_Dto/createRevenue.dto';
import { UpdateRevenueDto } from 'src/dto/Revenue_Dto/updateRevenue.dto';
import { BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common/exceptions"
import mongoose from 'mongoose';

@Injectable()
export class RevenueService {
  
  constructor(@InjectModel(Revenue.name) private readonly revenueSchema:Model<Revenue>) {}

  async createRevenue(createRevenueDto: CreateRevenueDto, userId: string) {
    
    const revenue = await this.revenueSchema.create({
      ...createRevenueDto,
      user: userId
    })

    return revenue
  
  }

  async deleteRevenue(id: string, userId: string) {
    
    if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id")
    
    const revenue = await this.revenueSchema.findById(id);

    if(!revenue) throw new NotFoundException("Revenue is not found");

    if(revenue.user.toString() !== userId.toString()) throw new ForbiddenException("You are not allowed to delete this revenue")

    const revenueDeleted = await this.revenueSchema.findByIdAndDelete(id);

    return revenueDeleted;
  
  }

  async findRevenueTotal(userId: string) {
    
    return await this.revenueSchema.find({
      user: userId
    }).sort({createdAt:-1});
  
  }

  async updateRevenue(id: string, updateRevenueDto: UpdateRevenueDto, userId: string) {
    
    if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id")

    const revenue = await this.revenueSchema.findById(id);

    if(!revenue) throw new NotFoundException("Revenue is not found");

    if(revenue.user.toString() !== userId.toString()) throw new ForbiddenException("You ae not allowed to update this revenue");

    const updatedRevenue = await this.revenueSchema.findByIdAndUpdate(id, updateRevenueDto, { new: true });

    return updatedRevenue;

  }
}
