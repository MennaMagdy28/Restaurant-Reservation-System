module.exports = (req, res, next) => {
    if (req.role !== 'vendor') {
        return res.status(503).send('Not authorized');
    }
    next();
};
