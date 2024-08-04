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

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userData } = user;
    return userData;
  }

  async addMoney(data: AmountDTO) {
    const { userId, amount } = data;

    if (typeof amount !== 'number') {
      throw new BadRequestException('Amount must be a number');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        money: {
          increment: amount,
        },
      },
    });

    return updatedUser;
  }

  async minusMoney(data: AmountDTO) {
    const { userId, amount } = data;

    if (typeof amount !== 'number') {
      throw new BadRequestException('Amount must be a number');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        money: {
          decrement: amount,
        },
      },
    });

    return updatedUser;
  }
}
