const chatInput = document.querySelector('#chat-input')
const sendButton = document.querySelector('#send-btn')
const chatContainer = document.querySelector('.chat-container')

let userText = null;
const oops = "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";

const createElement = (html, className) =>{
    //Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv; //Return the created chat div
}

const getChatResponse = async (incomingChatDiv) =>{
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${oops}`
        },
        body: JSON.stringify({
            model : "text-davinci-003",
            prompt : userText,
            max_tokens : 2048,
            temperature : 0.2,
            n : 1,
            stop : null
        })
    }
    // Send Post request to API, get response and set the reponse as paragraph element text
    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    }catch(error){
        console.log(error);
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}

const showTypingAnimation = () =>{
    const html =`<div class="chat-content">
    <div class="chat-details">
        <img src="img/chatbot.jpg" alt="chatbot-img">
        <div class="typing-animation">
            <div class="typing-dot" style="--delay: 0.2s"></div>
            <div class="typing-dot" style="--delay: 0.3s"></div>
            <div class="typing-dot" style="--delay: 0.4s"></div>
        </div>
    </div>
    <span class="material-symbols-rounded">content_copy</span>
    </div>`

    //Create an incoming chat div with user's message and append it to chat container
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () =>{
    userText = chatInput.value.trim(); //Get chatinput value and remove extra spaces
    const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="img/user.jpg" alt="user-img">
        <p>${userText}</p>
    </div>
</div>`;

// Create an outgoing chat div with user's message and append it to chat container
const outgoingChatDiv = createElement(html, "outgoing");
chatContainer.appendChild(outgoingChatDiv);
setTimeout(showTypingAnimation, 500);
}

sendButton.addEventListener("click", handleOutgoingChat);