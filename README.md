# Aevora

> AI-Powered Decision Intelligence Platform

Aevora is an intelligent decision simulation platform that helps users explore possible future outcomes of their life, career, education, and business decisions. Instead of providing a single recommendation, Aevora generates multiple future scenarios, highlights trade-offs, and offers strategic insights to support informed decision-making.

## Features

### Decision Simulation

Generate multiple potential outcomes for a given choice or situation.

### Future Timelines

Visualize how decisions made today may influence future milestones and achievements.

### AI-Powered Analysis

Receive structured insights on risks, opportunities, effort requirements, and growth potential.

### Interactive Chat Interface

Engage in conversational decision planning and refine scenarios through natural language.

### Scenario Comparison

Compare different pathways side-by-side to better understand trade-offs.

### Personalized Guidance

Receive recommendations tailored to your goals, interests, and objectives.

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Integration

* OpenAI API

### Deployment

* Vercel

---

## Project Structure

```text
aevora/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── styles/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── middleware/
│
├── public/
├── docs/
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* OpenAI API Key

### Installation

Clone the repository:

```bash
git clone https://github.com/andahirwe/aevora.git
cd aevora
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Usage

1. Enter a decision, goal, or life scenario.
2. Submit your query to Aevora.
3. Explore generated future pathways.
4. Compare timelines, risks, and opportunities.
5. Use insights to make more informed decisions.

Example prompts:

* Should I pursue AI engineering or cybersecurity?
* What happens if I start freelancing instead of taking a full-time job?
* How can I become a successful entrepreneur within five years?
* Should I focus on higher education or gain work experience first?

---

## Architecture

```text
User
  ↓
Frontend (Next.js + React)
  ↓
Backend API (Node.js + Express)
  ↓
AI Processing Layer
  ↓
Scenario Generation Engine
  ↓
Structured Decision Insights
```

---

## Future Roadmap

* User accounts and saved simulations
* Interactive decision trees
* Advanced visual analytics
* Data-driven forecasting
* Personalized career planning
* Financial scenario modeling
* Collaborative decision sharing

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Aime Maurice Ndahiriwe**

GitHub: https://github.com/andahirwe

---

## Vision

Aevora aims to become a personal AI decision companion that empowers individuals to evaluate possibilities, understand trade-offs, and make better long-term decisions with confidence.
