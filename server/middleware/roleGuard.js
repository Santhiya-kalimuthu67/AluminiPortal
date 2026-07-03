export const roleGuard = (...roles) => {
console.info('rolesss',roles)
  return (req, res, next) => {
    console.info("req",req.user.role)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
