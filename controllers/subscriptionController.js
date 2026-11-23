const Subscription = require("../models/Subscription");

// GET ALL SUBSCRIPTIONS
const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve subscriptions",
            error: error.message
        });
    }
};


// GET ONE SUBSCRIPTION
const getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve subscription",
            error: error.message
        });
    }
};


// ADD SUBSCRIPTION
const addSubscription = async (req, res) => {
    try {
        const {
            subscriberName,
            email,
            phone,
            subscriptionType,
            startDate,
            expiryDate,
            paymentStatus,
            subscriptionStatus
        } = req.body;

        if (
            !subscriberName ||
            !email ||
            !phone ||
            !subscriptionType ||
            !startDate ||
            !expiryDate ||
            !paymentStatus ||
            !subscriptionStatus
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const subscription = await Subscription.create({
            subscriberName,
            email,
            phone,
            subscriptionType,
            startDate,
            expiryDate,
            paymentStatus,
            subscriptionStatus
        });

        res.status(201).json({
            success: true,
            message: "Subscription added successfully",
            data: subscription
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add subscription",
            error: error.message
        });
    }
};


// UPDATE SUBSCRIPTION
const updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: subscription
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update subscription",
            error: error.message
        });
    }
};


// DELETE SUBSCRIPTION
const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete subscription",
            error: error.message
        });
    }
};


module.exports = {
    getSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription
};