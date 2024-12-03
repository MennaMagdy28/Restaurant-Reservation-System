const { where } = require("sequelize");
const Restaurant = require("../Models/Restaurant");

//search for the restaurant by selecting a category
const searchByCategory = async (req, res) => {
  const { food_category } = req.body;
  //fetching restaurants data
  try {
    const restaurants = await Restaurant.findAll({
      where: { food_category },
    });
    return res.status(201).json({restaurants});
  }
  
  catch (err) {
    console.error("The checking error : \n", err);
    return res.status(500).json({ error: "Error finding restaurants" });
  }
};
