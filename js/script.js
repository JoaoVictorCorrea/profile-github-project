var usersHistory = [];

function search() {

    var username = document.getElementById("inputUserName").value;
    var url = `https://api.github.com/users/${username}`;
    
    $.getJSON(url, (user) => {

        showUserData(user);

        if (isNew(user)) {
            save(user);
            showNewUserHistory(user);
        }

        clearError();

    }).fail(() => {

        showUserData({});
        showError("Não Encontrado!");
    });
}

function showUserData(user) {
    document.getElementById("name").innerHTML = user.name || "";
    document.getElementById("html_url").innerHTML = user.html_url || "";
    document.getElementById("company").innerHTML = user.company || "";

    document.getElementById("avatar_url").innerHTML = user.avatar_url ? `
    <img src="${user.avatar_url}" width="220" height="220" class="shadow rounded">` : "";
}

function showError(msg) {
    document.getElementById("error").innerHTML = `<div class='alert alert-danger mt-1' role='alert'>${msg}</div>`;
}

function clearError() {
    document.getElementById("error").innerHTML = "";
}

function showNewUserHistory(user) {
    document.getElementById("history").innerHTML += `
        <div class="col">
            <img id="avatar_url" src="${user.avatar_url}" width="110" height="110" class="shadow rounded">
        </div>`
}

function isNew(user) {
    return usersHistory.filter((u) => u.login == user.login).length == 0;
}

function save(user) {
    usersHistory.push(user);
}