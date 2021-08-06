import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from './Authors';

@Entity('profile_photos')
export class ProfilePhotos {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  url: string;

  @ManyToOne((type) => Authors, (profile_photo) => ProfilePhotos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
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
