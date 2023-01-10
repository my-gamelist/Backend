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

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export default authMiddleware;
