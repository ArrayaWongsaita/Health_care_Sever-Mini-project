import { checkBody, checkParams, checkQuery, checkUser } from '../../shared/libs/express.lib.js';
import type { idParams } from '../../shared/schemas/params.schema.js';
import type { TokenPayload } from '../../shared/services/token.service.js';
import type { Handler } from '../../shared/types/express.type.js';
import {
  createDoctorNoteResponseDto,
  doctorNoteResponseDto,
  doctorNotesListResponseDto,
  updateDoctorNoteResponseDto,
  type CreateDoctorNoteRequestDto,
  type PaginationQueryDto,
  type UpdateDoctorNoteRequestDto,
} from './doctorNote.dto.js';
import { doctorNoteService, type DoctorNoteServiceInterface } from './doctorNote.service.js';

interface DoctorNoteControllerInterface {
  getAll: Handler<TokenPayload, unknown, unknown, PaginationQueryDto>;
  getById: Handler<TokenPayload, unknown, idParams>;
  create: Handler<TokenPayload, CreateDoctorNoteRequestDto>;
  update: Handler<TokenPayload, UpdateDoctorNoteRequestDto, idParams>;
  delete: Handler<TokenPayload, unknown, idParams>;
}

class DoctorNoteController implements DoctorNoteControllerInterface {
  constructor(private readonly doctorNoteService: DoctorNoteServiceInterface) {}

  getAll: Handler<TokenPayload, unknown, unknown, PaginationQueryDto> = async (req, res) => {
    const { userId, role } = checkUser(res.locals.user);
    const { page, limit } = checkQuery(res.locals.validateQuery);

    const result = await this.doctorNoteService.getAll(userId, role, page, limit);
    res.ok(result, doctorNotesListResponseDto);
  };

  getById: Handler<TokenPayload, unknown, idParams> = async (req, res) => {
    const { userId, role } = checkUser(res.locals.user);
    const { id } = checkParams(res.locals.validateParams);

    const result = await this.doctorNoteService.getById(id, userId, role);
    res.ok(result, doctorNoteResponseDto);
  };

  create: Handler<TokenPayload, CreateDoctorNoteRequestDto> = async (req, res) => {
    const { userId: doctorId } = checkUser(res.locals.user);
    const validateBody = checkBody(res.locals.validateBody);
    const result = await this.doctorNoteService.create(doctorId, validateBody);
    res.created(result, createDoctorNoteResponseDto);
  };

  update: Handler<TokenPayload, UpdateDoctorNoteRequestDto, idParams> = async (req, res) => {
    const { userId: doctorId } = checkUser(res.locals.user);
    const { id } = checkParams(res.locals.validateParams);
    const validateBody = checkBody(res.locals.validateBody);

    const result = await this.doctorNoteService.update(id, doctorId, validateBody);
    res.ok(result, updateDoctorNoteResponseDto);
  };

  delete: Handler<TokenPayload, unknown, idParams> = async (req, res) => {
    const { userId: doctorId } = checkUser(res.locals.user);
    const { id } = checkParams(res.locals.validateParams);

    await this.doctorNoteService.delete(id, doctorId);
    res.noContent();
  };
}

export const doctorNoteController = new DoctorNoteController(doctorNoteService);
