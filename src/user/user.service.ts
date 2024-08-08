import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AmountDTO } from './dto/amount.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...userData } = user;
    return userData;
  }

  async addMoney(data: AmountDTO) {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { money: { increment: data.amount } },
    });
    const { password, ...cleanedUser } = user;
    return { user: cleanedUser };
  }

  async minusMoney(data: AmountDTO) {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { money: { decrement: data.amount } },
    });
    const { password, ...cleanedUser } = user;
    return { user: cleanedUser };
  }

  async addWins(data: AmountDTO) {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { won: { increment: data.amount } },
    });
    const { password, ...cleanedUser } = user;
    return { user: cleanedUser };
  }

  async addLosed(data: AmountDTO) {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { losed: { increment: data.amount } },
    });
    const { password, ...cleanedUser } = user;
    return { user: cleanedUser };
  }
}
