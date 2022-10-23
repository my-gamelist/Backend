import prisma from '@/databases/postgreClient';

export default class AccountService {
  public async getUser(accountId: string) {
    const user = await prisma.account.findUnique({
      where: {
        accountId: Number(accountId),
      },
    });
    return user;
  }
}
