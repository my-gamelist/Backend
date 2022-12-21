import prisma from '@/databases/postgreClient';

export default class GameService {
  public async getTotalGames() {
    const totalGames = await prisma.game.count(
      {
        where: {
          steamReviews: {
            gt: 1000,
          },
        },
      },
    );

    return totalGames;
  }

  public async getGameDetail(gameID) {
    const game = await prisma.game.findUnique({
      where: {
        appId: Number(gameID),
      },
    });

    return game;
  }

  public async getGamesBySteamRating(page: any) {
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
      skip: 20 * (page - 1),
    });

    return games;
  }
}

