const coinRequestContainer = document.getElementById("coin-requests-container");

const generateRequestcard = (element) => {
  const { id, name, email, amount } = element;
  return `<div class="coin-card flex column">
                <div class="coin-details flex row"><p>Name:</p><P>${name}</P></div>
                <div class="coin-details flex row"><p>Email:</p><P>${email}</P></div>
                <div class="coin-details flex row"><p>Amount requested:</p><P id="amountRequested">${amount}</P></div>
                <div class="card-details flex row" id="${parseInt(
                  id
                )}"><button class="acceptBtn">Accept</button>  <button class="declineBtn">Decline</button>  </div>
                </div> `;
};

const GetCoinRequests = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminGetCoinRequests.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const coinRequests = data["coins"];
      coinRequestContainer.innerHTML = "";
      coinRequests.forEach((element) => {
        coinRequestContainer.innerHTML += generateRequestcard(element);
      });
      const acceptBtn = document.querySelectorAll(".acceptBtn");
      const declineBtn = document.querySelectorAll(".declineBtn");

      const amountRequested = document.getElementById("amountRequested");

      acceptBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.parentElement.id;
          let amount = parseInt(amountRequested.textContent);
          CoinRequest(id, amount, 1);
        });
      });

      declineBtn.forEach((btnn) => {
        btnn.addEventListener("click", () => {
          const id = btnn.parentElement.id;
          CoinRequest(id, 0, 0);
        });
      });

    })
    
    .catch((error) => {
      console.error(error);
    });
};

const CoinRequest = ($id, $amount, $status) => {
  const formdata = new FormData();
  formdata.append("coinRequest_id", $id);
  formdata.append("requestedValue", $amount);
  formdata.append("status", $status);

  fetch(
    "http://localhost/flights-system-website/backend/adminCoinRequestsReply.php",
    {
      method: "POST",
      body: formdata,
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      GetCoinRequests();
    })
    .catch((error) => {
      console.error(error);
    });
};

GetCoinRequests();

if (!localStorage.getItem('isAdmin'))
  window.location.href = '../pages/login.html';
