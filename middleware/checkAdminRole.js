module.exports = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(503).send('Not authorized');
    }
    next();
};
