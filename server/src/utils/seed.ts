import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.achievement.deleteMany();
  await prisma.gamePlayer.deleteMany();
  await prisma.game.deleteMany();
  await prisma.dailyChallenge.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  console.log('👥 Creating test users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'alice',
      email: 'alice@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      rating: 1200,
      gamesPlayed: 15,
      gamesWon: 8,
      totalScore: 450
    }
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'bob',
      email: 'bob@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      rating: 1150,
      gamesPlayed: 12,
      gamesWon: 5,
      totalScore: 320
    }
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'charlie',
      email: 'charlie@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
      rating: 1300,
      gamesPlayed: 20,
      gamesWon: 12,
      totalScore: 580
    }
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'diana',
      email: 'diana@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana',
      rating: 1050,
      gamesPlayed: 8,
      gamesWon: 3,
      totalScore: 210
    }
  });

  console.log('✅ Created 4 test users');

  // Create leaderboard entries
  console.log('🏆 Creating leaderboard entries...');
  await prisma.leaderboardEntry.createMany({
    data: [
      { userId: user3.id, score: 580, rank: 1, period: 'all_time' },
      { userId: user1.id, score: 450, rank: 2, period: 'all_time' },
      { userId: user2.id, score: 320, rank: 3, period: 'all_time' },
      { userId: user4.id, score: 210, rank: 4, period: 'all_time' },
      { userId: user3.id, score: 38, rank: 1, period: 'daily' },
      { userId: user1.id, score: 34, rank: 2, period: 'daily' },
      { userId: user2.id, score: 28, rank: 3, period: 'daily' }
    ]
  });

  console.log('✅ Created leaderboard entries');

  // Create a sample completed game
  console.log('🎮 Creating sample game...');
  const game = await prisma.game.create({
    data: {
      mode: 'competitive',
      status: 'finished',
      currentTurn: 0,
      settings: {
        invalidVertexPenalty: -1,
        undoAllowed: false,
        turnTimer: null,
        loopBonus: 2
      },
      gameState: {
        placedCards: [],
        deck: [],
        currentPlayerIndex: 0
      },
      startedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      finishedAt: new Date()
    }
  });

  await prisma.gamePlayer.createMany({
    data: [
      {
        gameId: game.id,
        userId: user1.id,
        playerIndex: 0,
        score: 34,
        hand: [],
        secretCard: null,
        isWinner: true
      },
      {
        gameId: game.id,
        userId: user2.id,
        playerIndex: 1,
        score: 28,
        hand: [],
        secretCard: null,
        isWinner: false
      }
    ]
  });

  console.log('✅ Created sample game');

  // Create achievements
  console.log('🏅 Creating achievements...');
  await prisma.achievement.createMany({
    data: [
      {
        userId: user1.id,
        type: 'first_game',
        title: 'First Steps',
        description: 'Complete your first game',
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 7 days ago
      },
      {
        userId: user1.id,
        type: 'rare_vertex',
        title: 'Rare Find',
        description: 'Place a 6-point vertex',
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
      },
      {
        userId: user3.id,
        type: 'first_game',
        title: 'First Steps',
        description: 'Complete your first game',
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) // 14 days ago
      },
      {
        userId: user3.id,
        type: 'loop_master',
        title: 'Loop Master',
        description: 'Create 5 valid loops',
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      }
    ]
  });

  console.log('✅ Created achievements');

  // Create daily challenge
  console.log('📅 Creating daily challenge...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyChallenge.create({
    data: {
      date: today,
      startingCards: ['card1', 'card2', 'card3'], // Placeholder
      challengeRules: {
        description: 'Build the highest scoring diagram with these starting cards'
      },
      active: true
    }
  });

  console.log('✅ Created daily challenge');

  console.log('\n✨ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • Users: 4`);
  console.log(`   • Leaderboard entries: 7`);
  console.log(`   • Games: 1`);
  console.log(`   • Achievements: 4`);
  console.log(`   • Daily challenges: 1`);
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