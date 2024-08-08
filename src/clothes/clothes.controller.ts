import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/clothes-pagination.dt';
import { CLOTHES_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('clothes')
export class ClothesController {
  constructor(
    @Inject(CLOTHES_SERVICE) private readonly clothesCLient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.clothesCLient.send({ cmd: 'create' }, createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.clothesCLient.send({ cmd: 'get_all' }, paginationDto);
  }

  @Get('/deleted')
  getAllProductsDeleted() {
    return this.clothesCLient.send({ cmd: 'get_all_deleted' }, {});
  }

  @Get('/tags')
  getAllTags() {
    return this.clothesCLient.send({ cmd: 'get_all_tags' }, {});
  }

  @Get(':term')
  async findOne(@Param('term') term: string) {
    return this.clothesCLient.send({ cmd: 'get_by' }, term).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.clothesCLient.send({ cmd: 'delete' }, id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('/restore/:id')
  restoreProduct(@Param('id') id: string) {
    return this.clothesCLient.send({ cmd: 'restore' }, id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log(updateProductDto);
    return this.clothesCLient
      .send(
        { cmd: 'update' },
        {
          id,
          updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
