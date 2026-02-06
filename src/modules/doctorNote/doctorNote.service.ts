import { BusinessErrors } from '../../shared/errors/business.errors.js';
import type {
  CreateDoctorNoteRequestDto,
  CreateDoctorNoteResponseDto,
  DoctorNoteResponseDto,
  DoctorNotesListResponseDto,
  UpdateDoctorNoteRequestDto,
  UpdateDoctorNoteResponseDto,
} from './doctorNote.dto.js';
import {
  doctorNoteRepository,
  type DoctorNoteRepositoryInterface,
} from './doctorNote.repository.js';

export interface DoctorNoteServiceInterface {
  getAll: (
    userId: string,
    role: string,
    page: number,
    limit: number,
  ) => Promise<DoctorNotesListResponseDto>;
  getById: (id: string, userId: string, role: string) => Promise<DoctorNoteResponseDto>;
  create: (
    doctorId: string,
    data: CreateDoctorNoteRequestDto,
  ) => Promise<CreateDoctorNoteResponseDto>;
  update: (
    id: string,
    doctorId: string,
    data: UpdateDoctorNoteRequestDto,
  ) => Promise<UpdateDoctorNoteResponseDto>;
  delete: (id: string, doctorId: string) => Promise<void>;
}

class DoctorNoteService implements DoctorNoteServiceInterface {
  constructor(private readonly doctorNoteRepository: DoctorNoteRepositoryInterface) {}

  public async getAll(userId: string, role: string, page: number, limit: number) {
    let notes;
    let total;

    if (role === 'DOCTOR') {
      [notes, total] = await Promise.all([
        this.doctorNoteRepository.findAll(page, limit),
        this.doctorNoteRepository.countAll(),
      ]);
    } else {
      [notes, total] = await Promise.all([
        this.doctorNoteRepository.findAllByUserId(userId, page, limit),
        this.doctorNoteRepository.countByUserId(userId),
      ]);
    }

    const totalPages = Math.ceil(total / limit);

    return {
      doctorNotes: notes.map((n) => ({
        id: n.id,
        note: n.note,
        doctorId: n.doctorId,
        patientId: n.patientId,
        createdAt: n.createdAt.toISOString(),
        updatedAt: n.updatedAt.toISOString(),
      })),
      pagination: { page, limit, total, totalPages },
    };
  }

  public async getById(id: string, userId: string, role: string) {
    let note;
    if (role === 'DOCTOR') {
      note = await this.doctorNoteRepository.findByIdForDoctor(id);
    } else {
      note = await this.doctorNoteRepository.findById(id, userId);
    }

    if (!note) {
      throw BusinessErrors.notFound('Doctor note not found');
    }

    return {
      id: note.id,
      note: note.note,
      doctorId: note.doctorId,
      patientId: note.patientId,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  public async create(doctorId: string, data: CreateDoctorNoteRequestDto) {
    const note = await this.doctorNoteRepository.create(doctorId, data);

    return {
      id: note.id,
      note: note.note,
      doctorId: note.doctorId,
      patientId: note.patientId,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  public async update(id: string, doctorId: string, data: UpdateDoctorNoteRequestDto) {
    const existing = await this.doctorNoteRepository.findByIdAndDoctor(id, doctorId);
    if (!existing) {
      throw BusinessErrors.notFound('Doctor note not found');
    }

    const note = await this.doctorNoteRepository.update(id, doctorId, data);
    return {
      id: note.id,
      note: note.note,
      doctorId: note.doctorId,
      patientId: note.patientId,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  public async delete(id: string, doctorId: string) {
    const existing = await this.doctorNoteRepository.findByIdAndDoctor(id, doctorId);
    if (!existing) {
      throw BusinessErrors.notFound('Doctor note not found');
    }

    await this.doctorNoteRepository.delete(id, doctorId);
  }
}

export const doctorNoteService = new DoctorNoteService(doctorNoteRepository);
