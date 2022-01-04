import { classToPlain, Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from '@modules/authors/infra/typeorm/entities/Authors';
import { Categories } from './Categories';
import { Covers } from './Covers';
import { Tags } from '@modules/tags/infra/typeorm/entities/Tags';

@Entity('posts')
export class Posts {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column({ name: 'external_photo_url', nullable: true })
  externalPhotoUrl: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'categoryId' })
  categoryId: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'coverId', nullable: true })
  coverId: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'author_id' })
  authorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne((type) => Covers, (cover) => cover.posts, { nullable: true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  @JoinColumn({ name: 'coverId' })
  cover: Covers;

  @ManyToOne((type) => Categories, (category) => category.posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  @ManyToMany(() => Tags, (tag) => tag.posts)
  @JoinTable()
  tags: Tags[];

  @ManyToOne((type) => Authors, (posts) => Posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Authors;

  toJSON() {
    return classToPlain(this);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
