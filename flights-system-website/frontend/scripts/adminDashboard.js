const totalBookings = document.getElementById("total-Bookings");
const numberUsers = document.getElementById("num-users");
const numberPlanes = document.getElementById("num-planes");
const revenue = document.getElementById("revenue");

// function to load the html tags 
const dashboardResults = (tag, number) => {
  tag.innerHTML = number;
};
// function calling the API to get the number of bookings
const getTotalBookings = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminTotalBookings.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      dashboardResults(totalBookings, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

// function calling the API to get the number of users
const getTotalUsers = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminTotalUsers.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      dashboardResults(numberUsers, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

// function calling the API to get the number of planes
const getTotalPlanes = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminTotalPlanes.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      dashboardResults(numberPlanes, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

// function calling the API to get the revenue
const getRevenue = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminTotalRevenue.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      dashboardResults(revenue, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

getTotalBookings();
getTotalUsers();
getTotalPlanes();
getRevenue();


if (!localStorage.getItem('isAdmin'))
    window.location.href = '../pages/login.html';