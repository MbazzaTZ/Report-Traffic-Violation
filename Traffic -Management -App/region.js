// Define districts for each region
const districtsByRegion = {
    "Arusha": ["Arusha", "Karatu", "Monduli", "Longido", "Ngorongoro"],
    "Dar es Salaam": ["Ilala", "Kinondoni", "Temeke", "Ubungo", "Kigamboni"],
    "Dodoma": ["Dodoma Urban", "Bahi", "Chamwino", "Kondoa", "Mpwapwa", "Mkalama", "Chemba", "Kongwa"],
    "Geita": ["Geita", "Chato", "Bukombe", "Mbogwe"],
    "Iringa": ["Iringa Urban", "Iringa Rural", "Kilolo", "Mufindi", "Ludewa", "Njombe"],
    "Kagera": ["Bukoba Urban", "Bukoba Rural", "Biharamulo", "Karagwe", "Kyerwa", "Muleba", "Ngara", "Missenyi"],
    "Kigoma": ["Kigoma Urban", "Kigoma Rural", "Kasulu", "Buhigwe", "Uvinza"],
    "Kilimanjaro": ["Moshi Urban", "Moshi Rural", "Hai", "Rombo", "Same", "Siha"],
    "Lindi": ["Lindi Urban", "Lindi Rural", "Kilwa", "Nachingwea", "Ruangwa"],
    "Manyara": ["Babati", "Hanang", "Kiteto", "Mbulu", "Simanjiro"],
    "Mara": ["Musoma Urban", "Musoma Rural", "Bunda", "Serengeti", "Tarime", "Rorya"],
    "Mbeya": ["Mbeya Urban", "Mbeya Rural", "Chunya", "Rungwe", "Ileje", "Mbozi", "Mbarali"],
    "Morogoro": ["Morogoro Urban", "Morogoro Rural", "Kilombero", "Ulanga", "Mvomero", "Gairo", "Ifakara"],
    "Mtwara": ["Mtwara Urban", "Mtwara Rural", "Nanyumbu", "Masasi", "Newala", "Tandahimba"],
    "Mwanza": ["Mwanza Urban", "Mwanza Rural", "Magu", "Sengerema", "Misungwi", "Kwimba", "Buchosa"],
    "Njombe": ["Njombe Urban", "Njombe Rural", "Wanging'ombe", "Ludewa"],
    "Pemba North": ["Wete", "Micheweni", "Chakechake", "Mkoani"],
    "Pemba South": ["Mkoani", "Chake Chake", "Wete", "Micheweni"],
    "Pwani": ["Kibaha", "Bagamoyo", "Mkuranga", "Rufiji", "Kisarawe", "Mafia"],
    "Rukwa": ["Sumbawanga Urban", "Sumbawanga Rural", "Kalambo", "Nkasi"],
    "Ruvuma": ["Songea Urban", "Songea Rural", "Namtumbo", "Tunduru", "Nyasa"],
    "Shinyanga": ["Shinyanga Urban", "Shinyanga Rural", "Kahama", "Msalala"],
    "Simiyu": ["Bariadi", "Busega", "Itilima", "Meatu"],
    "Singida": ["Singida Urban", "Singida Rural", "Manyoni", "Ikungi", "Iramba"],
    "Tabora": ["Tabora Urban", "Tabora Rural", "Nzega", "Urambo", "Igunga", "Kaliua"],
    "Tanga": ["Tanga Urban", "Tanga Rural", "Pangani", "Muheza", "Handeni", "Lushoto"],
    "Zanzibar Central": ["Central"],
    "Zanzibar South": ["South"],
    "Zanzibar North": ["North"],
    "Zanzibar Urban": ["Urban"],
    "Zanzibar West": ["West"]
};

// Function to update districts based on selected region
function updateDistricts() {
    const regionSelect = document.getElementById('region');
    const districtSelect = document.getElementById('district');

    // Get the selected region
    const selectedRegion = regionSelect.value;

    // Clear existing districts
    districtSelect.innerHTML = '<option value="">Select District</option>';

    // Enable district dropdown if a region is selected
    if (selectedRegion) {
        districtSelect.disabled = false;

        // Add districts for the selected region
        const districts = districtsByRegion[selectedRegion];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } else {
        // Disable district dropdown if no region is selected
        districtSelect.disabled = true;
    }
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
    const numberOfViolations = document.getElementById('numberOfViolations').value;
    const region = document.getElementById('region').value;
    const district = document.getElementById('district').value;
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
        region,
        district,
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
    document.getElementById('violationForm').reset();
});