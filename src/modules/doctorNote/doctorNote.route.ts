import { Router } from 'express';
import { validateBody, validateParams, validateQuery } from '../../shared/libs/validator.lib.js';
import {
  createDoctorNoteRequestDto,
  paginationQueryDto,
  updateDoctorNoteRequestDto,
} from './doctorNote.dto.js';
import { doctorNoteController } from './doctorNote.controller.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';
import { idParamsSchema } from '../../shared/schemas/params.schema.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';
import { authorizeRoles } from '../../shared/middlewares/role.middleware.js';

const doctorNoteRoute = Router();

doctorNoteRoute.use(authenticate);

doctorNoteRoute.get(
  ROUTES.DOCTOR_NOTE.LIST.express,
  validateQuery(paginationQueryDto),
  doctorNoteController.getAll,
);

doctorNoteRoute.get(
  ROUTES.DOCTOR_NOTE.GET_BY_ID.express,
  validateParams(idParamsSchema),
  doctorNoteController.getById,
);

doctorNoteRoute.post(
  ROUTES.DOCTOR_NOTE.CREATE.express,
  validateBody(createDoctorNoteRequestDto),
  authorizeRoles('DOCTOR'),
  doctorNoteController.create,
);

doctorNoteRoute.patch(
  ROUTES.DOCTOR_NOTE.UPDATE.express,
  validateParams(idParamsSchema),
  validateBody(updateDoctorNoteRequestDto),
  authorizeRoles('DOCTOR'),
  doctorNoteController.update,
);

doctorNoteRoute.delete(
  ROUTES.DOCTOR_NOTE.DELETE.express,
  validateParams(idParamsSchema),
  authorizeRoles('DOCTOR'),
  doctorNoteController.delete,
);

export { doctorNoteRoute };
