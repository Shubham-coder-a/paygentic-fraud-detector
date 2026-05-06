function checkFraud() {

    let amount = document.getElementById("amount").value;

    let location = document.getElementById("location").value;

    let paymentMethod = document.getElementById("paymentMethod").value;

    let time = document.getElementById("time").value;

    let result = document.getElementById("result");

    let riskLevel = document.getElementById("riskLevel");

    let score = document.getElementById("score");

    let transactionId = document.getElementById("transactionId");

    let historyBody = document.getElementById("historyBody");

    let reason = document.getElementById("reason");

    let progressBar = document.getElementById("progress-bar");

    let randomId = Math.floor(Math.random() * 100000);

    transactionId.innerHTML = "Transaction ID: TXN" + randomId;


    // INVALID AMOUNT
    if (amount <= 0) {

        result.innerHTML = "❌ Invalid Amount";
        result.style.color = "red";

        riskLevel.innerHTML = "🚫 Invalid Input";
        riskLevel.style.color = "red";

        score.innerHTML = "Fraud Score: 0%";
        score.style.color = "red";

        transactionId.innerHTML = "Transaction ID: INVALID";

        reason.innerHTML = "Reason: Amount cannot be 0 or negative";
        reason.style.color = "red";

        progressBar.style.width = "0%";

        return;
    }


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

        reason.innerHTML = "Reason: High Amount / Late Night Transaction";
        reason.style.color = "red";

        score.innerHTML = "Fraud Score: 90%";
        score.style.color = "red";

        progressBar.style.width = "90%";
        progressBar.style.backgroundColor = "red";
        
        historyBody.innerHTML += `
<tr>
    <td>${amount}</td>
    <td>${location}</td>
    <td style="color:red;">High Risk</td>
</tr>
`;
    }
    

    // MEDIUM RISK
    else if (amount > 10000) {

        result.innerHTML = "⚠️ Monitor Transaction";
        result.style.color = "orange";

        riskLevel.innerHTML = "🟡 Medium Risk";
        riskLevel.style.color = "orange";

        reason.innerHTML = "Reason: Medium Transaction Amount";
        reason.style.color = "orange";

        score.innerHTML = "Fraud Score: 55%";
        score.style.color = "orange";

        progressBar.style.width = "55%";
        progressBar.style.backgroundColor = "orange";
        historyBody.innerHTML += `
<tr>
    <td>${amount}</td>
    <td>${location}</td>
    <td style="color:orange;">Medium Risk</td>
</tr>
`;
    }

    // LOW RISK
    else {

        result.innerHTML = "✅ Safe Transaction";
        result.style.color = "green";

        riskLevel.innerHTML = "🟢 Low Risk";
        riskLevel.style.color = "green";

        reason.innerHTML = "Reason: Normal Safe Activity";
        reason.style.color = "green";

        score.innerHTML = "Fraud Score: 10%";
        score.style.color = "green";

        progressBar.style.width = "10%";
        progressBar.style.backgroundColor = "green";
        historyBody.innerHTML += `
<tr>
    <td>${amount}</td>
    <td>${location}</td>
    <td style="color:green;">Low Risk</td>
</tr>
`;
    }
}