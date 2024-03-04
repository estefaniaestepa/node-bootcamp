const Bike = require('../models/bike.model');
const HTTPSTATUSCODE = ('../../utils/httpStatusCode');

const createBike = async (res, res, next) => {
  const bike = new Bike(req.body);
  try {
    await bike.save();
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      bike: bike
    });
  } catch (error) {
    next(error);
  }
}