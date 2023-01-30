const btn = document.querySelector('#btn');

btn.onclick = function(){
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    
    const email = emailInput.value;
    const password = passwordInput.value;

    emailInput.value = "";
    passwordInput.value = "";

    fetch("http://localhost:5500/login", {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => parseData(data));
};

function parseData(data) {
    if (data['success']) {
        const body = document.querySelector('#body');
        let firstname = data['firstname'];
        let lastname = data['lastname'];
        body.innerHTML = `<div> Welcome! ${firstname} ${lastname}. </div> \
                          <a href='index.html'>Back to Login</a>`
    } else {
        alert('Login failed.');
    }
}