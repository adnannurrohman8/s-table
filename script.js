function handleDistChange() {
    const dist = document.getElementById('distType').value;
    const elAlpha = document.getElementById('container-alpha');
    const elDf = document.getElementById('container-df');
    const elTail = document.getElementById('container-tail');
    const elBtn = document.getElementById('container-btn');
    const elResult = document.getElementById('resultArea');

    // Reset area hasil setiap kali pengguna mengganti jenis distribusi
    elResult.classList.add('hidden');
    
    if (dist === 'z') {
        showElement(elAlpha);
        hideElement(elDf); // Sembunyikan DF untuk Z-Table
        showElement(elTail);
        showElement(elBtn);
    } else if (dist === 't') {
        showElement(elAlpha);
        showElement(elDf); // Tampilkan DF untuk T-Table
        showElement(elTail);
        showElement(elBtn);
    }
}

// Fungsi pembantu untuk animasi memunculkan elemen
function showElement(el) {
    el.classList.remove('hidden');
    setTimeout(() => el.classList.remove('opacity-0'), 50);
}

// Fungsi pembantu untuk animasi menyembunyikan elemen
function hideElement(el) {
    el.classList.add('opacity-0');
    setTimeout(() => el.classList.add('hidden'), 300);
}

// Fungsi utama untuk memproses perhitungan jStat
function calculateValue() {
    const dist = document.getElementById('distType').value;
    const alpha = parseFloat(document.getElementById('alpha').value);
    const tail = document.getElementById('tail').value;
    
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

    // Reset gaya visual area hasil ke kondisi normal
    resultArea.classList.remove('hidden', 'bg-red-100');
    resultText.classList.remove('text-red-600');
    resultArea.classList.add('bg-gray-100');
    resultText.classList.add('text-[#800000]');

    // Validasi input awal
    if (!alpha || alpha <= 0 || alpha >= 1) {
        showError("Masukkan nilai Alpha yang valid (antara 0 dan 1).");
        return;
    }
    if (!tail) {
        showError("Silakan pilih jenis uji (Tail).");
        return;
    }

    let resultValue = 0;
    // Penyesuaian perhitungan porsi alpha untuk uji dua arah
    let calcAlpha = (tail === 'two') ? alpha / 2 : alpha;

    try {
        if (dist === 'z') {
            // Kalkulasi fungsi invers Normal Standar (Z)
            let zVal = jStat.normal.inv(1 - calcAlpha, 0, 1);
            resultValue = formatOutput(zVal, tail);
            
        } else if (dist === 't') {
            // Kalkulasi fungsi invers Student's t
            const df = parseFloat(document.getElementById('df').value);
            if (!df || df <= 0) {
                showError("Masukkan nilai df yang valid (> 0).");
                return;
            }
            let tVal = jStat.studentt.inv(1 - calcAlpha, df);
            resultValue = formatOutput(tVal, tail);
        }

        resultText.innerHTML = resultValue;

    } catch (error) {
        showError("Terjadi kesalahan komputasi.");
    }
}

// Fungsi untuk memformat tampilan angka dan penambahan simbol plus-minus
function formatOutput(val, tailType) {
    let fixedVal = val.toFixed(4); 
    if (tailType === 'two') {
        return `&plusmn; ${fixedVal}`;
    } else if (tailType === 'left') {
        return `-${fixedVal}`;
    } else { 
        return fixedVal;
    }
}

// Fungsi untuk menampilkan pesan peringatan error
function showError(msg) {
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');
    
    resultArea.classList.remove('bg-gray-100');
    resultText.classList.remove('text-[#800000]');
    
    resultArea.classList.add('bg-red-100');
    resultText.classList.add('text-red-600');
    resultText.innerHTML = `<span class="text-xl">${msg}</span>`;
}
