# AI Mock Interviewer

AI Mock Interviewer is a full-stack web application designed to help users prepare for job interviews. Leveraging the power of Google's Gemini AI, it generates tailored interview questions, records user responses via speech-to-text, and provides instant, constructive feedback to help you ace your next interview.
click here to open AI Mock Interviewer - ([ai-mock-interviewer-six.vercel.app](https://ai-mock-interviewer-git-main-jay-tandias-projects.vercel.app/))

## Features

-   **🤖 AI-Generated Questions**: Create a new mock interview by providing a job title, description, and your years of experience. The AI generates a relevant set of questions.
-   **🗣️ Interactive Practice Sessions**: Engage in a realistic interview experience with webcam support and voice recording capabilities.
-   **🎙️ Real-time Speech-to-Text**: Your spoken answers are automatically transcribed using the `react-hook-speech-to-text` library.
-   **📈 Instant AI Feedback**: After each answer, receive an AI-generated rating and detailed feedback on your performance, highlighting strengths and suggesting areas for improvement.
-   **📊 Personalized Dashboard**: View a history of all your completed interviews and revisit your feedback at any time to track your progress.
-   **🔐 Secure Authentication**: User management is handled securely by Clerk, providing easy sign-up and sign-in functionality.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **AI**: Google Gemini API (`@google/generative-ai`)
-   **Database**: Neon (PostgreSQL)
-   **ORM**: Drizzle ORM
-   **Authentication**: Clerk
-   **UI**: Tailwind CSS, shadcn/ui, Framer Motion
-   **Speech-to-Text**: `react-hook-speech-to-text`
-   **Deployment**: Vercel

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A Google Gemini API Key
-   A Clerk Account
-   A Neon Database

### 1. Clone the Repository

```bash
git clone https://github.com/JayTandia/ai-mock-interviewer.git
cd ai-mock-interviewer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. Obtain the necessary keys from their respective platforms.

```env
# Clerk Authentication
# Get these from your Clerk dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Neon Database (Drizzle ORM)
# Get this connection string from your Neon DB project
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_connection_string

# Google Gemini AI
# Get this from Google AI Studio
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key

# Application Configuration (Optional, defaults can be used)
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
NEXT_PUBLIC_INFORMATION="Enable webcam and microphone access to start your AI-powered mock interview. Your session will be recorded to provide detailed feedback."
NEXT_PUBLIC_QUESTION_NOTE="Click on the microphone icon to record your answer for the current question. You will receive AI-generated feedback after each response."
```

### 4. Set Up the Database

Run the following command to push the schema to your Neon database using Drizzle Kit.

```bash
npm run db:push
```

You can view your database tables using Drizzle Studio:

```bash
npm run db:studio
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

-   `app/`: Contains all the routes and pages of the application, following the Next.js App Router structure.
    -   `(auth)/`: Authentication pages (sign-in, sign-up).
    -   `dashboard/`: Main application dashboard, interview creation, and past interview list.
-   `components/`: Shared React components, including UI components from shadcn/ui.
-   `utils/`: Utility functions, database connection (`db.js`), ORM schema (`schema.js`), and Gemini AI client (`GeminiAIModal.js`).
-   `drizzle.config.js`: Configuration file for Drizzle Kit.
-   `middleware.js`: Handles protected routes using Clerk middleware.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
