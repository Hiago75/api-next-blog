import { container } from 'tsyringe';
import { BcryptHashProvider } from './HashProvider/implementations/BcryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { CloudinaryCdnProvider } from './ImageProvider/implementations/CloudinaryCdnProvider';
import { ICdnProvider } from './ImageProvider/models/ICdnProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<ICdnProvider>('CdnProvider', CloudinaryCdnProvider);
