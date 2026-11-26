
function checkEligibility(subscription) {

    // RULE 1: Check whether subscription details exist
    if (!subscription || typeof subscription !== "object") {
        return {
            status: "Needs Correction",
            reason: "Subscription details are missing."
        };
    }

    // RULE 2: Check mandatory fields
    const requiredFields = [
        "subscriberName",
        "email",
        "phone",
        "subscriptionType",
        "startDate",
        "expiryDate",
        "paymentStatus",
        "subscriptionStatus"
    ];

    for (const field of requiredFields) {

        if (
            typeof subscription[field] !== "string" ||
            subscription[field].trim() === ""
        ) {
            return {
                status: "Needs Correction",
                reason: `Missing required field: ${field}`
            };
        }
    }

    // RULE 3: Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(subscription.email)) {
        return {
            status: "Needs Correction",
            reason: "Invalid email address."
        };
    }

    // RULE 4: Validate phone number
    if (!/^\d{10}$/.test(subscription.phone)) {
        return {
            status: "Needs Correction",
            reason: "Phone number must contain 10 digits."
        };
    }

    // RULE 5: Validate date format
    function parseDate(value) {

        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return null;
        }

        const date = new Date(value + "T00:00:00.000Z");

        if (isNaN(date.getTime())) {
            return null;
        }

        if (date.toISOString().slice(0, 10) !== value) {
            return null;
        }

        return date;
    }

    const startDate = parseDate(subscription.startDate);
    const expiryDate = parseDate(subscription.expiryDate);

    if (!startDate || !expiryDate) {
        return {
            status: "Needs Correction",
            reason: "Invalid date. Use YYYY-MM-DD format."
        };
    }

    // RULE 6: Expiry date must not be before start date
    if (expiryDate < startDate) {
        return {
            status: "Needs Correction",
            reason: "Expiry date cannot be before start date."
        };
    }

    // RULE 7: Validate payment status

if (!["Paid", "Unpaid"].includes(subscription.paymentStatus)) {
    return {
        status: "Needs Correction",
        reason: "Invalid payment status."
    };
}

// Check whether payment is completed

if (subscription.paymentStatus !== "Paid") {
    return {
        status: "Not Eligible",
        reason: "Payment is pending."
    };
}

   // RULE 8: Validate subscription status

if (!["Active", "Inactive"].includes(subscription.subscriptionStatus)) {
    return {
        status: "Needs Correction",
        reason: "Invalid subscription status."
    };
}

// Check whether subscription is active

if (subscription.subscriptionStatus !== "Active") {
    return {
        status: "Not Eligible",
        reason: "Subscription is inactive."
    };
}

    // RULE 9: Check expiry date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (expiryDate < today) {
        return {
            status: "Not Eligible",
            reason: "Subscription has already expired."
        };
    }

    // ALL RULES PASSED
    return {
        status: "Eligible",
        reason: "All renewal conditions are satisfied."
    };
}

// Export the function for other engines
module.exports = checkEligibility;
