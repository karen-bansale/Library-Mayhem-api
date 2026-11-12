const questionSetRepository = require('../repositories/question-set.repository');
const sessionRepository = require('../repositories/session.repository');
const { notFound, forbidden, conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

const SESSION_CODE_CONSTRAINT = 'game_sessions_session_code_key';

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function create(questionSetId, user) {
  const questionSet = await questionSetRepository.findById(questionSetId);

  if (!questionSet) {
    throw notFound(
      'QUESTION_SET_NOT_FOUND',
      `No question set has the id ${questionSetId}.`
    );
  }

  const mayUse =
    questionSet.host_id === user.user_id ||
    user.role === 'ADMIN';

  if (!mayUse) {
    throw forbidden('This question set belongs to another host.');
  }


  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await sessionRepository.create({
        set_id: questionSet.set_id,
        host_id: user.user_id,
        session_code: randomCode(),
      });
    } catch (error) {
      if (constraintOf(error) !== SESSION_CODE_CONSTRAINT) {
        throw error;
      }
    }
  }

  throw new Error('Could not find a free session code after 5 attempts.');
}

async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);

  if (!session) {
    throw notFound('SESSION_NOT_FOUND', 'Session not found.');
  }

  return session;
}

  async function changeStatus(code, status, user) {
  const session = await findOrFail(code);

  if (session.host_id !== user.user_id && user.role !== 'ADMIN') {
    throw forbidden('Only the session host can change its status.');
  }

  if (session.status === 'CLOSED' && status === 'RUNNING') {
    throw conflict('SESSION_CLOSED', 'A closed game cannot be reopened.');
  }

  session.status = status;
  await session.save();

  return session;
}
module.exports = { create, findOrFail, changeStatus };
