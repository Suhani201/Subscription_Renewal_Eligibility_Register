const express = require("express");

const router = express.Router();

const {
    getSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription
} = require("../controllers/subscriptionController");


// Get all subscriptions
router.get("/", getSubscriptions);


// Get subscription by ID
router.get("/:id", getSubscriptionById);


// Add subscription
router.post("/", addSubscription);


// Update subscription
router.put("/:id", updateSubscription);


// Delete subscription
router.delete("/:id", deleteSubscription);


module.exports = router;