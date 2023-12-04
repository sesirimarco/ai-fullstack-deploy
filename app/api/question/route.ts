import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';
import { qa } from '@/utils/ai';

export const POST = async (request) => {
  console.log('POST >>>>>>>>>');
  const { question } = await request.json();
  const user = getUserByClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  console.log('entries >>> ', entries);
  const answer = await qa(question, entries);
  return NextResponse.json({ data: answer });
};

export const GET = async () => {
  console.log('GET>>>>');
};
