import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  toJSON() {
    const copy = { ...this };
    delete copy.isDeleted;
    delete copy.deletedAt;
    return copy;
  }
}
