document.addEventListener('DOMContentLoaded', function() {
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

    // Handle form submission
    const violationForm = document.getElementById('violationForm');
    if (violationForm) {
        violationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const license = document.getElementById('license').value;
            const driverLicense = document.getElementById('driverLicense').value;
            const driverName = document.getElementById('driverName').value;
            const driverContact = document.getElementById('driverContact').value;
            const violationType = document.getElementById('violationType').value;
            const stopType = document.getElementById('stopType').value;
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
                paymentDetails: {
                    paymentType,
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
            violationForm.reset();
        });
    } else {
        console.error("Form with ID 'violationForm' not found!");
    }
});