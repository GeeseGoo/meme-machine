## Project Overview

Meme Machine is all about exploring the cultural significance of memes. Users can browse posts, read detailed analyses, and share their thoughts through comments. The project is built using:

-   **Frontend**: React, React Router, React Markdown
-   **Backend**: Node.js, Express.js (API)
-   **Database**: MongoDB
-   **Development Tools**: Vite for fast builds and environment variables for configuration

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/meme-machine.git
    cd meme-machine
    ```

2. Install dependencies for both the client and server:

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

    - Create a `.env` file in the `server` directory with:
        ```
        DATABASE_URL=your-database-connection-string
        VITE_API_BASE=http://localhost:5000/api
        ```

3. Set up the database with Prisma:

    - Generate the Prisma client:
        ```bash
        npx prisma generate
        ```
    - Apply migrations to set up the database schema:
        ```bash
        npx prisma migrate dev --name init
        ```

4. Start the development servers:

    - Backend:
        ```bash
        npm run dev
        ```
    - Frontend:
        ```bash
        cd ../client
        npm run dev
        ```

5. Open the app in your browser at `http://localhost:5173`.

---

## Usage

-   Visit `/posts` to explore all posts.
-   Click on a post to read its details and comments.
-   Add comments to share your thoughts.
-   Check out `/about` to learn more about the project.

---

## Authentication with JWT

We use **JSON Web Tokens (JWT)** to make logging in simple and secure. This lets users interact with the platform without needing to log in repeatedly.

### Posting

-   **Who Can Post**: Only logged-in users can create posts.
-   **What You Can Post**: Posts include a title, content, and metadata like the creation date and author.

### Commenting

-   **Who Can Comment**: Comments can be added by anyone (configurable).
-   **Real-Time Updates**: Comments appear immediately after submission.

### Example Workflow

1. **Login**: Log in to get your JWT.
2. **Create a Post**: Use the "Add Post" feature to share your thoughts.
3. **Add Comments**: Navigate to a post and use the "Add Comment" button to join the conversation.

---

## Technical Documentation

### Project Structure

```
meme-machine/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main application file
│   │   └── index.css      # Global styles
│   └── public/            # Static assets
├── server/                # Backend API
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── .env               # Environment variables
└── README.md              # Project documentation
```

### API Endpoints

#### Posts

-   `GET /api/posts`: Fetch all posts.
-   `GET /api/posts/:id`: Fetch a single post by ID.
-   `POST /api/posts/:id/comments`: Add a comment to a post.

#### Comments

-   `GET /api/posts/:id/comments`: Fetch comments for a post.

---

## License

This project is licensed under the MIT License.

---
