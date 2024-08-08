import { Module } from '@nestjs/common';
import { TechproductsController } from './techproducts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TECHPRODUCT_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [TechproductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: TECHPRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.TECHPRODUCTS_MICROSERVICE_HOST,
          port: envs.TECHPRODUCTS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class TechproductsModule {}
