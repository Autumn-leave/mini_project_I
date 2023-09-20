const db = require("../Entity");

const User = db.User;

console.log(User);

const create = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.name && req.body.username && req.body.password && req.body.email) {
      const { name, username, password, email } = req.body;

      await User.create({
        name,
        username,
        password,
        email,
      });

      res.send({ statusCode: 200, message: "Data added successfully" });
    } else {
      res.send("Not added to the database!");
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: "Error adding data" });
  }
};
const validate = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  });
  const myData = {
    email: user.email,
    id: user.id,
  };
  if (user) {
    res.send({ statusCode: 200, message: "Login successful", myData });
  } else {
    res.status(400).send("Not added to the database!");
  }
};

module.exports = {
  create,
  validate,
};
