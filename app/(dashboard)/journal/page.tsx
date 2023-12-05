import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import { getUser } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';

export const revalidate = 1;
const getEntries = async () => {
  const user = await getUser();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id as string,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });
  revalidatePath('/journal');
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <>
      <h2 className="text-3xl m-8">Journal</h2>
      <Question />
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <EntryCard entry={entry} />
          </div>
        ))}
      </div>
    </>
  );
};

export default JournalPage;
