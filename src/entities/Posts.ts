import { classToPlain, Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from './Authors';
import { Categories } from './Categories';
import { Covers } from './Covers';

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

  @ManyToOne((type) => Categories, (posts) => Posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'categoryId' })
  categoryId: string;

  @ManyToOne((type) => Covers, (posts) => Posts, { nullable: true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  @JoinColumn({ name: 'coverId' })
  cover: Covers;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'coverId' })
  coverId: string;

  @ManyToOne((type) => Authors, (posts) => Posts, { onDelete: 'CASCADE' })
  author: Authors;

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
