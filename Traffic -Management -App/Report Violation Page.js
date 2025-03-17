document.getElementById('violationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const license = document.getElementById('license').value;
    const driverLicense = document.getElementById('driverLicense').value;
    const driverName = document.getElementById('driverName').value;
    const driverContact = document.getElementById('driverContact').value;
    const violationType = document.getElementById('violationType').value;
    const stopType = document.getElementById('stopType').value;
    const numberOfViolations = document.getElementById('numberOfViolations').value;
    const location = document.getElementById('location').value;
    const paymentType = document.getElementById('paymentType').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const email = document.getElementById('email').value;

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
        location,
        paymentDetails: {
            paymentType,
            mobileNumber: paymentType === 'mobile' ? mobileNumber : null,
            bankName: paymentType === 'bank' ? bankName : null,
            accountNumber: paymentType === 'bank' ? accountNumber : null,
            email
        }
    };

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('violations')) || [];

    // Add new record to the array
    existingData.push(violationRecord);

    // Save updated data back to localStorage
    localStorage.setItem('violations', JSON.stringify(existingData));

    // Notify user
    alert("Violation reported successfully!");

    // Clear form
    document.getElementById('violationForm').reset();
});