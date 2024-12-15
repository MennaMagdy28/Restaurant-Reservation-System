const { where } = require("sequelize");
const Reservation = require("../Models/Reservation");
const Customer = require('../Models/User');
const Restaurant = require('../Models/Restaurant');
const {isReserved} = require("./TableController");
const { wsServer } = require('.././webSocket/webSocket');
const nodemailer = require('nodemailer');


const newReservation = async (req, res) => {
    const { customer_id, restaurant_id, table_id, date, time } = req.body;

    // Check if the date and time are in the past
    const reservationDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    if (reservationDateTime < currentDateTime) {
        return res.status(400).json({ error: "You cannot make a reservation in the past" });
    }

    try {
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const restaurant = await Restaurant.findByPk(restaurant_id); // Fetch restaurant details
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const customer_email = customer.email;
        const restaurant_name = restaurant.title;

        // Checking for availability
        const conflicts = await isReserved(table_id, date, time);
        if (conflicts) {
            return res.status(400).json({ error: "This table is unfortunately reserved" });
        }

        // Creating the reservation
        const reservation = await Reservation.create({
            customer_id,
            restaurant_id,
            table_id,
            date,
            time
        });
        global.wsServer.emit('book Table',reservation);
        // Email Configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            pool: true,
            debug: true,
            logger: true
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: customer_email,
            subject: 'Reservation Confirmation',
            text: `Dear ${customer.username},

Your reservation has been confirmed. Here are the details:
- Restaurant Name: ${restaurant_name}
- Table ID: ${table_id}
- Date: ${date}
- Time: ${time}

Thank you for choosing us!

Best regards,
Restaurant Team`
        };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email: ', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        return res.status(201).json({ message: "The reservation is created successfully!", reservation });
    } catch (err) {
        console.error("Error handling reservation: \n", err);
        return res.status(500).json({ error: "Error creating the reservation" });
    }
};

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