const bookingsContainer = document.getElementById("bookings-container");

const generateBookingcard = (element) => {
  const {
    id,
    departure_date,
    return_date,
    departure_time,
    arrival_time,
    name,
    email,
    phone_number,
    gender,
  } = element;
  return `         <div class="booking-card flex" >
    <div class="booking-child flex column">
      <div class="booking-details flex row space-between">
        <p>Name:</p>
        <p>${name}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Email:</p>
        <p>${email}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Phone number:</p>
        <p>${phone_number}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Gender:</p>
        <p>${gender}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Payment status:</p>
        <p>Paid</p>
      </div>
    </div>
    
    <div class="booking-child flex column">
      <div class="booking-details flex row space-between">
        <p>Flight number:</p>
        <p>${id}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Departure Date</p>
        <p>${departure_date}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Return Date</p>
        <p>${return_date}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Departure time:</p>
        <p>${departure_time}</p>
      </div>
      <div class="booking-details flex row space-between">
        <p>Arrival time:</p>
        <p>${arrival_time}</p>
      </div>
    </div>
   <div class="flex center" id="${parseInt(
     id
   )}"><input class="adminBtn bookingDeleteBtn" type="submit" value="Cancel Booking" /></div> 
</div> `;
};

const GetBookings = () => {
  fetch("http://localhost/flights-system-website/backend/adminBooking.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const bookings = data["bookings"];
      bookingsContainer.innerHTML = "";
      bookings.forEach((element) => {
        bookingsContainer.innerHTML += generateBookingcard(element);
      });

      const deleteBooking = document.querySelectorAll(".bookingDeleteBtn");
      deleteBooking.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.parentElement.id;
          removeBooking(id);
        });
      });
    })

    .catch((error) => {
      console.error(error);
    });
};

const removeBooking = ($id) => {
  const formdata = new FormData();
  formdata.append("booking_id", $id);

  fetch("http://localhost/flights-system-website/backend/adminDeletebooking.php", {
    method: "POST",
    body: formdata,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      GetBookings();
    })
    .catch((error) => {
      console.error(error);
    });
};

GetBookings();

if (!localStorage.getItem('isAdmin'))
  window.location.href = '../pages/login.html';
