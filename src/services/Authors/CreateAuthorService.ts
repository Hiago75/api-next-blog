import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IAuthorRequestDTO } from '../../DTOs/IAuthorRequestDTO';
import { ProfilePhotosRepositories } from '../../repositories';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';
import { encrypt } from '../../utils/encrypt';

export class CreateAuthorService {
  async execute({ name, email, password, admin, profilePhotoId }: IAuthorRequestDTO) {
    // TODO: Refactor the profilePhoto system during creation
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);

    const authorAlreadyExists = await authorsRepositories.findOne({ email: email });
    if (authorAlreadyExists) throw new BadRequest('user_creation_email_in_use');

    const profilePhoto = await profilePhotosRepositories.findOne(profilePhotoId);

    const profilePhotoUrl = profilePhoto ? profilePhoto.url : undefined;

    const passwordHash = await encrypt(password);

    const author = authorsRepositories.create({
      name,
      email,
      password: passwordHash,
      admin,
      profilePhoto,
      profilePhotoUrl,
    });
    await authorsRepositories.save(author);

    return author;
  }
}
