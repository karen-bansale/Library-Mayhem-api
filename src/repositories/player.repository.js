const { Player } = require('../models');

function findSeat(sessionId, userId) {
  return Player.findOne({
    where: {
      session_id: sessionId,
      user_id: userId,
    },
  });
}

function countBySession(sessionId) {
  return Player.count({
    where: { session_id: sessionId },
  });
}

function create(data) {
  return Player.create(data);
}

function listBySession(sessionId) {

  return Player.findAll({
    attributes: ['nickname', 'score'],
    where: { session_id: sessionId },
    order: [['joined_at', 'ASC']],
  });
}

module.exports = {
  findSeat,
  countBySession,
  create,
  listBySession,
};
