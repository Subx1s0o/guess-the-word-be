import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AmountDTO } from './dto/amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    const userId = req.user.sub;
    return this.userService.getUserById(userId);
  }

  @Patch('increment-money')
  @UseGuards(AuthGuard)
  async addMoney(@Body() data: AmountDTO) {
    return this.userService.addMoney(data);
  }

  @Patch('decrement-money')
  @UseGuards(AuthGuard)
  async decrementMoney(@Body() data: AmountDTO) {
    return this.userService.minusMoney(data);
  }
}
