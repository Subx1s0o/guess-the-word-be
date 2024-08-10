import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AmountDTO } from './dto/amount.dto';
import {
  UserArrayWithoutPassword,
  UserWithoutPassword,
} from './dto/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...userData } = user;
    return userData;
  }

  async addMoney(data: AmountDTO): Promise<UserWithoutPassword> {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { money: { increment: data.amount } },
      select: {
        id: true,
        username: true,
        email: true,
        money: true,
        games: true,
        won: true,
        losed: true,
        photo: true,
      },
    });

    return user;
  }

  async minusMoney(data: AmountDTO): Promise<UserWithoutPassword> {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { money: { decrement: data.amount } },
      select: {
        id: true,
        username: true,
        email: true,
        money: true,
        games: true,
        won: true,
        losed: true,
        photo: true,
      },
    });

    return user;
  }

  async addWins(data: AmountDTO): Promise<UserWithoutPassword> {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { won: { increment: data.amount } },
      select: {
        id: true,
        username: true,
        email: true,
        money: true,
        games: true,
        won: true,
        losed: true,
        photo: true,
      },
    });

    return user;
  }

  async addLosed(data: AmountDTO): Promise<UserWithoutPassword> {
    if (typeof data.amount !== 'number')
      throw new BadRequestException('Amount must be a number');
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { losed: { increment: data.amount } },
      select: {
        id: true,
        username: true,
        email: true,
        money: true,
        games: true,
        won: true,
        losed: true,
        photo: true,
      },
    });

    return user;
  }

  async getTopUsers(): Promise<UserArrayWithoutPassword> {
    try {
      const users = await this.prisma.user.findMany({
        orderBy: { games: 'desc' },
        take: 10,
        select: {
          id: true,
          username: true,
          won: true,
          losed: true,
          photo: true,
          games: true,
        },
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'Get Top Users Failed :(, Try later',
      );
    }
  }
}
