const chatContainer = document.getElementById("chat-container");

const generateRequestcard = (element) => {
  const { id, name, text } = element;
  return `<div class="coin-card flex column">
        <div class="coin-details flex row"><p>Name:</p><P>${name}</P></div>
        <div class="coin-details flex row"><p>Text:</p><P>${text}</P></div>
        <div class="coin-details flex row"><p>Reply:</p><input id="replytext" type="text" placeholder="Enter your reply"></div>
        <div class="flex center" id="${parseInt(
          id
        )}"><input class="adminBtn ReplyBtn" type="submit" value="Reply" /> 
    </div>
</div> `;
};

const GetChat = () => {
  fetch("http://localhost/flights-system-website/backend/adminGetChat.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const chats = data["chats"];
      chatContainer.innerHTML = "";
      chats.forEach((element) => {
        chatContainer.innerHTML += generateRequestcard(element);
      });

      const replychat = document.querySelectorAll(".ReplyBtn");
      const replyText = document.getElementById("replytext");
      replychat.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.parentElement.id;
          messageReply(id,replyText.value);
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const messageReply = ($id, $reply) => {
  const formdata = new FormData();
  formdata.append("message_id", $id);
  formdata.append("adminResponse", $reply);

  fetch(
    "http://localhost/flights-system-website/backend/adminMessagesReply.php",
    {
      method: "POST",
      body: formdata,
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      GetChat();
    })
    .catch((error) => {
      console.error(error);
    });
};

GetChat();

if (!localStorage.getItem('isAdmin'))
  window.location.href = '../pages/login.html';
