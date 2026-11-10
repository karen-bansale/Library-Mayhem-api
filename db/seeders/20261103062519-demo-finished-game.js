'use strict';

const SESSION_CODE = '621001';
const QUESTION_SET_TITLE = 'Library Orientation Basics';
const PLAYER_USERS = [
  {
    school_id: '2099-0012',
    username: 'seed_player_one',
    full_name: 'Jamie Santos',
    email: 'seed.player.one@library.test',
    password_hash: 'seed-only-password-hash',
    role: 'player',
  },
  {
    school_id: '2099-0013',
    username: 'seed_player_two',
    full_name: 'Riley Cruz',
    email: 'seed.player.two@library.test',
    password_hash: 'seed-only-password-hash',
    role: 'player',
  },
  {
    school_id: '2099-0014',
    username: 'seed_player_three',
    full_name: 'Avery Reyes',
    email: 'seed.player.three@library.test',
    password_hash: 'seed-only-password-hash',
    role: 'player',
  },
];

async function findOne(db, sql, replacements) {
  const [rows] = await db.query(sql, { replacements });
  return rows[0] || null;
}

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    // Avoid adding duplicate game data if this seeder is run again.
    const existingSession = await findOne(
      db,
      'SELECT session_id FROM game_sessions WHERE session_code = :code',
      { code: SESSION_CODE }
    );
    if (existingSession) return;

    const host = await findOne(
      db,
      'SELECT user_id FROM users WHERE school_id = :schoolId',
      { schoolId: '2099-0011' }
    );
    if (!host) {
      throw new Error('Seed host 2099-0011 is missing; run the host seeder first.');
    }

    const playerIds = [];
    for (const user of PLAYER_USERS) {
      let existingUser = await findOne(
        db,
        'SELECT user_id FROM users WHERE school_id = :schoolId',
        { schoolId: user.school_id }
      );

      if (!existingUser) {
        await queryInterface.bulkInsert('users', [{
          ...user,
          created_at: new Date(),
        }]);

        existingUser = await findOne(
          db,
          'SELECT user_id FROM users WHERE school_id = :schoolId',
          { schoolId: user.school_id }
        );
      }

      playerIds.push(existingUser.user_id);
    }

    const startedAt = new Date('2026-11-09T12:00:00Z');
    const endedAt = new Date('2026-11-09T12:12:00Z');

    await queryInterface.bulkInsert('question_sets', [{
      host_id: host.user_id,
      title: QUESTION_SET_TITLE,
      subject: 'Library Orientation',
      description: 'Sample questions for a completed Library Mayhem game.',
      created_at: startedAt,
    }]);

    const questionSet = await findOne(
      db,
      'SELECT set_id FROM question_sets WHERE title = :title',
      { title: QUESTION_SET_TITLE }
    );

    await queryInterface.bulkInsert('questions', [{
      set_id: questionSet.set_id,
      question_text: 'Where are reference books located?',
      time_limit_seconds: 30,
      created_at: startedAt,
    }]);

    const question = await findOne(
      db,
      'SELECT question_id FROM questions WHERE set_id = :setId ORDER BY question_id DESC',
      { setId: questionSet.set_id }
    );

    await queryInterface.bulkInsert('choices', [
      {
        question_id: question.question_id,
        choice_label: 'A',
        choice_text: 'On the second floor',
      },
      {
        question_id: question.question_id,
        choice_label: 'B',
        choice_text: 'In the parking lot',
      },
    ]);

    const correctChoice = await findOne(
      db,
      `SELECT choice_id FROM choices
       WHERE question_id = :questionId AND choice_label = 'A'`,
      { questionId: question.question_id }
    );

    await queryInterface.bulkUpdate(
      'questions',
      { correct_choice_id: correctChoice.choice_id },
      { question_id: question.question_id }
    );

    await queryInterface.bulkInsert('game_sessions', [{
      session_code: SESSION_CODE,
      host_id: host.user_id,
      set_id: questionSet.set_id,
      status: 'CLOSED',
      shift_timer_seconds: 300,
      chaos_meter: 0,
      created_at: startedAt,
      started_at: startedAt,
      ended_at: endedAt,
    }]);

    const session = await findOne(
      db,
      'SELECT session_id FROM game_sessions WHERE session_code = :code',
      { code: SESSION_CODE }
    );

    const playerNames = ['Jamie', 'Riley', 'Avery'];
    const scores = [100, 90, 80];

    await queryInterface.bulkInsert('players', playerIds.map((userId, index) => ({
      session_id: session.session_id,
      user_id: userId,
      nickname: playerNames[index],
      score: scores[index],
      joined_at: startedAt,
      finished_at: endedAt,
    })));

    const players = await db.query(
      'SELECT player_id FROM players WHERE session_id = :sessionId ORDER BY player_id',
      { replacements: { sessionId: session.session_id } }
    );

    const playerRows = players[0];
    await queryInterface.bulkInsert('answers', playerRows.map((player) => ({
      player_id: player.player_id,
      question_id: question.question_id,
      submitted_choice_id: correctChoice.choice_id,
      is_correct: true,
      response_time_sec: 5,
      stars_earned: 3,
      answered_at: endedAt,
    })));
  },

  async down(queryInterface) {
    const db = queryInterface.sequelize;

    const session = await findOne(
      db,
      'SELECT session_id FROM game_sessions WHERE session_code = :code',
      { code: SESSION_CODE }
    );

    if (session) {
      await queryInterface.bulkDelete(
        'answers',
        {
          player_id: db.literal(
            `(SELECT player_id FROM players WHERE session_id = ${Number(session.session_id)})`
          ),
        }
      );
      await queryInterface.bulkDelete('players', { session_id: session.session_id });
      await queryInterface.bulkDelete('game_sessions', { session_code: SESSION_CODE });
    }

    const questionSet = await findOne(
      db,
      'SELECT set_id FROM question_sets WHERE title = :title',
      { title: QUESTION_SET_TITLE }
    );

    if (questionSet) {
      const questions = await db.query(
        'SELECT question_id FROM questions WHERE set_id = :setId',
        { replacements: { setId: questionSet.set_id } }
      );
      const questionIds = questions[0].map((row) => row.question_id);

      if (questionIds.length) {
        await queryInterface.bulkDelete('choices', {
          question_id: questionIds,
        });
        await queryInterface.bulkDelete('answers', {
          question_id: questionIds,
        });
      }

      await queryInterface.bulkDelete('questions', { set_id: questionSet.set_id });
      await queryInterface.bulkDelete('question_sets', { set_id: questionSet.set_id });
    }

    await queryInterface.bulkDelete('users', {
      school_id: PLAYER_USERS.map((user) => user.school_id),
    });
  },
};