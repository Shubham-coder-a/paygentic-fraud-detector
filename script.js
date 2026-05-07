function checkFraud() {

    let scannerText = document.getElementById("scannerText");

    let amount = Number(document.getElementById("amount").value);

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


    // RESET OLD DATA
    result.innerHTML = "";

    riskLevel.innerHTML = "";

    score.innerHTML = "";

    reason.innerHTML = "";

    transactionId.innerHTML = "";


    // SCANNING EFFECT
    scannerText.innerHTML = "🔍 AI Scanning Transaction...";

    scannerText.style.color = "#00bfff";


    setTimeout(() => {

        let randomId = Math.floor(Math.random() * 100000);

        transactionId.innerHTML = "Transaction ID: TXN" + randomId;


        let blacklistedLocations = [

            "pakistan",

            "russia",

            "darkweb",

            "unknown"

        ];


        // INVALID AMOUNT
        if (amount <= 0 || isNaN(amount)) {

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

            progressBar.style.backgroundColor = "gray";
        }


        // HIGH RISK
        else if (

            amount > 50000 ||

            blacklistedLocations.includes(location.toLowerCase()) ||

            (time >= "00:00" && time <= "04:00")

        ) {

            result.innerHTML = "⚠️ Suspicious Transaction";

            result.style.color = "red";


            riskLevel.innerHTML = "🔴 High Risk";

            riskLevel.style.color = "red";


            reason.innerHTML =
                "Reason: High Amount / Blacklisted Location / Late Night Transaction";

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


        // SCAN COMPLETE
        scannerText.innerHTML = "✅ Scan Complete";

        scannerText.style.color = "lime";


        // CLEAR INPUTS
        document.getElementById("amount").value = "";

        document.getElementById("location").value = "";

        document.getElementById("paymentMethod").value = "";

        document.getElementById("time").value = "";

    }, 2000);
}



function downloadReport() {

    let reportData = `

Paygentic Fraud Detector Report

--------------------------------

${document.getElementById("result").innerText}

${document.getElementById("riskLevel").innerText}

${document.getElementById("score").innerText}

${document.getElementById("transactionId").innerText}

${document.getElementById("reason").innerText}

--------------------------------

Generated by Paygentic Fraud Detector

`;


    let blob = new Blob([reportData], { type: "text/plain" });


    let link = document.createElement("a");


    link.href = URL.createObjectURL(blob);


    link.download = "fraud-report.txt";


    link.click();
}



function toggleMode() {

    document.body.classList.toggle("dark-mode");
}