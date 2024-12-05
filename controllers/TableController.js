const Table = require('../Models/Table');
const Reservation = require('../Models/Reservation') 
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

module.exports = { addTable, deleteTable, isReserved };