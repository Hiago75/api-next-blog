import { classToPlain, Exclude } from 'class-transformer';
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';
import { ProfilePhotos } from './ProfilePhotos';
import { RefreshToken } from './RefreshToken';

@Entity('authors')
export class Authors {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany((type) => ProfilePhotos, (user_id) => Authors, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  profilePhoto: ProfilePhotos;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhotoUrl: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany((type) => Posts, (author) => Authors, {
    onDelete: 'CASCADE',
  })
  posts: Posts[];

  @OneToMany((type) => RefreshToken, (user_id) => Authors, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  refreshToken: RefreshToken;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
