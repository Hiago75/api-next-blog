import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Formats } from './Formats';

@Entity('large')
export class Large {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @OneToOne((type) => Formats, (format) => format.large)
  formats: Formats;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
