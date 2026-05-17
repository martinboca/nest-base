import { ClassCtor, toDTO } from '../utils/dto.utils';
import { BaseSchema } from './base.schema';

export class BaseEntity extends BaseSchema.class {
  toDTO<Dto extends object>(dtoClass: ClassCtor<Dto>): Dto {
    return toDTO(this, dtoClass);
  }
}

BaseSchema.setClass(BaseEntity);
