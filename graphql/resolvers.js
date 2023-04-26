const User = require('../models/User');

module.exports = {
  createUser: async (args, req) => {
    try {
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: args.userInput.password,
      });
      console.log('user =>', user);
      const newUser = await user.save();
      return {
        ...newUser,
        id: newUser.id,
        email: newUser.email,
      }
    } catch (err) {
      console.error(err);
      throw new Error('ユーザーが作成できませんでした')
    }
  },
  login: async (args, req) => {
    try {
      const user = await User.findOne({
        where: { email: args.email }
      });
      if (!user) {
        throw new Error('ユーザーが存在しません');
      }
      const isMatch = (args.password === user.password) ? true : false;
      if (!isMatch) {
        throw new Error('パスワードが違います');
      }

    } catch (err) {
      console.error(err);
    }
  }
}