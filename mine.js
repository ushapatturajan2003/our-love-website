const passwordInput = document.getElementById("password");
const enterBtn = document.getElementById("enterBtn");
const errorMessage = document.getElementById("errorMessage");

/* =================================
PASSWORD PAGE
================================= */

if (passwordInput && enterBtn) {


enterBtn.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


}

function checkPassword() {


const password = passwordInput.value;

if (password === "9803") {

    errorMessage.textContent = "";

    window.location.href = "love2.html";

} else {

    errorMessage.textContent =
        "Hmm... that's not our secret password ♡";

    passwordInput.value = "";

    passwordInput.focus();

}


}

/* =================================
DO YOU LOVE ME?
================================= */

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");


/* =================================
NO BUTTON
================================= */

if (noButton) {

noButton.addEventListener("touchstart", function(event) {

    event.preventDefault();

    noButton.style.display = "none";

});

noButton.addEventListener("click", function(event) {

    event.preventDefault();

    noButton.style.display = "none";

});

}

/* =================================
YES BUTTON
================================= */

if (yesButton) {

yesButton.addEventListener("click", function() {

    window.location.href = "yes.html";

});

}

function goToNextPage() {
window.location.href = "surprise.html";
}


const visitForm = document.getElementById("visitForm");

const nicknameButtons =
document.querySelectorAll(".nickname-btn");

const customNickname =
document.getElementById("customNickname");

let selectedNickname = "";

/* =================================
NICKNAME
================================= */

if (nicknameButtons.length > 0) {

nicknameButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        nicknameButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        const name = button.dataset.name;

        if (name === "other") {

            selectedNickname = "";

            customNickname.style.display = "block";

            customNickname.focus();

        } else {

            selectedNickname = name;

            customNickname.value = "";

            customNickname.style.display = "none";

        }

    });

});

}

/* =================================
CUSTOM NICKNAME
================================= */

if (customNickname) {

customNickname.addEventListener("input", function() {

    selectedNickname =
        customNickname.value.trim();

});

}

/* =================================
VISIT FORM
================================= */

if (visitForm) {

visitForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const visitDate =
        document.getElementById("visitDate").value;

    const visitTime =
        document.getElementById("visitTime").value;

    const travellingFrom =
        document.getElementById("travellingFrom").value.trim();

    const chennaiPlace =
        document.getElementById("chennaiPlace").value.trim();

    const visitMessage =
        document.getElementById("visitMessage");


    if (!selectedNickname) {

        visitMessage.textContent =
            "Tell me what you like me to call you ♡";

        return;

    }


    const visitData = {

        date: visitDate,

        time: visitTime,

        from: travellingFrom,

        destination: chennaiPlace,

        nickname: selectedNickname

    };


    localStorage.setItem(
        "visitDetails",
        JSON.stringify(visitData)
    );


    visitMessage.textContent =
        "Saving your little details... ♡";


    try {

        const response = await fetch(
"https://our-love-website-1.onrender.com/api/visit",
{
method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(visitData)
}

);


        const result = await response.json();


        if (response.ok) {

            visitMessage.textContent =
                "Everything is saved ♡";


            setTimeout(function() {

                window.location.href = "final.html";

            }, 1500);

        } else {

            visitMessage.textContent =
                result.message ||
                "Something went wrong ♡";

        }

    } catch (error) {

        console.error(error);

        visitMessage.textContent =
            "Please start the server and try again ♡";

    }

});

}