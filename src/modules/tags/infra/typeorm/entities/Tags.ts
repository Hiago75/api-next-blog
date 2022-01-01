import { ITag } from '@modules/tags/domain/model/ITag';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from '../../../../../entities/Posts';

@Entity('tags')
export class Tags implements ITag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @ManyToMany((type) => Posts, (post) => post.tags)
  posts: Posts[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
