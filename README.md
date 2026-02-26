# AI-Powered Career Coaching and Interview Preparation Platform

## Project Overview
This project is an AI-powered career coaching and interview preparation platform that helps users enhance their interviewing skills and make informed career decisions.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** Firebase
- **Payment Processing:** Stripe
- **AI Integration:** Google Gemini API

## Features
- Personalized career coaching sessions
- Interview preparation tools and resources
- Payment processing for coaching services via Stripe
- Real-time database for managing user data

## Local Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/harrisonw707-commits/envisionpaths-
   cd envisionpaths-
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase configuration in a `.env` file.
4. Run the application:
   ```bash
   npm start
   ```

## Google Cloud Deployment Guide
1. Create a new project in the Google Cloud Console.
2. Enable the Firebase and Google APIs required for the project.
3. Deploy the application using:
   ```bash
   firebase deploy
   ```

## Environment Variables
- **FIREBASE_API_KEY**: Your Firebase API key
- **FIREBASE_AUTH_DOMAIN**: Your Firebase authentication domain
- **FIREBASE_DATABASE_URL**: Your Firebase database URL
- **STRIPE_SECRET_KEY**: Your Stripe secret key
- **GOOGLE_GEMINI_API_KEY**: Your Google Gemini API key

## Development Guidelines
- Follow the code style guides outlined in the repository.
- Ensure all features are thoroughly tested before deployment.
- Document all changes and updates to the codebase.