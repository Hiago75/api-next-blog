import { EntityRepository, Repository } from 'typeorm';
import { ProfilePhotos } from '../entities/ProfilePhotos';

@EntityRepository(ProfilePhotos)
export class ProfilePhotosRepositories extends Repository<ProfilePhotos> {}
