import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  // Clear existing data
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.gamePlayer.deleteMany();
  await prisma.dailyChallengeScore.deleteMany();
  await prisma.dailyChallenge.deleteMany();
  await prisma.puzzleProgress.deleteMany();
  await prisma.puzzleLevel.deleteMany();
  await prisma.gameInvite.deleteMany();
  await prisma.leaderboard.deleteMany();
  await prisma.userStats.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      passwordHash: 'hashedpassword1',
      stats: {
        create: {}, // Create related UserStats
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      passwordHash: 'hashedpassword2',
      stats: {
        create: {}, // Create related UserStats
      },
    },
  });

  // Create games
  const game1 = await prisma.game.create({
    data: {
      name: 'Game 1',
      players: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
        ],
      },
    },
  });

  // Create achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      title: 'First Achievement',
      description: 'You achieved this first!',
    },
  });

  // Create user achievements
  await prisma.userAchievement.create({
    data: {
      userId: user1.id,
      achievementId: achievement1.id,
    },
  });

  // Create daily challenges
  const dailyChallenge1 = await prisma.dailyChallenge.create({
    data: {
      title: 'Daily Challenge 1',
      description: 'Complete this challenge!',
      scores: {
        create: [{ userId: user1.id, score: 100 }],
      },
    },
  });

  // Create puzzle levels
  const puzzleLevel1 = await prisma.puzzleLevel.create({
    data: {
      level: 1,
      progress: {
        create: [{ userId: user1.id, completed: true }],
      },
    },
  });

  // Create game invites
  await prisma.gameInvite.create({
    data: {
      inviteeId: user2.id,
      gameId: game1.id,
    },
  });

  // Create leaderboard entries
  await prisma.leaderboard.create({
    data: {
      userId: user1.id,
      score: 200,
    },
  });

  console.log('Seeding completed!');
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });