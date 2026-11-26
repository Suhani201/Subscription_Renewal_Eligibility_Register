
// ==========================================
// SUBSCRIPTION RENEWAL ELIGIBILITY REGISTER
// ==========================================


// LOAD SAVED RECORDS

let savedRecords = JSON.parse(
    localStorage.getItem("subscriptions") || "[]"
);


// GIVE OLD RECORDS AN ID IF THEY DO NOT HAVE ONE

savedRecords.forEach(function(record) {
    if (!record.id) {
        record.id = Date.now().toString() +
            Math.random().toString(36).slice(2);
    }
});


// SAVE RECORDS

function saveRecords() {
    localStorage.setItem(
        "subscriptions",
        JSON.stringify(savedRecords)
    );
}

saveRecords();


// ==========================================
// ADD AND EDIT SUBSCRIPTION
// ==========================================

const subscriptionForm =
    document.getElementById("subscriptionForm");

if (subscriptionForm) {

    const editId = sessionStorage.getItem("editSubscriptionId");

    let editingRecord = null;

    // LOAD EXISTING DETAILS WHEN EDITING

    if (editId) {

        editingRecord = savedRecords.find(
            record => record.id === editId
        );

        if (editingRecord) {

            document.getElementById("subscriberName").value =
                editingRecord.name;

            document.getElementById("email").value =
                editingRecord.email;

            document.getElementById("phone").value =
                editingRecord.phone;

            document.getElementById("subscriptionType").value =
                editingRecord.type;

            document.getElementById("startDate").value =
                editingRecord.startDate;

            document.getElementById("expiryDate").value =
                editingRecord.expiryDate;

            document.getElementById("paymentStatus").value =
                editingRecord.payment;

            document.getElementById("currentStatus").value =
                editingRecord.status;

            const formMode = document.getElementById("formMode");
            const saveButton = document.getElementById("saveButton");

            if (formMode) {
                formMode.textContent =
                    "Edit existing subscription details.";
            }

            if (saveButton) {
                saveButton.textContent = "Save Changes";
            }
        }
    }


    // SAVE NEW OR UPDATED SUBSCRIPTION

    subscriptionForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const subscription = {

            id: editingRecord
                ? editingRecord.id
                : Date.now().toString() +
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


        // DATE VALIDATION

        if (subscription.expiryDate < subscription.startDate) {
            alert("Expiry date cannot be before start date.");
            return;
        }


        // UPDATE EXISTING RECORD

        if (editingRecord) {

            const index = savedRecords.findIndex(
                record => record.id === editingRecord.id
            );

            if (index !== -1) {
                savedRecords[index] = subscription;
            }

            alert("Subscription updated successfully!");

        }

        // ADD NEW RECORD

        else {

            savedRecords.push(subscription);

            alert("Subscription saved successfully!");
        }


        saveRecords();

        sessionStorage.removeItem("editSubscriptionId");

        subscriptionForm.reset();

        window.location.href = "view-subscriptions.html";

    });
}



// ==========================================
// DISPLAY SUBSCRIPTIONS
// ==========================================

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


        // ACTION COLUMN

        const actionCell = document.createElement("td");


        // EDIT BUTTON

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.dataset.id = record.id;

        editButton.style.background = "#2563eb";

        editButton.style.color = "white";

        editButton.style.border = "none";

        editButton.style.padding = "8px 12px";

        editButton.style.borderRadius = "5px";

        editButton.style.cursor = "pointer";

        editButton.style.marginRight = "8px";

        actionCell.appendChild(editButton);


        // DELETE BUTTON

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



// ==========================================
// EDIT AND DELETE SUBSCRIPTION
// ==========================================

if (subscriptionTable) {

    subscriptionTable.addEventListener("click", function(event) {

        const button = event.target.closest("button");

        if (!button) return;

        const id = button.dataset.id;


        // EDIT SUBSCRIPTION

        if (button.textContent === "Edit") {

            sessionStorage.setItem("editSubscriptionId", id);

            window.location.href = "add-subscription.html";

            return;
        }


        // DELETE SUBSCRIPTION

        if (button.textContent === "Delete") {

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



// ==========================================
// SEARCH SUBSCRIPTIONS
// ==========================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase();

        const filteredRecords = savedRecords.filter(function(record) {

            return (record.name || "").toLowerCase().includes(searchText) ||
                   (record.email || "").toLowerCase().includes(searchText);

        });

        displaySubscriptions(filteredRecords);

    });

}



// ==========================================
// UPDATE DASHBOARD COUNTS
// ==========================================

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



// ==========================================
// CHECK ELIGIBILITY - FIND SUBSCRIBER
// ==========================================

const eligibilityForm =
    document.getElementById("eligibilityForm");

if (eligibilityForm) {

    eligibilityForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("eligibilityEmail")
            .value.trim().toLowerCase();


        const result = savedRecords.find(function(record) {

            return (record.email || "").toLowerCase() === email;

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



// ==========================================
// SAFE HTML DISPLAY
// ==========================================

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
