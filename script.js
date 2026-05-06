function checkFraud() {

    let amount = document.getElementById("amount").value;

    let location = document.getElementById("location").value;

    let paymentMethod = document.getElementById("paymentMethod").value;

    let time = document.getElementById("time").value;

    let result = document.getElementById("result");

    let riskLevel = document.getElementById("riskLevel");


    if (
        amount > 50000 ||
        location.toLowerCase() === "unknown" ||
        (time >= "00:00" && time <= "04:00")
    ) {

        result.innerHTML = "⚠️ Suspicious Transaction";
        result.style.color = "red";

        riskLevel.innerHTML = "🔴 High Risk";
        riskLevel.style.color = "red";
    }

    else if (amount > 10000) {

        result.innerHTML = "⚠️ Monitor Transaction";
        result.style.color = "orange";

        riskLevel.innerHTML = "🟡 Medium Risk";
        riskLevel.style.color = "orange";
    }

    else {

        result.innerHTML = "✅ Safe Transaction";
        result.style.color = "green";

        riskLevel.innerHTML = "🟢 Low Risk";
        riskLevel.style.color = "green";
    }
}