BFHL API – Chitkara Qualifier 1

Base URL:
https://bfhl-api1-8mzz.onrender.com

Endpoints

GET /health

Returns service health.

POST /bfhl

Accepts exactly one of the following keys in request body:

1. Fibonacci
Request:
{ "fibonacci": 7 }

2. Prime
Request:
{ "prime": [2,4,7,9,11] }

3. LCM
Request:
{ "lcm": [12,18,24] }

4. HCF
Request:
{ "hcf": [24,36,60] }

5. AI
Request:
{ "AI": "Your question" }

Tech Stack

Node.js, Express.js, Google Gemini API

Hosting Platform

Render
