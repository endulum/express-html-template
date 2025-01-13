import { type Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { client } from '../client';

export async function find({
  username,
  id,
}: {
  username?: string;
  id?: number;
}) {
  const OR: Prisma.UserWhereInput[] = [];
  if (id && !Object.is(id, NaN)) OR.push({ id });
  if (username) OR.push({ username });
  return client.user.findFirst({
    where: { OR },
  });
}

export async function comparePassword({
  userData,
  password,
}: {
  userData: string | { password: string | null };
  password: string;
}) {
  let user: { password: string | null } | null = null;
  if (typeof userData === 'string') {
    user = await client.user.findUnique({
      where: { username: userData },
    });
    if (!user) return false;
  } else user = userData;
  if (!user.password) return false;
  const match = await bcrypt.compare(password, user.password);
  return match;
}

export async function create({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) throw new Error(err.message);
    await client.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
  });
}

export async function update({
  userData,
  body,
}: {
  userData: { username?: string; id?: number };
  body: { username?: string; password?: string; bio?: string };
}) {
  const data: Record<string, string | null> = {
    username: body.username ?? null,
  };
  if (body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    data.password = hashedPassword;
  }
  await client.user.update({
    where: userData.username
      ? { username: userData.username }
      : { id: userData.id },
    data,
  });
}
