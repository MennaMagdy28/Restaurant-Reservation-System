const Reservation = require("../Models/Reservation");

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

module.exports = {newReservation};