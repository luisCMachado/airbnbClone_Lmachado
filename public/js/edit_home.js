document.getElementById('editHome_form').onsubmit = (event) => {
    event.preventDefault()
    fetch(`/rooms/${home_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                '_id': home_id,
                'title': $('#home_title').val(),
                'beds': $('#home_beds').val(),
                'price': $('#home_price').val(),
                'stars': $('#home_stars').val(),
                'img': $('#home_img').val(),
                'description': $('#home_description').val()
            })
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data.redirect) window.location.href = data.redirect;
        })
}