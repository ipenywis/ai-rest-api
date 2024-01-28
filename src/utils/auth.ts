import * as bcrypt from 'bcrypt';

export async function hashString(key: string): Promise<string> {
  const randomSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(key, randomSalt);
}
