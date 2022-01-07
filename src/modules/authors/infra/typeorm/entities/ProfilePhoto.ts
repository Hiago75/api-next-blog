import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from '@modules/authors/infra/typeorm/entities/Authors';
import { IProfilePhoto } from '@modules/authors/domain/model/ProfilePhotos/IProfilePhoto';
import { IAuthor } from '@modules/authors/domain/model/IAuthor';

@Entity('profile_photos')
export class ProfilePhoto implements IProfilePhoto {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  url: string;

  @OneToOne((type) => Authors, (profile_photo) => ProfilePhoto, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: IAuthor;

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
