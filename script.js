function checkFraud() {

    let amount = document.getElementById("amount").value;

    let location = document.getElementById("location").value;

    let paymentMethod = document.getElementById("paymentMethod").value;

    let time = document.getElementById("time").value;

    let result = document.getElementById("result");

    let riskLevel = document.getElementById("riskLevel");

    let score = document.getElementById("score");

    let progressBar = document.getElementById("progress-bar");


    // HIGH RISK
    if (
        amount > 50000 ||
        location.toLowerCase() === "unknown" ||
        (time >= "00:00" && time <= "04:00")
    ) {

        result.innerHTML = "⚠️ Suspicious Transaction";
        result.style.color = "red";

        riskLevel.innerHTML = "🔴 High Risk";
        riskLevel.style.color = "red";

        score.innerHTML = "Fraud Score: 90%";
        score.style.color = "red";

        progressBar.style.width = "90%";
        progressBar.style.backgroundColor = "red";
    }


    // MEDIUM RISK
    else if (amount > 10000) {

        result.innerHTML = "⚠️ Monitor Transaction";
        result.style.color = "orange";

        riskLevel.innerHTML = "🟡 Medium Risk";
        riskLevel.style.color = "orange";

        score.innerHTML = "Fraud Score: 55%";
        score.style.color = "orange";

        progressBar.style.width = "55%";
        progressBar.style.backgroundColor = "orange";
    }


    // LOW RISK
    else {

        result.innerHTML = "✅ Safe Transaction";
        result.style.color = "green";

        riskLevel.innerHTML = "🟢 Low Risk";
        riskLevel.style.color = "green";

        score.innerHTML = "Fraud Score: 10%";
        score.style.color = "green";

        progressBar.style.width = "10%";
        progressBar.style.backgroundColor = "green";
    }
}