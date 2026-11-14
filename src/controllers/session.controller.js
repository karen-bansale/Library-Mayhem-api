const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

function toJson(session) {
  return {
    code: session.session_code,
    status: session.status,
    host_id: session.host_id,
    set_id: session.set_id,
    created_at: session.created_at,
    started_at: session.started_at,
    ended_at: session.ended_at,
  };
}

async function create(req, res) {
  const { set_id } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.create(set_id, req.user);

  res.status(201).json(toJson(session));
}

async function get(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const session = await sessionService.findOrFail(code);

  res.status(200).json(toJson(session));
}

async function changeStatus(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { status } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.changeStatus(code, status, req.user);

  res.status(200).json(toJson(session));
}

module.exports = {
  create,
  get,
  changeStatus,
};