import { GenerateTokenProvider } from '../../src/provider';
import { author } from './mockAuthor';

export const mockToken = GenerateTokenProvider(author.build());
