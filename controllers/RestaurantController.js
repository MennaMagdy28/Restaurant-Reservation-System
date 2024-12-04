const sequelize = require('sequelize');
const Restaurant = require('../Models/Restaurant');

const addRestaurant = async (req, res) => {
  try {
    const { vendor_id, title, food_category, location, description, image } = req.body;    
    const newRestaurant = await Restaurant.create({
      vendor_id,
      title,
      food_category,
      location,
      description,
      image,
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating restaurant',
      error: err.message,
    });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json({
      message: 'All restaurants fetched successfully',
      restaurants,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching restaurants',
      error: err.message,
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({
      message: 'Restaurant fetched successfully',
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching restaurant',
      error: err.message,
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, food_category, location, description, image } = req.body;

    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.update({
      title,
      food_category,
      location,
      description,
      image,
    });

    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating restaurant',
      error: err.message,
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.destroy();

    res.status(200).json({
      message: 'Restaurant deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting restaurant',
      error: err.message,
    });
  }
};

//a function to get all categories and their count to show as a list in the interface for searching
const getCategories = async(req, res) => {
    try {
        const categories = await Restaurant.findAll({
            attributes : [
                'food_category',
                [sequelize.fn('COUNT', sequelize.col('food_category')), 'count']
            ],
            group : ['food_category'],
            raw : true
        })
        return res.status(200).json({categories});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({ error: "Error fetching the categories data" });
    }
};

module.exports = { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, getCategories };