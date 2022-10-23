import prisma from '@/databases/postgreClient';

export default class GameService {
  public async getGameDetail(gameID) {
    const game = await prisma.game.findUnique({
      where: {
        appId: Number(gameID),
      },
    });

    return game;
  }
}
