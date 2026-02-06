import { BusinessErrors } from '../../shared/errors/business.errors.js';
import type {
  CreateHealthRecordRequestDto,
  CreateHealthRecordResponseDto,
  HealthRecordResponseDto,
  HealthRecordsListResponseDto,
  UpdateHealthRecordRequestDto,
  UpdateHealthRecordResponseDto,
} from './healthRecord.dto.js';
import {
  healthRecordRepository,
  type HealthRecordRepositoryInterface,
} from './healthRecord.repository.js';

export interface HealthRecordServiceInterface {
  getAll: (userId: string, page: number, limit: number) => Promise<HealthRecordsListResponseDto>;
  getById: (id: string, userId: string) => Promise<HealthRecordResponseDto>;
  create: (
    userId: string,
    data: CreateHealthRecordRequestDto,
  ) => Promise<CreateHealthRecordResponseDto>;
  update: (
    id: string,
    userId: string,
    data: UpdateHealthRecordRequestDto,
  ) => Promise<UpdateHealthRecordResponseDto>;
  delete: (id: string, userId: string) => Promise<void>;
}

class HealthRecordService implements HealthRecordServiceInterface {
  constructor(private readonly healthRecordRepository: HealthRecordRepositoryInterface) {}

  public async getAll(
    userId: string,
    page: number,
    limit: number,
  ): Promise<HealthRecordsListResponseDto> {
    const [records, total] = await Promise.all([
      this.healthRecordRepository.findAllByUserId(userId, page, limit),
      this.healthRecordRepository.countByUserId(userId),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      healthRecords: records.map((record) => ({
        id: record.id,
        type: record.type,
        value: record.value,
        unit: record.unit,
        note: record.note,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string, userId: string): Promise<HealthRecordResponseDto> {
    const record = await this.healthRecordRepository.findById(id, userId);

    if (!record) {
      throw BusinessErrors.notFound('Health record not found');
    }

    return {
      id: record.id,
      type: record.type,
      value: record.value,
      unit: record.unit,
      note: record.note,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  public async create(
    userId: string,
    data: CreateHealthRecordRequestDto,
  ): Promise<CreateHealthRecordResponseDto> {
    const record = await this.healthRecordRepository.create(userId, data);

    return {
      id: record.id,
      type: record.type,
      value: record.value,
      unit: record.unit,
      note: record.note,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  public async update(
    id: string,
    userId: string,
    data: UpdateHealthRecordRequestDto,
  ): Promise<UpdateHealthRecordResponseDto> {
    // Check if record exists
    const existingRecord = await this.healthRecordRepository.findById(id, userId);
    if (!existingRecord) {
      throw BusinessErrors.notFound('Health record not found');
    }

    const record = await this.healthRecordRepository.update(id, userId, data);

    return {
      id: record.id,
      type: record.type,
      value: record.value,
      unit: record.unit,
      note: record.note,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  public async delete(id: string, userId: string): Promise<void> {
    // Check if record exists
    const existingRecord = await this.healthRecordRepository.findById(id, userId);
    if (!existingRecord) {
      throw BusinessErrors.notFound('Health record not found');
    }

    await this.healthRecordRepository.delete(id, userId);
  }
}

export const healthRecordService = new HealthRecordService(healthRecordRepository);
