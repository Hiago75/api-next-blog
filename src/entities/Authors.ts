import { classToPlain, Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';
import { RefreshToken } from './RefreshToken';

@Entity('authors')
export class Authors {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany((type) => Posts, (author) => Authors, {
    onDelete: 'CASCADE',
  })
  posts: Posts[];

  @OneToOne((type) => RefreshToken, (user_id) => Authors, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'refresh_token' })
  refreshToken: RefreshToken;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
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
