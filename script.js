const distribution =
    document.getElementById("distribution");

const alpha =
    document.getElementById("alpha");

const dfContainer =
    document.getElementById("df-container");

const dfInput =
    document.getElementById("df");

const result =
    document.getElementById("result");


// Menampilkan / menyembunyikan input df
distribution.addEventListener("change", function () {

    if (distribution.value === "t") {

        dfContainer.style.display = "block";

    } else {

        dfContainer.style.display = "none";

    }

});


// Fungsi utama
function calculate() {

    const dist = distribution.value;

    const a = parseFloat(alpha.value);


    // =========================
    // DISTRIBUSI Z
    // =========================

    if (dist === "z") {

        const probability =
            1 - (a / 2);

        const z =
            jStat.normal.inv(
                probability,
                0,
                1
            );

        result.innerHTML = `
            <h2>Hasil</h2>

            <p>
                Nilai Z kritis =
                <strong>±${z.toFixed(4)}</strong>
            </p>
        `;

    }


    // =========================
    // DISTRIBUSI T
    // =========================

    else {

        const df =
            parseInt(dfInput.value);

        if (!df || df < 1) {

            result.innerHTML = `
                <p>
                    Masukkan nilai df terlebih dahulu.
                </p>
            `;

            return;
        }


        const probability =
            1 - (a / 2);

        const t =
            jStat.studentt.inv(
                probability,
                df
            );


        result.innerHTML = `
            <h2>Hasil</h2>

            <p>
                Nilai t kritis =
                <strong>±${t.toFixed(4)}</strong>
            </p>

            <p>
                df = ${df}
            </p>
        `;

    }

}
