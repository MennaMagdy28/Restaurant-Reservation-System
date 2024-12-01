const { where } = require("sequelize");
const Feedback = require("../Models/Feedback");

//check if the feedback for a specific reservation is already done to prevent spam/fake feedbacks
//Return: true if found. false otherwise
const hasFeedback = async(reservation_id)  => {
    try {
        const feedback = await Feedback.findOne({
            where: {
                reservation_id
            }
        })
        return !!feedback;
    }
    catch (err) {
        console.error("The checking error : \n",err);
        throw new Error("Error checking for feedbacks");
    }
}

//submit a feedback if not already submitted before
//Return response messages and the feedback if succeeded
const submitFeedback = async(req, res) => {
    const {reservation_id, rating, notes} = req.body;
    const feedbackExists = await hasFeedback(reservation_id);
    //checking if the customer has already submitted feedback before
    if (feedbackExists) {
        return res.status(400).json({error: "You already gave your feedback for this reservation"});
    }
    try {
        const feedback = await Feedback.create({
            reservation_id,
            rating,
            notes
        })
        return res.status(201).json({message: "Your feedback is submitted successfully!"}, feedback);
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({error: "Error submitting the feedback"});
    }
}

//delete feedback from the interface but keep it in database to prevent editing feedbacks by deleting and submitting new
const deleteFeedback = async(req, res) => {
    const {feedback_id}  = req.body;

    // making the feedback not visible
    try {
        await Feedback.update(
            {is_visible : false},
            {where : {id : feedback_id}}
        )
        return res.status(200).json({message : "The feedback is deleted successfully!"});
    }
    catch (err) {
        console.error("The checking error : \n",err);
        return res.status(500).json({error: "Error deleting the feedback"});
    }
}

module.exports = {submitFeedback, deleteFeedback};
