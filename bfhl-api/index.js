require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const EMAIL = "ravjot1420.be23@chitkarauniversity.edu.in";

/* ---------------- HELPERS ---------------- */

function getFibonacci(n) {
    const res = [];
    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        res.push(a);
        [a, b] = [b, a + b];
    }
    return res;
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

/* ---------------- ROUTES ---------------- */

app.get("/health", (req, res) => {
    return res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
});


app.post("/bfhl", async (req, res) => {

    try {

        const body = req.body;
        const keys = Object.keys(body);

        // exactly one key allowed
        if (keys.length !== 1) {
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL,
                error: "Exactly one key is required"
            });
        }

        const key = keys[0];

        // ---------- fibonacci ----------
        if (key === "fibonacci") {

            const n = body.fibonacci;

            if (!Number.isInteger(n) || n < 0) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "Invalid fibonacci input"
                });
            }

            const result = getFibonacci(n);

            return res.json({
                is_success: true,
                official_email: EMAIL,
                data: result
            });
        }

        // ---------- prime ----------
        if (key === "prime") {

            const arr = body.prime;

            if (!Array.isArray(arr)) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "Prime expects array"
                });
            }

            const result = arr.filter(x => Number.isInteger(x) && isPrime(x));

            return res.json({
                is_success: true,
                official_email: EMAIL,
                data: result
            });
        }

        // ---------- lcm ----------
        if (key === "lcm") {

            const arr = body.lcm;

            if (!Array.isArray(arr) || arr.length === 0) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "LCM expects non empty array"
                });
            }

            let ans = arr[0];

            for (let i = 1; i < arr.length; i++) {
                ans = lcm(ans, arr[i]);
            }

            return res.json({
                is_success: true,
                official_email: EMAIL,
                data: ans
            });
        }

        // ---------- hcf ----------
        if (key === "hcf") {

            const arr = body.hcf;

            if (!Array.isArray(arr) || arr.length === 0) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "HCF expects non empty array"
                });
            }

            let ans = arr[0];

            for (let i = 1; i < arr.length; i++) {
                ans = gcd(ans, arr[i]);
            }

            return res.json({
                is_success: true,
                official_email: EMAIL,
                data: ans
            });
        }

        // ---------- AI ----------
if (key === "AI") {

    const question = body.AI;

    if (typeof question !== "string" || question.trim() === "") {
        return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "AI expects a string"
        });
    }

    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(url, {
        contents: [
            {
                parts: [
                    { text: question + ". Reply in exactly one word only." }
                ]
            }
        ]
    });

    const candidate = response.data?.candidates?.[0];
    const part = candidate?.content?.parts?.[0]?.text;

    if (!part) {
        return res.status(502).json({
            is_success: false,
            official_email: EMAIL,
            error: "AI service failed"
        });
    }

    let text = part.trim().split(/\s+/)[0];

    return res.json({
        is_success: true,
        official_email: EMAIL,
        data: text
    });
}


        // ---------- unknown key ----------
        return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid key"
        });

    } catch (err) {

        console.error(err.message);

        return res.status(500).json({
            is_success: false,
            official_email: EMAIL,
            error: "Internal server error"
        });
    }

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
