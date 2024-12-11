const { where, Sequelize } = require("sequelize");
const Review = require("../Models/Review");
const Reservation = require("../Models/Reservation");
const { now } = require("sequelize/lib/utils");

//view reviews sorted by the time (the user's review on top)
const getReviews = async(req, res) => {
    const {customer_id, restaurant_id} = req.body;
    try {
        const reviews = await Review.findAll({
            where: {
                restaurant_id
            },
            attributes: {
                include: [
                    [
                    Sequelize.literal(`CASE WHEN customer_id = :customerID THEN 1 ELSE 0`),'userReview'
                    ]
                ]
            },
            order: [
                [Sequelize.literal("userReview"),"DESC"],
                ["createdAt","DESC"]
            ],
            replacements: {
                customerID : customer_id
            }
        })
        return res.status(200).json(reviews);
    }
    catch (err) {
        console.error("The Fetching error : \n", err);
        return res.status(500).json({ error: "Error Fetching Reviews" });
    }
}

//check if the Review for a specific reservation is already done to prevent spam/fake Reviews
//Return: true if found. false otherwise
const hasPreviousReservation = async(customer_id, restaurant_id)  => {
    try {
        const now = moment();
        const reservations = await Reservation.findAll({
            where: {
                customer_id,
                restaurant_id,
                date: { [Op.lte]: now.format('YYYY-MM-DD') },
                time: { [Op.lt]: now.format('HH:mm:ss') }
            },
            order: [
                ['date', 'desc'],
                ['time', 'desc']
            ]
        })
        return reservations.length > 0;
    }
    catch (err) {
        console.error("The checking error : \n",err);
        throw new Error("Error checking for Reservations");
    }
}

//submit a Review if not already submitted before
//Return response messages and the Review if succeeded
const submitReview = async(req, res) => {
    const {restaurant_id, rating, notes, customer_id} = req.body;
    const reservationFound = await hasPreviousReservation(customer_id, restaurant_id);
    //checking if the customer has already submitted Review before
    if (!reservationFound) {
        return res.status(400).json({error: "You didn't attend to any reservation in that restaurant yet"});
    }
    try {
        const review = await Review.create({
            restaurant_id,
            customer_id,
            rating,
            notes
            })
        return res.status(201).json({message: "Your Review is submitted successfully!", review});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({error: "Error submitting the Review"});
    }
}

//update a Review that is already visible
//return response message and  the edited review if succeeded
const editReview = async(req, res) => {
    const{review_id, rating, notes} = req.body;
    try {
        const newReview = await Review.update({
            rating,
            notes,
            createdAt: Sequelize.NOW
        }, {
            where: {
                id: review_id
            }
        })
        return res.status(200).json({message: "Your Review is Edited successfully!", newReview});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({error: "Error editing the Review"});
    }
}

//delete Review from the interface but keep it in database to prevent editing Reviews by deleting and submitting new
const deleteReview = async(req, res) => {
    const {id} = req.params;

    // making the Review not visible
    try {
        await Review.update(
            {is_visible : false},
            {where : {id : id}}
        )
        return res.status(200).json({message : "The Review is deleted successfully!"});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({error: "Error deleting the Review"});
    }
}

module.exports = {submitReview, editReview,deleteReview};
