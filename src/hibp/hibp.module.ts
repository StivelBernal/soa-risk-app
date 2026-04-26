import { Module } from '@nestjs/common';
import { HibpService } from './hibp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HibpService],
  exports: [HibpService],
})
export class HibpModule {}
