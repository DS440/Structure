const btn = document.querySelector('#btn');

btn.onclick = function(){
    const userInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    
    const uname = userInput.value;
    const pword = passwordInput.value;

    userInput.value = "";
    passwordInput.value = "";

    fetch("/index.html", {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username: uname,
            password: pword
        })
    })
    .then(response => response.json())
    .then(data => parseData(data));
};

