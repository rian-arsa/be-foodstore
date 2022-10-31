const DeliveryAddress = require("./model");

async function store(req, res, next) {
  try {
    let payload = req.body;

    let user = req.user;

    let address = new DeliveryAddress({ ...payload, user: user._id });

    await address.save();
    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    let { id } = req.params;
    let { _id, ...payload } = req.body;

    const newAddress = await DeliveryAddress.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true }
    );
    return res.json(newAddress);
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    let { id } = req.params;

    const address = await DeliveryAddress.findOneAndUpdate(
      { _id: id },
      { new: true }
    );
    return res.json(address);
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function index(req, res, next) {
  try {
    let { limit = 10, skip = 0 } = req.query;

    const count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocuments();

    const deliveryAddresses = await DeliveryAddress.find({ user: req.user._id })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort("-createdAt");

    return res.json({ data: deliveryAddresses, count: count });
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

module.exports = {
  store,
  update,
  destroy,
  index,
};
