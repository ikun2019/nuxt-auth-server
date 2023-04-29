const User = require('../models/User');

module.exports = {
  createUser: async (args, req) => {
    try {
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: args.userInput.password,
      });
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
      console.log('user =>', user);
      if (!user) {
        throw new Error('ユーザーが存在しません');
      }

      const isMatch = await user.comparePassword(args.password);
      console.log('isMatch =>', isMatch);
      if (!isMatch) {
        throw new Error('パスワードが違います');
      }

      const token = await user.getSignedJwtToken();
      console.log('token =>', token);
      return {
        token: token,
        userId: user.id
      }
    } catch (err) {
      console.error(err);
    }
  },
  user: async (args, req) => {
    const userId = args.id;
    console.log('userId =>', userId);
    const user = await User.findOne({
      where: { id: userId }
    });
    return user;
  },
}