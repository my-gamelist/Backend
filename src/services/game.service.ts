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

  public async getGamesBySteamRating() {
    const games = await prisma.game.findMany({
      orderBy: {
        steamRating: 'desc',
      },
      where: {
        steamReviews: {
          gt: 1000,
        },
      },
      take: 20,
    });

    return games;
  }
}

