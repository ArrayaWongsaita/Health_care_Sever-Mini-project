import type { PrismaClient, DoctorNote } from '../../infrastructure/db/generated/prisma/client.js';
import { prisma } from '../../infrastructure/db/prisma.db.js';
import type { CreateDoctorNoteRequestDto, UpdateDoctorNoteRequestDto } from './doctorNote.dto.js';

export interface DoctorNoteRepositoryInterface {
  findById: (id: string, userId: string) => Promise<DoctorNote | null>;
  findByIdAndDoctor: (id: string, doctorId: string) => Promise<DoctorNote | null>;
  findByIdForDoctor: (id: string) => Promise<DoctorNote | null>;
  findAllByUserId: (userId: string, page: number, limit: number) => Promise<DoctorNote[]>;
  countByUserId: (userId: string) => Promise<number>;
  findAll: (page: number, limit: number) => Promise<DoctorNote[]>;
  countAll: () => Promise<number>;
  create: (doctorId: string, data: CreateDoctorNoteRequestDto) => Promise<DoctorNote>;
  update: (id: string, doctorId: string, data: UpdateDoctorNoteRequestDto) => Promise<DoctorNote>;
  delete: (id: string, doctorId: string) => Promise<void>;
}

export class DoctorNotePrismaRepository implements DoctorNoteRepositoryInterface {
  constructor(private readonly db: PrismaClient) {}

  public async findById(id: string, userId: string): Promise<DoctorNote | null> {
    return await this.db.doctorNote.findFirst({
      where: {
        id,
        OR: [{ doctorId: userId }, { patientId: userId }],
      },
    });
  }

  public async findByIdAndDoctor(id: string, doctorId: string): Promise<DoctorNote | null> {
    return await this.db.doctorNote.findFirst({ where: { id, doctorId } });
  }

  public async findByIdForDoctor(id: string): Promise<DoctorNote | null> {
    return await this.db.doctorNote.findUnique({ where: { id } });
  }

  public async findAllByUserId(userId: string, page: number, limit: number): Promise<DoctorNote[]> {
    const skip = (page - 1) * limit;
    return await this.db.doctorNote.findMany({
      where: { OR: [{ doctorId: userId }, { patientId: userId }] },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }

  public async findAll(page: number, limit: number): Promise<DoctorNote[]> {
    const skip = (page - 1) * limit;
    return await this.db.doctorNote.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }

  public async countByUserId(userId: string): Promise<number> {
    return await this.db.doctorNote.count({
      where: { OR: [{ doctorId: userId }, { patientId: userId }] },
    });
  }

  public async countAll(): Promise<number> {
    return await this.db.doctorNote.count();
  }

  public async create(doctorId: string, data: CreateDoctorNoteRequestDto): Promise<DoctorNote> {
    return await this.db.doctorNote.create({ data: { ...data, doctorId } });
  }

  public async update(
    id: string,
    doctorId: string,
    data: UpdateDoctorNoteRequestDto,
  ): Promise<DoctorNote> {
    return await this.db.doctorNote.update({ where: { id }, data: { note: data.note } });
  }

  public async delete(id: string, doctorId: string): Promise<void> {
    await this.db.doctorNote.delete({ where: { id } });
  }
}

export const doctorNoteRepository = new DoctorNotePrismaRepository(prisma);
