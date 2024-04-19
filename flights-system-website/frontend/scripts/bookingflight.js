const accountBalance=document.getElementById("accountBalance");

const flightNumber=document.getElementById('flightNumber');
const departureAirport=document.getElementById('departureAirport');
const arrivalAirport=document.getElementById('arrivalAirport');
const departureDate=document.getElementById('departureDate');
const departureTime=document.getElementById('departureTime');
const arrivalTime=document.getElementById('arrivalTime');
const price=document.getElementById('price');

const bookNowBtn=document.getElementById('bookNowBtn');
let seatSelected=false;

async function fetchUserInfo() {
    try {
        const userId = localStorage.getItem('loggedUser');
        const response = await axios.get(`http://localhost/flights-system-website/backend/userInfo.php?userId=${userId}`);
        const data = response.data;
        
        accountBalance.textContent = data.balance;
    } catch (error) {
        console.error('Error:', error);
    }
}



document.addEventListener('DOMContentLoaded', ()=> {
    const seats = document.querySelectorAll('.seat.available');

    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            seat.classList.remove('available');
            seat.classList.add('unavailable');
          
            const flightId = "1"; 
            increasePassengers(flightId);
        });
    });
    function increasePassengers(flightId) {
    const formData= new FormData();
    formData.append('flightId',flightId);

        axios.post('http://localhost/flights-system-website/backend/increasepassengers.php',formData)
        .then((response) => {
            console.log(response.data);
            if (response.data.status === "success") {
                console.log(response.data.message);
            } else {
                console.log(response.data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
});


document.addEventListener('DOMContentLoaded', ()=> {
   
    axios.get('http://localhost/flights-system-website/backend/flightdetails.php')
        .then((response) => {
            const flightDetails = response.data[0];

            flightNumber.textContent = flightDetails.id;
            departureAirport.textContent = flightDetails.departure_airport_name+','+ flightDetails.departure_airport_country;
            arrivalAirport.textContent = flightDetails.arrival_airport_name+','+flightDetails.arrival_airport_country;
            departureDate.textContent = flightDetails.departure_date;
            departureTime.textContent = flightDetails.departure_time;
            arrivalTime.textContent = flightDetails.arrival_time;
            price.textContent = flightDetails.price;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const seats = document.querySelectorAll('.seat.available');

    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            seat.classList.remove('available');
            seat.classList.add('unavailable');
            seatSelected = true; 
            });
    });
});


bookNowBtn.addEventListener('click',async()=>{
    if(!seatSelected){
        alert('Please select a seat before you confirm your booking.')
        return;
    }
    const flightPrice= parseInt(price.textContent);
    const userBalance=parseInt(accountBalance.textContent);
    if (userBalance>=flightPrice){
        const remainingBalance= userBalance-flightPrice;
        accountBalance.textContent=remainingBalance;
    }else{
        alert('You do not have enough balance.');
    }
    
    seatSelected=false;
})

fetchUserInfo();