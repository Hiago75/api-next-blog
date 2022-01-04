import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from '@modules/authors/infra/typeorm/entities/Authors';

@Entity('profile_photos')
export class ProfilePhotos {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  url: string;

  @OneToOne((type) => Authors, (profile_photo) => ProfilePhotos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: Authors;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
