import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Covers } from './Covers';
import { Large } from './Large';
import { Medium } from './Medium';
import { Small } from './Small';
import { Thumbnail } from './Thumbnail';

@Entity('formats')
export class Formats {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne((type) => Covers, (cover) => cover.format)
  cover: Covers;

  @OneToOne((type) => Large, (large) => large.formats)
  @JoinColumn()
  large: Large;

  @OneToOne((type) => Medium, (medium) => medium.formats)
  @JoinColumn()
  medium: Medium;

  @OneToOne((type) => Small, (small) => small.formats)
  @JoinColumn()
  small: Small;

  @OneToOne((type) => Thumbnail, (thumbnail) => thumbnail.formats)
  @JoinColumn()
  thumbnail: Thumbnail;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
