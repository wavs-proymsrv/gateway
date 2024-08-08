import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLOTHES_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { ClothesController } from './clothes.controller';

@Module({
  controllers: [ClothesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CLOTHES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.CLOTHES_MICROSERVICE_HOST,
          port: envs.CLOTHES_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class ClothesModule {}
