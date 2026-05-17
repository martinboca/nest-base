import { BaseEntity as BE, defineEntity, p } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

export const BaseSchema = defineEntity({
  name: 'BaseEntity',
  extends: BE,
  abstract: true,
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => randomUUID()),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
});
