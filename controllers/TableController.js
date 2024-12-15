const Table = require('../Models/Table');
const Reservation = require('../Models/Reservation')
const Timeslot = require("../Models/Timeslots");
const { where , Op} = require('sequelize');
// to check if there any table reserved already at the same specific time
// Return a boolean
const isReserved = async(table_id, date, time) => {
    try {
        //filtering reservations to find the table in those specific date and time
        const conflicts = await Reservation.findOne({
            where: {
                table_id,
                date,
                time
            }
        });

        return !!conflicts;
    }
    catch (err) {
        console.error("The checking error : \n",err);
        throw new Error("Error checking for the conflicts");
    }
}

const addTable = async (req, res) => {
  try {
    const { restaurant_id, seat_num } = req.body;

    // Create the new table
    const newTable = await Table.create({
      restaurant_id,
      seat_num,
    });

    return res.status(201).json({
      message: 'Table added successfully',
      table: newTable,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error adding table',
      error: err.message,
    });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findOne({ where: { id } });

    if (!table) {
      return res.status(404).json({
        message: 'Table not found',
      });
    }
    await Table.destroy({ where: { id } });
    return res.status(200).json({
      message: 'Table deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error deleting table',
      error: err.message,
    });
  }
};
//to view all tables in the restaurant wether available or not
const getTables = async (req, res) => {
  const {restaurant_id} = req.body;

  try{
    const allTables = await Table.findAll({
      where: {
        restaurant_id
      },
    });
    return res.status(201).json(allTables);
  }
  catch (err) {
    return res.status(500).json({
      message: 'Error fetching restaurant tables',
      error: err.message,
    });
  }
}

//get time slots in all the restaurant
const getTimeslots = async (req, res) => {
  const {restaurant_id} = req.body;
  
  try{
    const Tables = await Table.findAll({where: { restaurant_id }, attributes: ["id"]});
    const tableIds = tables.map((table) => table.id);
    const timeslots = await Timeslot.findAll({
      where: {
        table_id: { [Op.in]: tableIds },
        start: { [Op.startsWith]: date },
      },
      attributes: ["table_id", "start", "end_"],
      order: [["start", "ASC"]],
   });
  return res.status(201).json(timeslots);
  }catch(err) {
    return res.status(500).json({
      message: 'Error fetching timeslots',
      error: err.message,
    });
  }
}

//for customer to view  available tables based on time slots
const getAvailable = async (req, res) => {
  const {seat_num, start_time, end_ ,date, restaurant_id} = req.body;

  try{
    const startDateTime = new Date(`${date}T${start_time}`);
    const endDateTime = new Date(`${date}T${end_}`);
    const available = await Table.findAll({
      where: {
        restaurant_id,
        seat_num: { [Op.gte]: seat_num }, // Filter by seat number
      },
      includes: [
        {
          model: Timeslot,
          required: false,
          where: {
            [Op.or]: [
              { start: { [Op.gte]: endDateTime } },
              { end_: { [Op.lte]: startDateTime } },
            ],
          },
        },
        {
          model: Reservation,
          required: false,
          where: {
            [Op.or]: [
              { date: { [Op.ne]: date } },
              {
                time: {
                  [Op.or]: [
                    { [Op.gte]: endDateTime.toTimeString().slice(0, 8) },
                    { [Op.lte]: startDateTime.toTimeString().slice(0, 8) },
                  ],
                },
              },
            ],
          },
        },
      ],
      having: [
        sequelize.where(
          sequelize.fn("COUNT", sequelize.col("Timeslot.table_id")),
          "=",
          0
        ),
        sequelize.where(
          sequelize.fn("COUNT", sequelize.col("Reservation.table_id")),
          "=",
          0
        ),
      ],
      group: ["Table.id"]
    })
    return res.status(201).json(available);
  }
  catch (err) {
    return res.status(500).json({
      message: 'Error fetching available tables',
      error: err.message,
    });
  }
}


module.exports = { addTable, deleteTable, isReserved, getAvailable, getTables, getTimeslots };