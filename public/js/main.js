(() => {
    const socket = io(); // connection to the browser window

    let messageList = document.querySelector('ul'),
            chatForm = document.querySelector('form'),
            nameInput = document.querySelector('.nickname'),
            chatMessage = document.querySelector('.message'),
            nickName = null;

    function setNickname() {
        //debugger;
        nickName = this.value;
    }

    function handleSendMessage(e) { //E is the event object that gets created, this is the submit button.
        e.preventDefault(); //Stops the default behavior - a submit or page reload
        //debugger;

        nickName = (nickName && nickName.length > 0) ? nickName : 'user';

        //takes text from the input field at the bottom
        msg = `<span class="userMessageLabel">${nickName} says:</span> ${chatMessage.value}`;

        //emit a chat event which passes to the server (and everyone else)
        socket.emit('chat message', msg);
        chatMessage.value = '';
        return false;
    }

    function appendMessage(msg) {
        //  debugger;
        let newMsg = `<li>${msg.message}</li>`
        messageList.innerHTML += newMsg;
    }

    function appendDMessage(msg) {
        //debugger;
        let newMsg = `<li class="dmessage">${msg}</li>`
        messageList.innerHTML += newMsg;
    }

    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDMessage, false);
})();
