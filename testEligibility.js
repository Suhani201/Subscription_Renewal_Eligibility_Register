
const checkEligibility = require("./eligibilityEngine");

// Test data
const testCases = [
    {
        test: 1,
        description: "Valid subscription",
        input: {
            subscriberName: "Rahul",
            email: "rahul@gmail.com",
            phone: "9876543210",
            subscriptionType: "Premium",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Eligible"
    },
    {
        test: 2,
        description: "Unpaid subscription",
        input: {
            subscriberName: "Amit",
            email: "amit@gmail.com",
            phone: "9876543211",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Unpaid",
            subscriptionStatus: "Active"
        },
        expected: "Not Eligible"
    },
    {
        test: 3,
        description: "Inactive subscription",
        input: {
            subscriberName: "Priya",
            email: "priya@gmail.com",
            phone: "9876543212",
            subscriptionType: "Premium",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Inactive"
        },
        expected: "Not Eligible"
    },
    {
        test: 4,
        description: "Missing email",
        input: {
            subscriberName: "Kiran",
            email: "",
            phone: "9876543213",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 5,
        description: "Expired subscription",
        input: {
            subscriberName: "Sneha",
            email: "sneha@gmail.com",
            phone: "9876543214",
            subscriptionType: "Premium",
            startDate: "2025-01-01",
            expiryDate: "2025-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Not Eligible"
    },
    {
        test: 6,
        description: "Invalid email",
        input: {
            subscriberName: "Arun",
            email: "arun-email",
            phone: "9876543215",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 7,
        description: "Invalid phone number",
        input: {
            subscriberName: "Meena",
            email: "meena@gmail.com",
            phone: "12345",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 8,
        description: "Invalid date format",
        input: {
            subscriberName: "Vijay",
            email: "vijay@gmail.com",
            phone: "9876543216",
            subscriptionType: "Premium",
            startDate: "01-01-2026",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 9,
        description: "Expiry date before start date",
        input: {
            subscriberName: "Anu",
            email: "anu@gmail.com",
            phone: "9876543217",
            subscriptionType: "Basic",
            startDate: "2026-12-31",
            expiryDate: "2026-01-01",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 10,
        description: "Missing subscriber name",
        input: {
            subscriberName: "",
            email: "test@gmail.com",
            phone: "9876543218",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 11,
        description: "Invalid payment status",
        input: {
            subscriberName: "Ravi",
            email: "ravi@gmail.com",
            phone: "9876543219",
            subscriptionType: "Premium",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Pending",
            subscriptionStatus: "Active"
        },
        expected: "Needs Correction"
    },
    {
        test: 12,
        description: "Invalid subscription status",
        input: {
            subscriberName: "Divya",
            email: "divya@gmail.com",
            phone: "9876543220",
            subscriptionType: "Basic",
            startDate: "2026-01-01",
            expiryDate: "2026-12-31",
            paymentStatus: "Paid",
            subscriptionStatus: "Unknown"
        },
        expected: "Needs Correction"
    }
];

// Run all test cases
let passed = 0;
let failed = 0;

console.log("\n===== ELIGIBILITY ENGINE TEST RESULTS =====\n");

testCases.forEach((testCase) => {
    const result = checkEligibility(testCase.input);

    const actual = result.status;
    const isPassed = actual === testCase.expected;

    if (isPassed) {
        passed++;
    } else {
        failed++;
    }

    console.log(`Test ${testCase.test}: ${testCase.description}`);
    console.log(`Expected: ${testCase.expected}`);
    console.log(`Actual:   ${actual}`);
    console.log(`Result:   ${isPassed ? "PASS" : "FAIL"}`);
    console.log("------------------------------------------");
});

console.log("\n===== SUMMARY =====");
console.log(`Total Tests: ${testCases.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
    console.log("\nAll test cases passed successfully!");
} else {
    console.log("\nSome test cases failed. Check the results above.");
}
