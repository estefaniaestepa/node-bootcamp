const Classic = require('../models/classics.model');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const createClassic = async (req, res, next) => {
  const classic = new Classic(req.body);
  try {
    await classic.save();
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      classic: classic
    });
  } catch (error) {
    next(error);
  }
}
module.exports = { createClassic }