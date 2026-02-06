import type {
  PrismaClient,
  HealthRecord,
} from '../../infrastructure/db/generated/prisma/client.js';
import { prisma } from '../../infrastructure/db/prisma.db.js';
import type {
  CreateHealthRecordRequestDto,
  UpdateHealthRecordRequestDto,
} from './healthRecord.dto.js';

export interface HealthRecordRepositoryInterface {
  findById: (id: string, userId: string) => Promise<HealthRecord | null>;
  findAllByUserId: (userId: string, page: number, limit: number) => Promise<HealthRecord[]>;
  countByUserId: (userId: string) => Promise<number>;
  create: (userId: string, data: CreateHealthRecordRequestDto) => Promise<HealthRecord>;
  update: (id: string, userId: string, data: UpdateHealthRecordRequestDto) => Promise<HealthRecord>;
  delete: (id: string, userId: string) => Promise<void>;
}

export class HealthRecordPrismaRepository implements HealthRecordRepositoryInterface {
  constructor(private readonly db: PrismaClient) {}

  public async findById(id: string, userId: string): Promise<HealthRecord | null> {
    return await this.db.healthRecord.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  public async findAllByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<HealthRecord[]> {
    const skip = (page - 1) * limit;
    return await this.db.healthRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }

  public async countByUserId(userId: string): Promise<number> {
    return await this.db.healthRecord.count({
      where: { userId },
    });
  }

  public async create(userId: string, data: CreateHealthRecordRequestDto): Promise<HealthRecord> {
    return await this.db.healthRecord.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  public async update(
    id: string,
    userId: string,
    data: UpdateHealthRecordRequestDto,
  ): Promise<HealthRecord> {
    return await this.db.healthRecord.update({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
      data: {
        type: data.type,
        value: data.value,
        unit: data.unit,
        note: data.note,
      },
    });
  }

  public async delete(id: string, userId: string): Promise<void> {
    await this.db.healthRecord.delete({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    });
  }
}

export const healthRecordRepository = new HealthRecordPrismaRepository(prisma);
