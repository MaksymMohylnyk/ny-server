const userModel = require("./userModel.js");
const { mongoose } = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    var resp = await userModel.find(req.query).exec()

    if(resp.length == 0 && Object.keys(req.query).includes('name')){
      var user = new userModel({
        name: req.query.name,
        tasks: []
      });
  
      await user.save();
      res.status(200).json([user])
    }
    else{
      res.status(200).json(resp)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const postUser = async (req, res, next) => {
//   try {

//     var user = new userModel({
//       ...req.body,
//     });

//     await user.save();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const putUser = async (req, res, next) => {
  try {
    if (mongoose.isObjectIdOrHexString(req.params.id)) {
      var updatedData = {
        ...req.body,
      };

      const options = {
        new: true,
      };

      var result = await userModel
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          updatedData,
          options
        )
        .exec();

      res.status(200).json(result);
    } else {
      res.status(400).json({
        message: "Bad request",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getUsers,
  putUser,
};
