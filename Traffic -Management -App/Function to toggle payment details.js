// Function to toggle payment details
function togglePaymentDetails() {
    const paymentType = document.getElementById('paymentType').value;
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const bankPaymentDetails = document.getElementById('bankPaymentDetails');

    if (mobilePaymentDetails && bankPaymentDetails) {
        mobilePaymentDetails.classList.remove('active');
        bankPaymentDetails.classList.remove('active');

        if (paymentType === 'mobile') {
            mobilePaymentDetails.classList.add('active');
        } else if (paymentType === 'bank') {
            bankPaymentDetails.classList.add('active');
        }
    }
}

// Function to count violations for a driver
function countViolations(driverLicense) {
    const violations = JSON.parse(localStorage.getItem('violations')) || [];
    return violations.filter(record => record.driverLicense === driverLicense).length;
}

// Handle form submission
document.getElementById('violationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const license = document.getElementById('license').value;
    const driverLicense = document.getElementById('driverLicense').value;
    const driverName = document.getElementById('driverName').value;
    const driverContact = document.getElementById('driverContact').value;
    const violationType = document.getElementById('violationType').value;
    const stopType = document.getElementById('stopType').value;
    const region = document.getElementById('region').value;
    const district = document.getElementById('district').value;
    const paymentType = document.getElementById('paymentType').value;
    const mobileProvider = document.getElementById('mobileProvider').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const email = document.getElementById('email').value;

    // Count the number of violations for the driver
    const numberOfViolations = countViolations(driverLicense) + 1;

    // Create violation record
    const violationRecord = {
        timestamp: new Date().toLocaleString(),
        license,
        driverLicense,
        driverName,
        driverContact,
        violationType,
        stopType,
        numberOfViolations,
        region,
        district,
        paymentDetails: {
            paymentType,
            mobileProvider: paymentType === 'mobile' ? mobileProvider : null,
            mobileNumber: paymentType === 'mobile' ? mobileNumber : null,
            bankName: paymentType === 'bank' ? bankName : null,
            accountNumber: paymentType === 'bank' ? accountNumber : null,
            email
        }
    };

    // Retrieve existing data from localStorage
    const storedData = localStorage.getItem('violations');
    const existingData = storedData ? JSON.parse(storedData) : [];

    // Add new record to the array
    existingData.push(violationRecord);

    // Save updated data back to localStorage
    localStorage.setItem('violations', JSON.stringify(existingData));

    // Notify user
    alert("Violation reported successfully!");

    // Clear form
    document.getElementById('violationForm').reset();
});

// Load data when the page loads
window.onload = function() {
    updateDistricts(); // Initialize district dropdown
    togglePaymentDetails(); // Initialize payment details visibility
};