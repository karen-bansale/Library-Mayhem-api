'use strict';

const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');

async function join(req, res) {
  const { code, nickname } = matchedData(req);
  const { session, player, created } = await playerService.join(
    code,
    nickname,
    req.user
  );

  res.status(created ? 201 : 200).json({
    player_id: player.player_id,
    nickname: player.nickname,
    score: player.score,
    rejoined: !created,
    session: {
      code: session.session_code,
      status: session.status,
    },
  });
}

async function list(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const players = await playerService.listPlayers(code);

  res.status(200).json(
    players.map((player) => ({
      nickname: player.nickname,
      score: player.score,
    }))
  );
}

module.exports = { join, list };