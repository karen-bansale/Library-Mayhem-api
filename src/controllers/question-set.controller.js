const questionSetService = require('../services/question-set.service');

async function list(req, res) {
  const questionSets = await questionSetService.getAllQuestionSets();
  res.status(200).json(questionSets);
}

async function get(req, res) {
  const { id } = req.params;
  const questionSet = await questionSetService.getQuestionSetById(id);
  res.status(200).json(questionSet);
}

async function create(req, res) {
  const questionSet = await questionSetService.createQuestionSet(req.body);
  res.status(201).json(questionSet);
}

async function update(req, res) {
  const { id } = req.params;
  const updated = await questionSetService.updateQuestionSet(id, req.body);
  res.status(200).json(updated);
}

async function remove(req, res) {
  const { id } = req.params;
  await questionSetService.deleteQuestionSet(id);
  res.status(204).send();
}

module.exports = { list, get, create, update, remove };