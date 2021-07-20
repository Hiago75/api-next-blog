import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
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

  @ManyToOne((type) => Categories, (posts) => Posts, { onDelete: 'CASCADE' })
  category: Categories;

  @ManyToOne((type) => Authors, (posts) => Posts)
  author: Authors;

  @ManyToOne((type) => Covers, (posts) => posts, { nullable: true, onDelete: 'SET NULL' })
  cover: Covers;

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
