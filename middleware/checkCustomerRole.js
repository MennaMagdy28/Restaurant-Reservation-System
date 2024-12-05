module.exports = (req, res, next) => {
    if (req.role !== 'customer') {
        return res.status(503).send('Not authorized');
    }
    next();
};
