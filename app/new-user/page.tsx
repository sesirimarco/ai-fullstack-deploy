import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();

  const userExist = await prisma.user.findUnique({
    where: { clerkId: user?.id },
  });

  if (!userExist) {

    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  
  }

  redirect('/journal');
};

const NewUser = async () => {

  await createNewUser();
  return <div>Loading...</div>;
};

export default NewUser;
