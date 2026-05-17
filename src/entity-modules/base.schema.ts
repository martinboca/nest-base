import { BaseEntity as BE, defineEntity, p } from '@mikro-orm/core';

export const BaseSchema = defineEntity({
  name: 'BaseEntity',
  extends: BE,
  abstract: true,
  properties: {
    id: p.uuid().primary(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onUpdate(() => new Date()),
  },
});
