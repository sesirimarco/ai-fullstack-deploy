import { auth, currentUser } from '@clerk/nextjs';
import { prisma } from './db';

export const getUserByClerkID = async () => {
  const { userId } = await auth();
  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId as string,
    },
  });

  return user;
};

export const getUser = async () => {
  const user = await currentUser();
  const userExist = await getUserByClerkID();

  if (!userExist) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
    return newUser;
  } else {
    return userExist;
  }
};
