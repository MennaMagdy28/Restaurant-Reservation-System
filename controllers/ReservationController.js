const { where } = require("sequelize");
const Reservation = require("../Models/Reservation");
const {isReserved} = require("./TableController");

//creating a new reservation after checking for conflicted reservations
//Return response
const newReservation = async(req, res) => {
    const {customer_id, restaurant_id, table_id, date, time} = req.body;
    // checking for availability
    const conflicts = await isReserved(table_id, date, time);
    if (conflicts) {
        return res.status(400).json({error: "This table is unfortunately reserved"});
    }
    // creating the reservation
    try {
        const reservation = await Reservation.create({
            customer_id,
            restaurant_id,
            table_id,
            date,
            time
        })
        return res.status(201).json({message : "The reservation is created successfully!", reservation});
    }
    catch (err) {
        console.error("Creating reservation error : \n",err);
        return res.status(500).json({error: "Error creating the reservation"});
    }
}

// view the reservations that the customer made
//Return json
const viewCustomerReservations = async (req, res) => {
    const {customer_id} = req.params;
    try {
        //filtering the reservations by the customer id
        const reservations = await Reservation.findAll({
            where: {
                customer_id
            }
        })
        if(reservations.length === 0)
            return res.status(404).json({message: "There is no reservations yet"});
        return res.status(200).json({reservations})
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({ error: "Error fetching reservations" });
    }
}

//view the reservations of a specific restaurant (vendor pov)
//return json
const viewRestaurantReservations = async (req, res) => {
    const { restaurant_id } = req.params;
    try { 
        // filtering the reservations by the restaurant id
        const reservations = await Reservation.findAll({
            where: {
                restaurant_id
            }
        })
        if(reservations.length === 0)
            return res.status(404).json({message: "There is no reservations yet"});
        return res.status(200).json({reservations});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({ error: "Error fetching reservations" });
    }
};

const getReservationById = async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await Reservation.findOne({ where: { id } });
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.status(200).json({
        message: 'Reservation fetched successfully',
        reservation,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching reservation',
        error: err.message,
      });
    }
};

// cancel the reservation (customer pov)
const cancelReservation = async (req, res) => {
    const {id} = req.params;
    try{
        //delete the reservation from the database
        await Reservation.destroy({
            where: {
                id
            }
        })
        return res.status(200).json({message : "The reservation is cancelled successfully!"});
    }
    catch(err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({ error: "Error cancelling the reservation" });
    }
};

module.exports = {newReservation, viewCustomerReservations, viewRestaurantReservations, getReservationById, cancelReservation};