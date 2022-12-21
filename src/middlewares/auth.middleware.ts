import AuthService from '@/services/auth.service';

const authService = new AuthService();

const authMiddleware = (passport, strategy) => {
  passport.use(new strategy(authService.verify));

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.accountId, username: user.username });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, user);
    });
  });
};

export default authMiddleware;
