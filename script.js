const distribution = document.getElementById("distribution");
const alpha = document.getElementById("alpha");
const dfContainer = document.getElementById("dfContainer");
const dfInput = document.getElementById("df");

const calculateButton = document.getElementById("calculate");

const result = document.getElementById("result");
const resultContent = document.getElementById("resultContent");


// ==========================================
// Tampilkan / sembunyikan input df
// ==========================================

distribution.addEventListener("change", function () {

    if (distribution.value === "t") {

        dfContainer.style.display = "flex";

    } else {

        dfContainer.style.display = "none";

    }

});


// ==========================================
// Fungsi menghitung nilai kritis
// ==========================================

calculateButton.addEventListener("click", function () {

    const dist = distribution.value;

    const a = parseFloat(alpha.value);

    const tail = document.getElementById("tail").value;


    // ======================================
    // DISTRIBUSI Z
    // ======================================

    if (dist === "z") {

        calculateZ(a, tail);

    }


    // ======================================
    // DISTRIBUSI T
    // ======================================

    else if (dist === "t") {

        const df = parseInt(dfInput.value);

        if (!df || df < 1) {

            showError("Masukkan nilai df yang valid.");

            return;

        }

        calculateT(a, df, tail);

    }

});


// ==========================================
// Perhitungan Z
// ==========================================

function calculateZ(alpha, tail) {

    let criticalValue;


    // Dua sisi
    if (tail === "two") {

        criticalValue =
            jStat.normal.inv(1 - alpha / 2, 0, 1);

        showResult({

            distribution: "Normal (Z)",

            alpha: alpha,

            df: "-",

            criticalValue: criticalValue,

            description:
                `Untuk pengujian dua sisi dengan α = ${alpha}, nilai Z kritis adalah ±${criticalValue.toFixed(4)}.`

        });

    }


    // Satu sisi kanan
    else if (tail === "right") {

        criticalValue =
            jStat.normal.inv(1 - alpha, 0, 1);

        showResult({

            distribution: "Normal (Z)",

            alpha: alpha,

            df: "-",

            criticalValue: criticalValue,

            description:
                `Untuk pengujian satu sisi kanan dengan α = ${alpha}, nilai Z kritis adalah ${criticalValue.toFixed(4)}.`

        });

    }


    // Satu sisi kiri
    else {

        criticalValue =
            jStat.normal.inv(alpha, 0, 1);

        showResult({

            distribution: "Normal (Z)",

            alpha: alpha,

            df: "-",

            criticalValue: criticalValue,

            description:
                `Untuk pengujian satu sisi kiri dengan α = ${alpha}, nilai Z kritis adalah ${criticalValue.toFixed(4)}.`

        });

    }

}


// ==========================================
// Perhitungan t
// ==========================================

function calculateT(alpha, df, tail) {

    let criticalValue;


    // Dua sisi
    if (tail === "two") {

        criticalValue =
            jStat.studentt.inv(1 - alpha / 2, df);

        showResult({

            distribution: "Student's t",

            alpha: alpha,

            df: df,

            criticalValue: criticalValue,

            description:
                `Untuk pengujian dua sisi dengan α = ${alpha} dan df = ${df}, nilai t kritis adalah ±${criticalValue.toFixed(4)}.`

        });

    }


    // Satu sisi kanan
    else if (tail === "right") {

        criticalValue =
            jStat.studentt.inv(1 - alpha, df);

        showResult({

            distribution: "Student's t",

            alpha: alpha,

            df: df,

            criticalValue: criticalValue,

            description:
                `Untuk pengujian satu sisi kanan dengan α = ${alpha} dan df = ${df}, nilai t kritis adalah ${criticalValue.toFixed(4)}.`

        });

    }


    // Satu sisi kiri
    else {

        criticalValue =
            jStat.studentt.inv(alpha, df);

        showResult({

            distribution: "Student's t",

            alpha: alpha,

            df: df,

            criticalValue: criticalValue,

            description:
                `Untuk pengujian satu sisi kiri dengan α = ${alpha} dan df = ${df}, nilai t kritis adalah ${criticalValue.toFixed(4)}.`

        });

    }

}


// ==========================================
// Menampilkan hasil
// ==========================================

function showResult(data) {

    result.style.display = "block";

    resultContent.innerHTML = `

        <table class="result-table">

            <tr>
                <th>Parameter</th>
                <th>Nilai</th>
            </tr>

            <tr>
                <td>Distribusi</td>
                <td>${data.distribution}</td>
            </tr>

            <tr>
                <td>Taraf Signifikansi (α)</td>
                <td>${data.alpha}</td>
            </tr>

            <tr>
                <td>Derajat Bebas (df)</td>
                <td>${data.df}</td>
            </tr>

            <tr>
                <td>Nilai Kritis</td>
                <td>
                    <strong>
                        ${data.criticalValue.toFixed(4)}
                    </strong>
                </td>
            </tr>

        </table>

        <p class="info">
            ${data.description}
        </p>

    `;

}


// ==========================================
// Error
// ==========================================

function showError(message) {

    result.style.display = "block";

    resultContent.innerHTML = `
        <p class="error">
            ${message}
        </p>
    `;

}
