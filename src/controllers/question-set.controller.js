const questionSetService = require('../services/question-set.service');

class QuestionSetController {
  async getAll(req, res, next) {
    try {
      const sets = await questionSetService.getAllQuestionSets();
      return res.status(200).json({ status: 'success', data: sets });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const set = await questionSetService.getQuestionSetById(id);
      return res.status(200).json({ status: 'success', data: set });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user ? req.user.user_id : req.body.host_id;
      const set = await questionSetService.createQuestionSet(userId, req.body);
      return res.status(201).json({ status: 'success', data: set });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user ? req.user.user_id : req.body.host_id;
      const updated = await questionSetService.updateQuestionSet(id, userId, req.body);
      return res.status(200).json({ status: 'success', data: updated });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user ? req.user.user_id : req.body.host_id;
      await questionSetService.deleteQuestionSet(id, userId);
      return res.status(200).json({ status: 'success', message: 'Question set deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionSetController();