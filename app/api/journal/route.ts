import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      content: 'White about your day!',
    },
  });
  const analysis = await analyze(entry);

  await prisma.analysis.create({
    data: {
      userId: user?.id,
      entryId: entry.id,
      ...analysis,
    },
  });
  revalidatePath('/journal');
  return NextResponse.json({ data: entry });
};
