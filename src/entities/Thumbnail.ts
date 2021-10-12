import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Formats } from './Formats';

@Entity('thumbnail')
export class Thumbnail {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @OneToOne((type) => Formats, (formats) => formats.thumbnail)
  formats: Formats;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
