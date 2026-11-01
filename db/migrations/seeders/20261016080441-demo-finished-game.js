'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    
    const [[host]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0001'");
    const [[player1]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0002'");
    const [[player2]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0003'");
    const [[player3]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0004'");
    const [[player4]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0005'");

    
    await queryInterface.bulkInsert('question_sets', [{
      host_id: host.user_id,
      title: 'Library Orientation Basics',
      description: 'Basic library rules test',
      created_at: new Date()
    }]);

    const [[set]] = await db.query(
      "SELECT set_id FROM question_sets WHERE title = 'Library Orientation Basics'"
    );

    
    await queryInterface.bulkInsert('questions', [{
      set_id: set.set_id,
      question_text: 'Where are reference books located?',
      time_limit_seconds: 30,
      created_at: new Date()
    }]);

    const [[question]] = await db.query(
      `SELECT question_id FROM questions WHERE set_id = ${set.set_id} LIMIT 1`
    );

    
    await queryInterface.bulkInsert('choices', [
      { question_id: question.question_id, choice_label: 'A', choice_text: '2nd Floor' },
      { question_id: question.question_id, choice_label: 'B', choice_text: 'Basement' }
    ]);

    const [[choice]] = await db.query(
      `SELECT choice_id FROM choices WHERE question_id = ${question.question_id} AND choice_label = 'A' LIMIT 1`
    );

    await queryInterface.bulkUpdate('questions', 
      { correct_choice_id: choice.choice_id },
      { question_id: question.question_id }
    );

    
    await queryInterface.bulkInsert('game_sessions', [{
      set_id: set.set_id, 
      host_id: host.user_id, 
      session_code: '418263', 
      status: 'CLOSED',
      shift_timer_seconds: 600,
      chaos_meter: 0,
      started_at: new Date('2026-10-09T01:00:00Z'), 
      ended_at: new Date('2026-10-09T01:12:00Z'),
      created_at: new Date()
    }]);

    const [[session]] = await db.query(
      "SELECT session_id FROM game_sessions WHERE session_code = '418263'"
    );

    
    await queryInterface.bulkInsert('players', [
      {
        session_id: session.session_id,
        user_id: player1.user_id,
        nickname: 'JordanP1',
        score: 100,
        joined_at: new Date(),
        finished_at: new Date()
      },
      {
        session_id: session.session_id,
        user_id: player2.user_id,
        nickname: 'TaylorP2',
        score: 90,
        joined_at: new Date(),
        finished_at: new Date()
      },
      {
        session_id: session.session_id,
        user_id: player3.user_id,
        nickname: 'MorganP3',
        score: 80,
        joined_at: new Date(),
        finished_at: new Date()
      },
      {
        session_id: session.session_id,
        user_id: player4.user_id,
        nickname: 'CaseyP4',
        score: 0,
        joined_at: new Date(),
        finished_at: null 
      }
    ]);

    const [[playerRow]] = await db.query(
      `SELECT player_id FROM players WHERE session_id = ${session.session_id} AND finished_at IS NOT NULL LIMIT 1`
    );

    
    await queryInterface.bulkInsert('answers', [{
      player_id: playerRow.player_id,
      question_id: question.question_id,
      submitted_choice_id: choice.choice_id,
      is_correct: true,
      response_time_sec: 4.5,
      stars_earned: 3,
      answered_at: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('answers', null, {});
    await queryInterface.bulkDelete('players', null, {});
    await queryInterface.bulkDelete('game_sessions', { session_code: '418263' }, {});
    await queryInterface.bulkDelete('choices', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('question_sets', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};