import { Module } from '@nestjs/common';
import { TechproductsModule } from './techproducts/techproducts.module';
import { ClothesModule } from './clothes/clothes.module';

@Module({
  imports: [TechproductsModule, ClothesModule],
})
export class AppModule {}
