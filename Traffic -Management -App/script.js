// Mock database
const driversDatabase = [
  { licenseNumber: '123ABC', driverName: 'John Doe', violations: [{ type: 'Speeding', date: '2025-03-16' }] },
  { licenseNumber: '456DEF', driverName: 'Jane Smith', violations: [{ type: 'Running a Red Light', date: '2025-03-14' }] }
];

// Handle form submission
const form = document.getElementById('violationForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const license = document.getElementById('license').value;
  const driverLicense = document.getElementById('driverLicense').value;
  const violationType = document.getElementById('violationType').value;

  const driver = driversDatabase.find(d => d.licenseNumber === driverLicense);
  if (driver) {
    driver.violations.push({ type: violationType, date: new Date().toISOString().split('T')[0] });
    alert('Violation reported successfully.');
  } else {
    alert('Driver not found.');
  }

  displayDatabase();
});

// Display the database
function displayDatabase() {
  const databaseView = document.getElementById('databaseView');
  databaseView.textContent = JSON.stringify(driversDatabase, null, 2);
}

// Initial display of the database
window.onload = displayDatabase;


