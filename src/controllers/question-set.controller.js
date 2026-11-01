const { matchedData } = require('express-validator');
const questionSetService = require('../services/question-set.service');


function toJson(qs) {
  return {
    id: qs.set_id,
    title: qs.title,
    subject: qs.subject,
    is_public: qs.is_public,
    host_id: qs.host_id,
    created_at: qs.created_at,
  };
}

async function list(req, res) {
  const sets = await questionSetService.list();
  res.status(200).json(sets.map(toJson));
}

async function get(req, res) {
  const { id } = matchedData(req);
  const qs = await questionSetService.get(id);
  res.status(200).json(toJson(qs));
}

async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });
  const qs = await questionSetService.create(data, req.user);
  res.status(201).json(toJson(qs));
}

async function update(req, res) {
  const data = matchedData(req);
  const qs = await questionSetService.update(data.id, data, req.user);
  res.status(200).json(toJson(qs));
}

async function remove(req, res) {
  const { id } = matchedData(req);
  await questionSetService.remove(id, req.user);
  res.status(204).end();
}

module.exports = { list, get, create, update, remove };