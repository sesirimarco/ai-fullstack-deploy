import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id: params.id,
    },
    data: {
      content,
    },
  });

  const newAnalysis = await analyze(updatedEntry.content);
  await prisma.analysis.update({
    where: {
      userId: user?.id,
      entryId: updatedEntry.id,
    },
    data: {
      ...newAnalysis,
    },
  });
  return NextResponse.json({
    data: { ...updatedEntry, analysis: newAnalysis },
  });
};

export const DELETE = async (request: Request, { params }) => {
  try {
    const response = await prisma.journalEntry.delete({
      where: {
        id: params.id,
      },
    });
    console.log({ response });
    revalidatePath('/journal');
    return NextResponse.json({ message: 'Delete successful' });
  } catch (e) {
    console.log('eeeeee: ', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
      },
    );
  }
};
