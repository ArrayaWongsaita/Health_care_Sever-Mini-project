import bcrypt from 'bcrypt';

export interface HashServiceInterface {
  hash: (data: string) => Promise<string>;
  compare: (data: string, hashedData: string) => Promise<boolean>;
}

class HashService implements HashServiceInterface {
  private readonly saltRounds = 10;

  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }
}

export const hashService = new HashService();
