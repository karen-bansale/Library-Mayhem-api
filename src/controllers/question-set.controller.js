const questionSetService = require('../services/question-set.service');
const { User, QuestionSet } = require('../models');

async function list(req, res, next) {
  try {
    const questionSets = await questionSetService.getAllQuestionSets();
    res.status(200).json(questionSets);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const { id } = req.params;
    const questionSet = await questionSetService.getQuestionSetById(id);
    res.status(200).json(questionSet);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    // 1. Kunin ang demo user mula sa header (halimbawa: 'ben_castro' o 'host1')
    const demoUsername = req.headers['x-demo-user'];

    if (!demoUsername) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'X-Demo-User header is required' }
      });
    }

    // 2. Hanapin ang user sa database para makuha ang kanyang user_id
    const user = await User.findOne({ where: { username: demoUsername } });

    if (!user) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Demo user '${demoUsername}' not found` }
      });
    }

    // 3. Isama ang host_id sa data na ipapasa sa service
    const questionSetData = {
      ...req.body,
      host_id: user.user_id // Pinag-uugnay ang user at question set
    };

    const questionSet = await questionSetService.createQuestionSet(questionSetData);
    res.status(201).json(questionSet);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await questionSetService.updateQuestionSet(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await questionSetService.deleteQuestionSet(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { list, get, create, update, remove };