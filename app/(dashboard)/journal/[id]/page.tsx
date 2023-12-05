import Editor from '@/components/Editor';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
export const dynamic = 'auto'
const getEntry = async (id) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId: user?.id,
      id,
    },
    include: {
      analysis: true,
    },
  });
  revalidatePath('/journal');
  return entry;
};
const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div>
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
