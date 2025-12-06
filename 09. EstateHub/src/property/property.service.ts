import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entity/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}
  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: { id },
    });

    if (!property) throw new NotFoundException();
    return property;
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.propertyRepo.find({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    const property = await this.propertyRepo.preload({ id, ...dto });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepo.save(property);
  }

  async delete(id: number) {
    const result = await this.propertyRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Property not found');
    }

    return { message: 'Property deleted successfully' };
  }
}
