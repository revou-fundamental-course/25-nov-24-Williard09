const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const resultCard = document.querySelector('.result-card');
    const bmiResult = document.querySelector('.bmi-result');
    const recommendationSection = document.getElementById('recommendationSection');
    
    function hitungBMI(berat, tinggi) {
        const tinggiMeter = tinggi / 100;
        const bmi = berat / (tinggiMeter * tinggiMeter);
        return bmi.toFixed(1);
    }
    
    function getStatusBMI(bmi) {
        // Hide all recommendations first
        document.querySelectorAll('.health-recommendation, .normal-recommendation').forEach(card => 
            card.classList.add('hiddenRecomendation'));
        
        const bmiValue = parseFloat(bmi);
        let result;

        if (bmiValue < 18.5) {
            result = {
                status: "Berat Badan Kurang",
                description: "Anda kekurangan berat badan",
                explanation: "Anda berada dalam kategori kekurangan berat badan. " +
                           "Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang " +
                           "baik untuk meningkatkan kesehatan.",
                color: "red"
            };
            // Show health recommendations for underweight
            document.querySelectorAll('.health-recommendation').forEach(card => 
                card.classList.remove('hiddenRecomendation'));
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            result = {
                status: "Normal (Ideal)",
                description: "Anda memiliki berat badan ideal",
                explanation: "Anda berada dalam kategori berat badan yang normal. " +
                           "Pertahankan pola makan dan gaya hidup sehat Anda.",
                color: "green"
            };
            // Show normal recommendations for ideal weight
            document.querySelectorAll('.normal-recommendation').forEach(card => 
                card.classList.remove('hiddenRecomendation'));
        } else if (bmiValue >= 25.0 && bmiValue <= 29.9) {
            result = {
                status: "Kelebihan Berat Badan",
                description: "Anda memiliki berat badan berlebih",
                explanation: "Anda berada dalam kategori kelebihan berat badan. " +
                           "Hubungi dokter untuk mendapatkan saran mengenai pola makan " +
                           "dan gaya hidup yang lebih sehat.",
                color: "red"
            };
            // Show health recommendations for overweight
            document.querySelectorAll('.health-recommendation').forEach(card => 
                card.classList.remove('hiddenRecomendation'));
        } else {
            result = {
                status: "Obesitas",
                description: "Anda berada dalam kategori obesitas",
                explanation: "Anda berada dalam kategori obesitas. Segera konsultasikan " +
                           "dengan dokter mengenai rencana penurunan berat badan yang sehat.",
                color: "red"
            };
            // Show health recommendations for obese
            document.querySelectorAll('.health-recommendation').forEach(card => 
                card.classList.remove('hiddenRecomendation'));
        }

        // Show recommendation section
        recommendationSection.classList.remove('hiddenRecomendation');
        return result;
    }
    
    function updateResult(bmi, statusInfo) {
        bmiResult.innerHTML = `
            <h3>${statusInfo.status}</h3>
            <div class="bmi-score" style="color: ${statusInfo.color};">${bmi}</div>
            <p class="bmi-description">${statusInfo.description}</p>
            <button class="btn btn-download" onclick="window.print()">Download Hasil BMI</button>
        `;
        
        const bmiExplanation = document.querySelector('.bmi-explanation');
        bmiExplanation.innerHTML = `
            <p>Hasil BMI = ${bmi}</p>
            <p>${statusInfo.explanation}</p>
        `;
        
        resultCard.style.display = 'block';
    }
    
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const berat = parseFloat(document.getElementById('berat').value);
        const tinggi = parseFloat(document.getElementById('tinggi').value);
        
        const bmi = hitungBMI(berat, tinggi);
        const statusInfo = getStatusBMI(bmi);
        updateResult(bmi, statusInfo);
    });
    
    bmiForm.addEventListener('reset', function() {
        resultCard.style.display = 'none';
        recommendationSection.classList.add('hiddenRecomendation');
        document.querySelectorAll('.health-recommendation, .normal-recommendation').forEach(card => 
            card.classList.add('hiddenRecomendation'));
    });
});