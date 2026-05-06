function checkFraud() {

    let amount = document.getElementById("amount").value;

    let location = document.getElementById("location").value;

    let result = document.getElementById("result");


    if (amount > 50000 || location.toLowerCase() === "unknown") {

        result.innerHTML = "⚠️ Suspicious Transaction";

        result.style.color = "red";

    }

    else {

        result.innerHTML = "✅ Safe Transaction";

        result.style.color = "green";
    }
}