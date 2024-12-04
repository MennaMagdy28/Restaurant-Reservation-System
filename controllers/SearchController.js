const { Op , Sequelize } = require("sequelize");
const Restaurant = require("../Models/Restaurant");

//search for the restaurant by selecting a category
const searchByCategory = async (req, res) => {
  const { q } =  req.params;
  //fetching restaurants data
  try {
    const restaurants = await Restaurant.findAll({
      where: { food_category:q },
    });
    return res.status(200).json({restaurants});
  }

  catch (err) {
    console.error("The searching error : \n", err);
    return res.status(500).json({ error: "Error searching restaurants" });
  }
};

//to search by the name and show the most relevant results
const searchByName = async (req, res) => {
    const { q } = req.params;;
    //check for the most relevant results to the title given
    try {
        const restaurants = await Restaurant.findAll({
            //get all restaurants which have the title_search as substring in the title
            where: {
                title: {
                    [Op.like]: `%${q}%`
                }
            },
            //fetch only needed data for search results
            attributes: [
                'id',
                'title',
                'food_category',
                'location',
                [Sequelize.fn('POSITION', Sequelize.literal(`'${q}' IN title`)), 'relevance']
            ],
            //sort the results
            order: [[Sequelize.literal('relevance'), 'ASC']]
        });
        if (restaurants.length === 0) {
            return res.status(404).json({ message: "No restaurants found" });
        }
        return res.status(200).json({ restaurants });

    } catch (err) {
        console.error("The searching error: \n", err);
        return res.status(500).json({ error: "Error searching restaurants" });
    }
};

module.exports = { searchByName, searchByCategory };

