const sessionService = require('./session.service');
const playerRepository = require('../repositories/player.repository');
const gameInfo = require('../config/game-info');
const { conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

async function join(code, nickname, user) {
  const session = await sessionService.findOrFail(code);

  if (session.status === 'CLOSED') {
    throw conflict('SESSION_ENDED', 'This game has ended.');
  }

  if (session.status !== 'LOBBY') {
    throw conflict('SESSION_NOT_JOINABLE', 'This game has already started.');
  }

  // 1. I-check kung may existing seat na ang user, kung meron -> 409 Conflict na agad
  const existingSeat = await playerRepository.findSeat(
    session.session_id,
    user.user_id
  );

  if (existingSeat) {
    throw conflict(
      'ALREADY_JOINED',
      'You have already joined this game.'
    );
  }

  const playersInSession = await playerRepository.listBySession(session.session_id);
  const nicknameTaken = playersInSession.some(
    (p) => p.nickname === nickname && p.user_id !== user.user_id
  );

  if (nicknameTaken) {
    throw conflict(
      'NICKNAME_TAKEN',
      'That nickname is already in this game.'
    );
  }

  const seatsTaken = playersInSession.length;

  if (seatsTaken >= gameInfo.max_players) {
    throw conflict('SESSION_FULL', 'This game is full.');
  }

  try {
    const player = await playerRepository.create({
      session_id: session.session_id,
      user_id: user.user_id,
      nickname,
    });

    return { session, player, created: true };
  } catch (error) {
    const constraint = constraintOf(error);

    // 2. Kung tumama sa database unique constraint, i-translate sa 409 Conflict
    if (constraint === 'unique_session_user_seat') {
      throw conflict(
        'ALREADY_JOINED',
        'You have already joined this game.'
      );
    }

    if (constraint === 'unique_session_nickname' || constraint === 'uq_player_nickname') {
      throw conflict(
        'NICKNAME_TAKEN',
        'That nickname is already in this game.'
      );
    }

    throw error;
  }
}

async function listPlayers(code) {
  const session = await sessionService.findOrFail(code);
  return playerRepository.listBySession(session.session_id);
}

module.exports = {
  join,
  listPlayers,
};