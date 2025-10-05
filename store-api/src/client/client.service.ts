import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';
import { PaginatedResponseDto } from './dto/PaginatedResponse';
import { SearchDto } from './dto/SearchDto';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    this.logger.log('Creating client...');
    return this.prisma.client.create({ data: createClientDto });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  async findAllPaginated(
    query: SearchDto,
  ): Promise<PaginatedResponseDto<Client>> {
    const { page = 1, limit = 10, search } = query;

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { cpf: { contains: search } },
          ],
        }
      : {};

    const [total, data] = await this.prisma.$transaction([
      this.prisma.client.count({ where: whereClause }),
      this.prisma.client.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    this.logger.log(`Found ${total} clients`);
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    try {
      const client = this.prisma.client.findUnique({ where: { id } });
      this.logger.log(`Found client: ${JSON.stringify(client)}`);
      return client;
    } catch (error) {
      this.logger.error(`Error finding client with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.findOne(id);
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }
}
