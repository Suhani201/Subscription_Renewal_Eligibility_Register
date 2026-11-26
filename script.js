
// Subscription Renewal Eligibility Register

// Load saved records
let savedRecords = JSON.parse(
    localStorage.getItem("subscriptions") || "[]"
);

// Give older records an ID if they do not have one
savedRecords.forEach(function(record) {
    if (!record.id) {
        record.id = Date.now().toString() +
            Math.random().toString(36).slice(2);
    }
});

function saveRecords() {
    localStorage.setItem(
        "subscriptions",
        JSON.stringify(savedRecords)
    );
}

saveRecords();


// ADD SUBSCRIPTION
const subscriptionForm =
    document.getElementById("subscriptionForm");

if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const subscription = {
            id: Date.now().toString() +
                Math.random().toString(36).slice(2),
            name: document.getElementById("subscriberName").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            type: document.getElementById("subscriptionType").value,
            startDate: document.getElementById("startDate").value,
            expiryDate: document.getElementById("expiryDate").value,
            payment: document.getElementById("paymentStatus").value,
            status: document.getElementById("currentStatus").value
        };

        if (subscription.expiryDate < subscription.startDate) {
            alert("Expiry date cannot be before start date.");
            return;
        }

        savedRecords.push(subscription);
        saveRecords();

        alert("Subscription saved successfully!");
        subscriptionForm.reset();
    });
}


// DISPLAY SUBSCRIPTIONS
const subscriptionTable =
    document.getElementById("subscriptionTable");

function displaySubscriptions(records = savedRecords) {
    if (!subscriptionTable) return;

    subscriptionTable.innerHTML = "";

    if (records.length === 0) {
        subscriptionTable.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;padding:25px;">
                    No subscription records available.
                </td>
            </tr>
        `;
        return;
    }

    records.forEach(function(record) {
        const row = document.createElement("tr");

        const values = [
            record.name,
            record.email,
            record.phone,
            record.type,
            record.startDate,
            record.expiryDate,
            record.payment,
            record.status
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value || "";
            cell.style.padding = "12px";
            cell.style.borderBottom = "1px solid #ddd";
            row.appendChild(cell);
        });

        // Delete button
        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = record.id;

        deleteButton.style.background = "#dc2626";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "8px 12px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        subscriptionTable.appendChild(row);
    });
}

displaySubscriptions();


// DELETE SUBSCRIPTION
if (subscriptionTable) {
    subscriptionTable.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const id = event.target.dataset.id;

            const confirmDelete = confirm(
                "Are you sure you want to delete this subscription?"
            );

            if (confirmDelete) {
                savedRecords = savedRecords.filter(
                    record => record.id !== id
                );

                saveRecords();
                displaySubscriptions();
                updateDashboard();

                alert("Subscription deleted successfully!");
            }
        }
    });
}


// SEARCH SUBSCRIPTIONS
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const searchText = searchInput.value.toLowerCase();

        const filteredRecords = savedRecords.filter(function(record) {
            return record.name.toLowerCase().includes(searchText) ||
                   record.email.toLowerCase().includes(searchText);
        });

        displaySubscriptions(filteredRecords);
    });
}


// UPDATE DASHBOARD
function updateDashboard() {
    const total = document.getElementById("totalSubscriptions");
    const active = document.getElementById("activeSubscriptions");
    const paid = document.getElementById("paidSubscriptions");

    if (total) {
        total.textContent = savedRecords.length;
        active.textContent = savedRecords.filter(
            record => record.status === "Active"
        ).length;
        paid.textContent = savedRecords.filter(
            record => record.payment === "Paid"
        ).length;
    }
}

updateDashboard();


// CHECK ELIGIBILITY - FIND SUBSCRIBER
const eligibilityForm =
    document.getElementById("eligibilityForm");

if (eligibilityForm) {
    eligibilityForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("eligibilityEmail")
            .value.trim().toLowerCase();

        const result = savedRecords.find(function(record) {
            return record.email.toLowerCase() === email;
        });

        const resultBox =
            document.getElementById("eligibilityResult");

        const resultMessage =
            document.getElementById("resultMessage");

        resultBox.style.display = "block";

        if (!result) {
            resultMessage.textContent =
                "No subscription record found for this email address.";
            return;
        }

        resultMessage.innerHTML = `
            <strong>Subscriber:</strong> ${escapeHTML(result.name)}<br>
            <strong>Email:</strong> ${escapeHTML(result.email)}<br>
            <strong>Subscription Type:</strong> ${escapeHTML(result.type)}<br>
            <strong>Expiry Date:</strong> ${escapeHTML(result.expiryDate)}<br>
            <strong>Payment Status:</strong> ${escapeHTML(result.payment)}<br>
            <strong>Current Status:</strong> ${escapeHTML(result.status)}<br><br>
            <strong>Eligibility:</strong> Pending Engine 2 integration.
        `;
    });

    eligibilityForm.addEventListener("reset", function() {
        document.getElementById("eligibilityResult").style.display = "none";
    });
}


// SAFE HTML DISPLAY
function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

console.log("Engine 3 Frontend Loaded Successfully!");
