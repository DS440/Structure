const btn = document.querySelector('#btn');

btn.onclick = function(){
    const firstnameInput = document.querySelector('#firstname');
    const lastnameInput = document.querySelector('#lastname');
    const emailInput = document.querySelector("#email");
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    firstnameInput.value = "";
    lastnameInput.value = "";
    emailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";

    fetch("http://localhost:5500/register", {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data['success']) {
            alert('Registration Succeed!');
        }
    });
};