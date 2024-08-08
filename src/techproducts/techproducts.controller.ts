import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TECHPRODUCT_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('techproducts')
export class TechproductsController {
  constructor(
    @Inject(TECHPRODUCT_SERVICE) private readonly techProdClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.techProdClient.send({ cmd: 'create' }, createProductDto);
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.techProdClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.techProdClient.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.techProdClient.send({ cmd: 'delete' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.techProdClient
      .send(
        { cmd: 'update' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
