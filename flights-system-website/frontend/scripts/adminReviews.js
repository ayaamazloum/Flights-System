let coinRequestContainer = document.getElementById("review-container");

const generateReviewcard = (element) => {
  const { name, rating, airline, review } = element;
  return `<tr>
                <td>${name}</td>
                <td>${rating}</td>
                <td>${airline}</td>
                <td>${review}</td>
                </tr> `;
};

const GetReviews = () => {
  fetch("http://localhost/flights-system-website/backend/adminGetReview.php",
   {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const reviews = data["review"];
      coinRequestContainer.innerHTML = "";
      reviews.forEach((element) => {
        coinRequestContainer.innerHTML += generateReviewcard(element);
      });
    });
};
GetReviews();




if (!localStorage.getItem('isAdmin'))
    window.location.href = '../pages/login.html';