const User = require('../Models/User');

const addVendor = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newVendor = await User.create({
            username,
            email,
            password,
            role: 'vendor',
        });
        res.status(201).json({
            message: 'Vendor created successfully',
            vendor: newVendor,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating vendor',
            error: error.message,
        });
    }
};

const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendor = await User.scope('vendor').findOne({ where: { id } });
        if (!vendor) {
            return res.status(404).json({
                message: 'Vendor not found',
            });
        }
        await vendor.destroy();
        res.status(200).json({
            message: 'Vendor deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting vendor',
            error: error.message,
        });
    }
};

const getVendors = async (req, res) => {
    try{
        const allVendors = await User.scope('vendor').findAll();
        res.status(200).json({
            message: 'all vendors',
            vendors: allVendors,
        });
    } catch(err) {
        res.status(500).json({
            message: "error fetching vendors22",
            error: err.message,
        });
    }
}

module.exports = { addVendor, deleteVendor, getVendors };