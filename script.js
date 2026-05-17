let currentLatitude = "";
let currentLongitude = "";
let mediumRiskCount = 0;
let totalTransactions = 0;
let highRiskTransactions = 0;
let safeTransactions = 0;
let safeCount = 0;

// SPEAK MESSAGE
function speakMessage(message) {
    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// LOAD SAVED HISTORY
window.onload = function () {
    let savedHistory = localStorage.getItem("fraudHistory");
    if (savedHistory) {
        document.getElementById("historyBody").innerHTML = savedHistory;
    }
    updateChart();
};

// TOGGLE PAYMENT FIELDS
function togglePaymentFields() {
    let method = document.getElementById("paymentMethod").value;
    document.getElementById("upiField").classList.add("hidden");
    document.getElementById("cardField").classList.add("hidden");
    document.getElementById("walletField").classList.add("hidden");
    document.getElementById("netBankingField").classList.add("hidden");

    if (method === "UPI") {
        document.getElementById("upiField").classList.remove("hidden");
    } else if (method === "Card") {
        document.getElementById("cardField").classList.remove("hidden");
    } else if (method === "Wallet") {
        document.getElementById("walletField").classList.remove("hidden");
    } else if (method === "Net Banking") {
        document.getElementById("netBankingField").classList.remove("hidden");
    }
}

// AI LOG SIMULATION
function addAiLog(msg, type) {
    let terminal = document.getElementById("aiLogTerminal");
    if(!terminal) return;
    let entry = document.createElement("div");
    entry.className = "log-entry " + type;
    
    let now = new Date();
    let timeStr = now.toLocaleTimeString([], { hour12: false });
    
    entry.innerHTML = `[${timeStr}] ${msg}`;
    terminal.appendChild(entry);
    terminal.scrollTop = terminal.scrollHeight;
}

setInterval(() => {
    let events = [
        "Scanning network traffic...",
        "Validating IP routing...",
        "Checking behavioral biometrics...",
        "Cross-referencing global blacklists...",
        "Analyzing packet headers..."
    ];
    let msg = "> SYSTEM: " + events[Math.floor(Math.random() * events.length)];
    addAiLog(msg, "neutral-log");
}, 4500);

// MAIN FRAUD CHECK FUNCTION
function checkFraud() {
    let scannerText = document.getElementById("scannerText");
    let amount = Number(document.getElementById("amount").value);
    let location = document.getElementById("location").value;
    let paymentMethod = document.getElementById("paymentMethod").value;
    let time = document.getElementById("time").value;
    
    // New Fields
    let fullName = document.getElementById("fullName") ? document.getElementById("fullName").value : "";
    let upiId = document.getElementById("upiId") ? document.getElementById("upiId").value : "";

    let result = document.getElementById("result");
    let riskLevel = document.getElementById("riskLevel");
    let score = document.getElementById("score");
    let transactionId = document.getElementById("transactionId");
    let historyBody = document.getElementById("historyBody");
    let reason = document.getElementById("reason");
    let progressBar = document.getElementById("progress-bar");
    let locationAlert = document.getElementById("locationAlert");
    let aiRecommendation = document.getElementById("aiRecommendation");
    
    // New Badges
    let securityStatus = document.getElementById("securityStatus");
    let scanStatus = document.getElementById("scanStatus");

    // RESET OLD DATA
    result.innerHTML = "";
    riskLevel.innerHTML = "";
    score.innerHTML = "";
    transactionId.innerHTML = "";
    reason.innerHTML = "";
    if(securityStatus) { securityStatus.className = "badge hidden"; securityStatus.innerHTML = ""; }
    if(scanStatus) { scanStatus.className = "badge warning"; scanStatus.innerHTML = "Scanning..."; }
    
    addAiLog(`Initiating scan for transaction by ${fullName || 'Unknown'} for ₹${amount}...`, "warn-log");

    // AI SCANNING EFFECT
    scannerText.innerHTML = "🔍 AI Scanning Transaction...";
    scannerText.style.color = "#00bfff";

    setTimeout(() => {
        let randomId = Math.floor(Math.random() * 100000);
        transactionId.innerHTML = "Transaction ID: TXN" + randomId;

        let blacklistedLocations = ["pakistan", "russia", "darkweb", "unknown", "remote"];
        
        let isSuspiciousUpi = false;
        if(paymentMethod === "UPI" && upiId) {
            if(upiId.includes("spam") || upiId.includes("test") || upiId.length > 20 || /^[a-zA-Z0-9]{15,}@/.test(upiId)) {
                isSuspiciousUpi = true;
            }
        }
        
        let anomalyScore = Math.floor(Math.random() * 100);

        // INVALID INPUT
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
            if(scanStatus) { scanStatus.className = "badge hidden"; }
            addAiLog(`Scan failed: Invalid amount entered.`, "danger-log");
        }
        // HIGH RISK
        else if (
            amount > 50000 ||
            blacklistedLocations.includes(location.toLowerCase()) ||
            (time >= "00:00" && time <= "04:00") ||
            isSuspiciousUpi ||
            anomalyScore > 85
        ) {
            result.innerHTML = "⚠️ Suspicious Transaction";
            result.style.color = "red";
            riskLevel.style.border = "1px solid red";
            riskLevel.style.boxShadow = "0 0 10px red";
            riskLevel.innerHTML = "🔴 High Risk";
            riskLevel.style.color = "red";
            score.innerHTML = `Fraud Score: ${Math.max(90, anomalyScore)}%`;
            score.style.color = "red";

            let reasonText = "Reason: High Amount / Late Night Transaction";
            if(isSuspiciousUpi) reasonText = "Reason: Suspicious UPI Pattern Detected";
            if(blacklistedLocations.includes(location.toLowerCase())) reasonText = "Reason: Blacklisted Location";
            if(anomalyScore > 85 && !isSuspiciousUpi) reasonText = "Reason: High Anomaly Score Detected";
            
            reason.innerHTML = reasonText;
            reason.style.color = "red";

            if(aiRecommendation) {
                aiRecommendation.innerHTML = "⚠️ AI Recommendation: Block transaction immediately and verify identity.";
                aiRecommendation.style.color = "red";
            }

            // LOCATION MISMATCH
            if (location.toLowerCase().includes("pune") && currentLatitude.toFixed(0) != 18) {
                reason.innerHTML += " / Location Mismatch Detected";
            }

            speakMessage("Warning! Suspicious Transaction Detected");

            progressBar.style.width = "90%";
            progressBar.style.backgroundColor = "red";

            totalTransactions++;
            highRiskTransactions++;
            highRiskCount++;

            document.getElementById("totalTransactions").innerHTML = totalTransactions;
            document.getElementById("highRiskCount").innerHTML = highRiskTransactions;

            // ALERT BOX
            let alertBox = document.getElementById("alertBox");
            if(alertBox) {
                alertBox.style.display = "block";
                setTimeout(() => { alertBox.style.display = "none"; }, 3000);
            }

            let fraudAlert = document.getElementById("fraudAlert");
            if(fraudAlert) {
                fraudAlert.style.display = "block";
                setTimeout(() => { fraudAlert.style.display = "none"; }, 3000);
            }
            
            if(securityStatus) { securityStatus.innerHTML = "Threat Blocked"; securityStatus.className = "badge danger"; }
            if(scanStatus) { scanStatus.innerHTML = "Scan Complete"; scanStatus.className = "badge safe"; }
            
            addAiLog(`High Risk Transaction blocked. Amount: ₹${amount}, Reason: ${reasonText}`, "danger-log");

            // HISTORY
            historyBody.innerHTML += `<tr><td>${amount}</td><td>${location}</td><td style="color:red;">High Risk</td></tr>`;
        }
        // MEDIUM RISK
        else if (amount > 10000 || anomalyScore > 50) {
            result.innerHTML = "⚠️ Monitor Transaction";
            result.style.color = "orange";
            riskLevel.innerHTML = "🟡 Medium Risk";
            riskLevel.style.color = "orange";
            riskLevel.style.border = "1px solid orange";
            riskLevel.style.boxShadow = "0 0 10px orange";
            score.innerHTML = `Fraud Score: ${Math.max(55, anomalyScore)}%`;
            score.style.color = "orange";
            reason.innerHTML = "Reason: Medium Transaction Amount / Moderate Anomaly";
            reason.style.color = "orange";

            speakMessage("Monitor this transaction carefully");
            let alarm = document.getElementById("alarmSound");
            if(alarm) alarm.play();
            speakMessage("Warning! Suspicious Transaction Detected");

            progressBar.style.width = "55%";
            progressBar.style.backgroundColor = "orange";

            totalTransactions++;
            mediumRiskCount++;

            document.getElementById("totalTransactions").innerHTML = totalTransactions;

            if(aiRecommendation) {
                aiRecommendation.innerHTML = "⚠️ AI Recommendation: Monitor this transaction carefully.";
                aiRecommendation.style.color = "orange";
            }
            
            if(securityStatus) { securityStatus.innerHTML = "Verification Required"; securityStatus.className = "badge warning"; }
            if(scanStatus) { scanStatus.innerHTML = "Scan Complete"; scanStatus.className = "badge safe"; }
            
            addAiLog(`Medium Risk detected. Verification required for ₹${amount}.`, "warn-log");

            historyBody.innerHTML += `<tr><td>${amount}</td><td>${location}</td><td style="color:orange;">Medium Risk</td></tr>`;
        }
        // LOW RISK
        else {
            result.innerHTML = "✅ Safe Transaction";
            result.style.color = "green";
            riskLevel.innerHTML = "🟢 Low Risk";
            riskLevel.style.color = "green";
            riskLevel.style.border = "1px solid lime";
            riskLevel.style.boxShadow = "0 0 10px lime";
            score.innerHTML = `Fraud Score: ${Math.max(10, anomalyScore)}%`;
            score.style.color = "green";
            reason.innerHTML = "Reason: Normal Safe Activity";
            reason.style.color = "green";

            speakMessage("Safe transaction detected");

            progressBar.style.width = "10%";
            progressBar.style.backgroundColor = "green";

            totalTransactions++;
            safeTransactions++;
            safeCount++;

            document.getElementById("totalTransactions").innerHTML = totalTransactions;
            document.getElementById("safeCount").innerHTML = safeTransactions;

            if(aiRecommendation) {
                aiRecommendation.innerHTML = "✅ AI Recommendation: Transaction appears legitimate.";
                aiRecommendation.style.color = "lime";
            }
            
            if(securityStatus) { securityStatus.innerHTML = "Secured"; securityStatus.className = "badge safe"; }
            if(scanStatus) { scanStatus.innerHTML = "Scan Complete"; scanStatus.className = "badge safe"; }
            
            addAiLog(`Transaction cleared. Status: Safe.`, "safe-log");

            historyBody.innerHTML += `<tr><td>${amount}</td><td>${location}</td><td style="color:green;">Low Risk</td></tr>`;
        }

        // SAVE HISTORY
        localStorage.setItem("fraudHistory", historyBody.innerHTML);

        // UPDATE PIE CHART
        updateChart();

        // SCAN COMPLETE
        scannerText.innerHTML = "✅ Scan Complete";
        scannerText.style.color = "lime";

        // CLEAR INPUTS
        document.getElementById("amount").value = "";
        document.getElementById("location").value = "";
        document.getElementById("paymentMethod").value = "";
        document.getElementById("time").value = "";
        togglePaymentFields(); // reset dynamic fields
        
        if(document.getElementById("fullName")) document.getElementById("fullName").value = "";
        if(document.getElementById("email")) document.getElementById("email").value = "";
        if(document.getElementById("phone")) document.getElementById("phone").value = "";
        if(document.getElementById("receiverName")) document.getElementById("receiverName").value = "";
        if(document.getElementById("upiId")) document.getElementById("upiId").value = "";
        if(document.getElementById("cardNumber")) document.getElementById("cardNumber").value = "";
        if(document.getElementById("walletNumber")) document.getElementById("walletNumber").value = "";
        if(document.getElementById("bankAccount")) document.getElementById("bankAccount").value = "";

    }, 2000);
}

