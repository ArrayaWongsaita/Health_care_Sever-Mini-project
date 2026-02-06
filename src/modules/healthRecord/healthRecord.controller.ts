import { checkBody, checkParams, checkQuery, checkUser } from '../../shared/libs/express.lib.js';
import type { idParams } from '../../shared/schemas/params.schema.js';
import type {} from '../../shared/services/token.service.js';
import type { Handler } from '../../shared/types/express.type.js';
import {
  createHealthRecordResponseDto,
  healthRecordResponseDto,
  healthRecordsListResponseDto,
  updateHealthRecordResponseDto,
  type CreateHealthRecordRequestDto,
  type PaginationQueryDto,
  type UpdateHealthRecordRequestDto,
} from './healthRecord.dto.js';
import { healthRecordService, type HealthRecordServiceInterface } from './healthRecord.service.js';

interface HealthRecordControllerInterface {
  getAll: Handler<undefined, undefined, PaginationQueryDto>;
  getById: Handler<undefined, idParams>;
  create: Handler<CreateHealthRecordRequestDto>;
  update: Handler<UpdateHealthRecordRequestDto, idParams>;
  delete: Handler<undefined, idParams>;
}

class HealthRecordController implements HealthRecordControllerInterface {
  constructor(private readonly healthRecordService: HealthRecordServiceInterface) {}

  getAll: Handler<undefined, undefined, PaginationQueryDto> = async (_, res) => {
    // Arrange
    const { userId } = checkUser(res.locals.user);
    const { page, limit } = checkQuery(res.locals.validateQuery);

    // Act
    const result = await this.healthRecordService.getAll(userId, page, limit);
    // Assert
    res.ok(result, healthRecordsListResponseDto);
  };

  getById: Handler<undefined, idParams> = async (_, res) => {
    // Arrange
    const { userId } = checkUser(res.locals.user);
    const { id } = checkParams(res.locals.validateParams);
    // Act
    const result = await this.healthRecordService.getById(id, userId);
    //Assert
    res.ok(result, healthRecordResponseDto);
  };

  create: Handler<CreateHealthRecordRequestDto> = async (req, res) => {
    // Arrange
    const { userId } = checkUser(res.locals.user);
    const validateBody = checkBody(res.locals.validateBody);
    // Act
    const result = await this.healthRecordService.create(userId, validateBody);
    // Assert
    res.created(result, createHealthRecordResponseDto);
  };

  update: Handler<UpdateHealthRecordRequestDto, idParams> = async (req, res) => {
    // Arrange
    const { userId } = checkUser(res.locals.user);
    const { id } = checkParams(res.locals.validateParams);
    const validateBody = checkBody(res.locals.validateBody);

    // Act
    const result = await this.healthRecordService.update(id, userId, validateBody);
    // Assert
    res.ok(result, updateHealthRecordResponseDto);
  };

  delete: Handler<undefined, idParams> = async (_, res) => {
    // Arrange
    const { userId } = checkUser(res.locals.user);
    const { id: healthRecordId } = checkParams(res.locals.validateParams);

    // Act
    await this.healthRecordService.delete(healthRecordId, userId);
    // Assert
    res.noContent();
  };
}

export const healthRecordController = new HealthRecordController(healthRecordService);
