import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data in correct order (respecting foreign keys)
  console.log('🗑️  Clearing existing data...');
  await prisma.userAchievement.deleteMany();
  await prisma.dailyChallengeScore.deleteMany();
  await prisma.puzzleProgress.deleteMany();
  await prisma.gamePlayer.deleteMany();
  await prisma.gameInvite.deleteMany();
  await prisma.userStats.deleteMany();
  await prisma.game.deleteMany();
  await prisma.dailyChallenge.deleteMany();
  await prisma.puzzleLevel.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.leaderboard.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  console.log('👥 Creating test users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'alice',
      email: 'alice@example.com',
      passwordHash: hashedPassword,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      title: 'Quantum Explorer',
      stats: {
        create: {
          totalGames: 15,
          wins: 8,
          losses: 6,
          draws: 1,
          totalScore: 450,
          validVertices: 45,
          invalidVertices: 3,
          loopsCompleted: 5,
          rareVertices: 2,
          favoriteGameMode: 'competitive'
        }
      }
    }
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'bob',
      email: 'bob@example.com',
      passwordHash: hashedPassword,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      title: 'Particle Physicist',
      stats: {
        create: {
          totalGames: 12,
          wins: 5,
          losses: 7,
          draws: 0,
          totalScore: 320,
          validVertices: 38,
          invalidVertices: 5,
          loopsCompleted: 3,
          rareVertices: 1,
          favoriteGameMode: 'timed'
        }
      }
    }
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'charlie',
      email: 'charlie@example.com',
      passwordHash: hashedPassword,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
      title: 'Higgs Hunter',
      stats: {
        create: {
          totalGames: 20,
          wins: 12,
          losses: 7,
          draws: 1,
          totalScore: 580,
          validVertices: 60,
          invalidVertices: 2,
          loopsCompleted: 8,
          rareVertices: 4,
          favoriteGameMode: 'competitive'
        }
      }
    }
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'diana',
      email: 'diana@example.com',
      passwordHash: hashedPassword,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana',
      title: 'Rookie',
      stats: {
        create: {
          totalGames: 8,
          wins: 3,
          losses: 5,
          draws: 0,
          totalScore: 210,
          validVertices: 25,
          invalidVertices: 8,
          loopsCompleted: 1,
          rareVertices: 0,
          favoriteGameMode: 'puzzle'
        }
      }
    }
  });

  console.log('✅ Created 4 test users');

  // Create achievements
  console.log('🏅 Creating achievements...');
  const achievement1 = await prisma.achievement.create({
    data: {
      type: 'first_game',
      name: 'First Steps',
      description: 'Complete your first game',
      iconUrl: '🎮',
      points: 10,
      requirement: 1
    }
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      type: 'rare_vertex',
      name: 'Rare Find',
      description: 'Place a 6-point vertex',
      iconUrl: '💎',
      points: 25,
      requirement: 1
    }
  });

  const achievement3 = await prisma.achievement.create({
    data: {
      type: 'loop_master',
      name: 'Loop Master',
      description: 'Create 5 valid loops',
      iconUrl: '🔄',
      points: 50,
      requirement: 5
    }
  });

  const achievement4 = await prisma.achievement.create({
    data: {
      type: 'perfectionist',
      name: 'Perfectionist',
      description: 'Win with 0 invalid vertices',
      iconUrl: '⭐',
      points: 100,
      requirement: 1
    }
  });

  console.log('✅ Created 4 achievements');

  // Create user achievements
  console.log('🎖️  Assigning achievements...');
  await prisma.userAchievement.create({
    data: {
      userId: user1.id,
      achievementId: achievement1.id,
      progress: 1,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
  });

  await prisma.userAchievement.create({
    data: {
      userId: user1.id,
      achievementId: achievement2.id,
      progress: 1,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    }
  });

  await prisma.userAchievement.create({
    data: {
      userId: user3.id,
      achievementId: achievement1.id,
      progress: 1,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
    }
  });

  await prisma.userAchievement.create({
    data: {
      userId: user3.id,
      achievementId: achievement3.id,
      progress: 5,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    }
  });

  console.log('✅ Assigned achievements to users');

  // Create a sample completed game
  console.log('🎮 Creating sample game...');
  const game = await prisma.game.create({
    data: {
      mode: 'competitive',
      status: 'finished',
      winnerId: user1.id,
      settings: {
        invalidVertexPenalty: -1,
        undoAllowed: false,
        turnTimer: null,
        loopBonus: 2
      },
      boardState: {
        placedCards: [],
        currentPlayerIndex: 0
      },
      gameHistory: [
        { turn: 1, playerId: user1.id, action: 'place_card' },
        { turn: 2, playerId: user2.id, action: 'place_card' }
      ],
      completedAt: new Date()
    }
  });

  await prisma.gamePlayer.create({
    data: {
      gameId: game.id,
      userId: user1.id,
      turnOrder: 0,
      finalScore: 34,
      isWinner: true
    }
  });

  await prisma.gamePlayer.create({
    data: {
      gameId: game.id,
      userId: user2.id,
      turnOrder: 1,
      finalScore: 28,
      isWinner: false
    }
  });

  console.log('✅ Created sample game');

  // Create leaderboards
  console.log('🏆 Creating leaderboards...');
  await prisma.leaderboard.create({
    data: {
      type: 'global',
      period: 'all-time',
      entries: [
        { userId: user3.id, username: 'charlie', score: 580, rank: 1 },
        { userId: user1.id, username: 'alice', score: 450, rank: 2 },
        { userId: user2.id, username: 'bob', score: 320, rank: 3 },
        { userId: user4.id, username: 'diana', score: 210, rank: 4 }
      ]
    }
  });

  await prisma.leaderboard.create({
    data: {
      type: 'global',
      period: 'daily',
      entries: [
        { userId: user3.id, username: 'charlie', score: 38, rank: 1 },
        { userId: user1.id, username: 'alice', score: 34, rank: 2 },
        { userId: user2.id, username: 'bob', score: 28, rank: 3 }
      ]
    }
  });

  console.log('✅ Created leaderboards');

  // Create daily challenge
  console.log('📅 Creating daily challenge...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiresAt = new Date(today);
  expiresAt.setHours(23, 59, 59, 999);

  const challenge = await prisma.dailyChallenge.create({
    data: {
      date: today.toISOString().split('T')[0],
      seed: Math.floor(Math.random() * 1000000),
      startingCards: [
        { id: '1', type: 'electron', shape: 'hexagon' },
        { id: '2', type: 'photon', shape: 'diamond' },
        { id: '3', type: 'quark', shape: 'hexagon' }
      ],
      description: 'Build the highest scoring diagram with these starting cards',
      expiresAt: expiresAt
    }
  });

  await prisma.dailyChallengeScore.create({
    data: {
      userId: user3.id,
      challengeId: challenge.id,
      score: 38
    }
  });

  await prisma.dailyChallengeScore.create({
    data: {
      userId: user1.id,
      challengeId: challenge.id,
      score: 34
    }
  });

  console.log('✅ Created daily challenge');

  // Create puzzle levels
  console.log('🧩 Creating puzzle levels...');
  const puzzleLevel1 = await prisma.puzzleLevel.create({
    data: {
      name: 'First Steps',
      description: 'Place your first valid vertex',
      difficulty: 'tutorial',
      requiredCards: [
        { type: 'electron' },
        { type: 'electron' },
        { type: 'photon' }
      ],
      goalDescription: 'Create a valid electron-photon vertex',
      targetScore: 2,
      starThresholds: [2, 2, 2],
      physicsExplanation: 'Electrons can interact with photons through the electromagnetic force.',
      hints: ['Connect two electrons with one photon', 'Make sure arrows flow correctly']
    }
  });

  const puzzleLevel2 = await prisma.puzzleLevel.create({
    data: {
      name: 'Quark Interactions',
      description: 'Learn about quarks and gluons',
      difficulty: 'tutorial',
      requiredCards: [
        { type: 'quark' },
        { type: 'quark' },
        { type: 'gluon' }
      ],
      goalDescription: 'Create a valid quark-gluon vertex',
      targetScore: 2,
      starThresholds: [2, 2, 2],
      physicsExplanation: 'Quarks are held together by gluons via the strong nuclear force.',
      hints: ['Gluons carry the strong force', 'Connect quarks with gluons']
    }
  });

  await prisma.puzzleProgress.create({
    data: {
      userId: user1.id,
      levelId: puzzleLevel1.id,
      completed: true,
      stars: 3,
      bestScore: 2,
      attempts: 1,
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    }
  });

  console.log('✅ Created puzzle levels');

  console.log('\n✨ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • Users: 4`);
  console.log(`   • Achievements: 4`);
  console.log(`   • User Achievements: 4`);
  console.log(`   • Games: 1`);
  console.log(`   • Leaderboards: 2`);
  console.log(`   • Daily Challenges: 1`);
  console.log(`   • Puzzle Levels: 2`);
  console.log('\n🔑 Login credentials:');
  console.log('   Username: alice, bob, charlie, or diana');
  console.log('   Password: password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });