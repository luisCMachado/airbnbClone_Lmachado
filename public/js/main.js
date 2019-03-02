window.onload = () => {
    if (navColor === 'black') icon.style.color = '#fd5c63';
    for (let i = 0; i < color.length; i++) {
        color[i].style.color = navColor;
    }

    document.getElementById('login_form').onsubmit = (event) => {
        event.preventDefault()
        fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': $('#login_username').val(),
                    'password': $('#login_password').val()
                })
            })
            .then(function (res) {
                if (res.status === 401) {
                    $('.alert').remove()
                    return $('.modal-body').append(`<div class="modal-footer alert alert-danger justify-content-center">
                        <a href="#">Incorrect username or password</a>
                    </div>`);
                }
                return res.json();
            })
            .then(function (data) {
                if (data.redirect) window.location.href = data.redirect;
            })
    }

    document.getElementById('signup_form').onsubmit = (event) => {
        event.preventDefault()
        fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': $('#signup_username').val(),
                    'password': $('#signup_password').val()
                })
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (data.status !== 'ok') {
                    $('.alert').remove()
                    return $('.modal-body').append(`<div class="modal-footer alert alert-danger justify-content-center">
                        <a href="#">Username allready registered</a>
                    </div>`);
                }
                if (data.redirect) window.location.href = data.redirect;
            })
    }

}