// DOWNLOAD REPORT
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

// DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

// LIVE DATE & TIME
function updateDateTime() {
    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();
    let dtEl = document.getElementById("liveDateTime");
    if(dtEl) {
        dtEl.innerHTML = "📅 " + date + " | ⏰ " + time;
    }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// CLEAR HISTORY
function clearHistory() {
    let historyBody = document.getElementById("historyBody");
    if(historyBody) historyBody.innerHTML = "";
    localStorage.removeItem("fraudHistory");
    addAiLog("Transaction history cleared by user.", "warn-log");
}

// PIE CHART
const ctx = document.getElementById("fraudChart").getContext("2d");
let fraudChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["High Risk", "Medium Risk", "Safe"],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: ["red", "orange", "green"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// UPDATE CHART
function updateChart() {
    fraudChart.data.datasets[0].data = [highRiskCount, mediumRiskCount, safeCount];
    fraudChart.update();
}

function getLocation() {
    let liveLocation = document.getElementById("liveLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;
                liveLocation.innerHTML = "📍 Live Location Coordinates: " + currentLatitude.toFixed(2) + ", " + currentLongitude.toFixed(2);
                addAiLog(`Live location detected: ${currentLatitude.toFixed(2)}, ${currentLongitude.toFixed(2)}`, "neutral-log");
            },
            function () {
                liveLocation.innerHTML = "❌ Location access denied";
            }
        );
    } else {
        liveLocation.innerHTML = "❌ Geolocation not supported";
    }
}