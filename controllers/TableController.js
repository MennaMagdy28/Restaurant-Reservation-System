const  sequelize  = require("../.config/database");
const Table = require('../Models/Table');
const Reservation = require('../Models/Reservation')
const Timeslots = require("../Models/Timeslots");
const { where,Op, fn, col } = require('sequelize');
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
  const { seat_num, start_time, end_, date, restaurant_id } = req.body;

  try {
    const startDateTime = `${date} ${start_time}`;
    const endDateTime = `${date} ${end_}`;

    const query = `
      SELECT
          t.id AS table_id
      FROM
          Tables t
      LEFT JOIN
          timeslots ts ON t.id = ts.table_id
      WHERE
          t.restaurant_id = :restaurant_id
          AND ts.start <= :start_time AND ts.end_ >= :end_
          AND t.seat_num >= :seat_num
          AND NOT EXISTS (
            SELECT 1
            FROM Reservations r2
            WHERE r2.table_id = t.id
              AND r2.date = :date
              AND r2.time >= :start_time
              AND r2.time < :end_
  );
    `;

    const available = await sequelize.query(query, {
      replacements: {
        restaurant_id,
        seat_num,
        start_time,
        end_,
        date,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json(available);
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching available tables',
      error: err.message,
    });
  }
};



module.exports = { addTable, deleteTable, isReserved, getAvailable, getTables, getTimeslots };