import { BadRequestException, Injectable, NotFoundException  } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';

@Injectable()
export class ProductService {

  @InjectRepository(Product) 
  private ProductRepository: Repository<Product>

  async create(createProductDto: CreateProductDto) {
    try {
      var NewDto : CreateProductDto;
      NewDto = {
        name: createProductDto.name,
        description : createProductDto.description,
        price : createProductDto.price
      }
    await this.ProductRepository.save(NewDto);
    return { 
      statusCode: 200,
      msg: 'Producto creado con exito'
    }
    }
    catch (error){
      return new BadRequestException(error);
    }
  }  

  async findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.ProductRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produt with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.ProductRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.ProductRepository.remove(product);
  }
}