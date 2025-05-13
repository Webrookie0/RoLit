# RoLit - Influencer Marketing Platform

A platform that connects brands with influencers, featuring a robust real-time chat system.

## Features

- Brand and influencer dashboards
- Real-time messaging
- User profiles
- Campaign management
- Analytics

## Chat System Setup

The chat system uses Supabase as the backend. Follow these steps to set it up:

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up
2. Click "New Project" to create a new project
3. Name your project "RoLit" (or any name)
4. Set a database password (save it somewhere secure)
5. Choose a region close to you
6. Click "Create new project"

### 2. Set Up Database Schema

1. After your project is created, go to the SQL Editor
2. Copy the contents of the `supabase/schema.sql` file from this project
3. Paste it into a new query in the SQL Editor and run it

### 3. Configure Environment Variables

1. Create a `.env` file in the `FrontEnd` directory
2. Add the following environment variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase credentials, which you can find under Project Settings > API.

### 4. Integration Notes

The chat functionality has been integrated into:
- Brand Messages page (`FrontEnd/src/pages/brand/Messages.tsx`)
- Influencer Messages page (`FrontEnd/src/pages/influencer/Messages.tsx`)

Both use the same underlying services:
- `supabaseClient.ts` - Handles connection to Supabase
- `supabaseChatService.ts` - Provides functions for message operations

### 5. Demo Users

The system comes with pre-configured demo users:
- `demo_user` - Regular user
- `influencer1` - Influencer account
- `brand1` - Brand account

You can use these in development to test the chat functionality.

## Project Structure

- `FrontEnd/` - React application with TypeScript
  - `src/` - Source code
    - `components/` - Reusable UI components
    - `contexts/` - React contexts
    - `hooks/` - Custom hooks
    - `pages/` - Page components
    - `services/` - Service layer
    - `utils/` - Utility functions
- `BackEnd/` - Backend services
- `supabase/` - Supabase configuration and schema

## Development

### Local Development

1. Install dependencies:
```
cd FrontEnd
npm install
```

2. Start the development server:
```
npm start
```

The application will be available at http://localhost:3000

## Troubleshooting

### Common Issues

#### Supabase Connection Issues
- Verify your Supabase URL and anon key in `.env`
- Make sure your Supabase project is active
- Confirm you've run the schema SQL

#### Authentication Issues
- For easier testing, you might want to disable email confirmation in Supabase:
  1. Go to Authentication > Settings
  2. Disable "Enable email confirmations"
  3. Save changes

#### Chat Not Working
- Check browser console for errors
- Verify Supabase real-time functionality is enabled
- Ensure users have the correct permissions 