# Assembly Learning Platform

An interactive platform for learning assembly language programming with tutorials, a code playground, and a CPU simulator.

## Features

- Interactive Assembly Code Playground
- CPU Simulator
- Comprehensive Tutorials
- Video Learning Resources

## Deployment on Vercel

### Prerequisites

1. A Vercel account
2. JDoodle API credentials (CLIENT_ID and CLIENT_SECRET)

### Deployment Steps

1. Fork or clone this repository
2. Set up environment variables in Vercel:
   - CLIENT_ID: Your JDoodle Client ID
   - CLIENT_SECRET: Your JDoodle Client Secret
3. Deploy to Vercel using the Vercel CLI or GitHub integration

### Local Development

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   npm install
   \`\`\`
4. Run the backend:
   \`\`\`
   python index.py
   \`\`\`
5. Run the frontend:
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

- `GET /api`: Health check endpoint
- `GET /api/test`: Test endpoint
- `POST /api/execute`: Execute assembly code using JDoodle API

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Flask (Python)
- Deployment: Vercel
