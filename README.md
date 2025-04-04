# Meme Machine

Welcome to **Meme Machine**, a platform where memes meet cultural analysis. This project is designed to explore the deeper meanings behind viral content while providing a fun and engaging user experience. Built with modern web technologies, Meme Machine is a full-stack application that combines a React-based frontend with a robust backend API.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Technical Documentation](#technical-documentation)
7. [License](#license)

---

## Project Overview

Meme Machine is a platform for exploring the cultural significance of memes. Users can browse posts, read detailed analyses, and contribute their own comments. The project is built with the following stack:

-   **Frontend**: React, React Router, React Markdown
-   **Backend**: Node.js, Express.js (API)
-   **Database**: MongoDB
-   **Deployment**: Vite for development, environment variables for configuration

---

## Features

-   **Post Listings**: View a list of meme-related posts.
-   **Post Details**: Read in-depth analyses of memes.
-   **Comments**: Add and view comments on posts.
-   **Responsive Design**: Optimized for desktop and mobile devices.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

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

3. Set up environment variables:

    - Create a `.env` file in the `server` directory with the following:
        ```
        MONGO_URI=your-mongodb-connection-string
        VITE_API_BASE=http://localhost:5000/api
        ```

4. Start the development servers:

    - Backend:
        ```bash
        cd server
        npm run dev
        ```
    - Frontend:
        ```bash
        cd client
        npm run dev
        ```

5. Open the app in your browser at `http://localhost:5173`.

---

## Usage

-   Navigate to `/posts` to view all posts.
-   Click on a post to read its details and comments.
-   Add comments to share your thoughts.
-   Visit `/about` to learn more about the project.

---

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add your message here"
    ```
4. Push to your branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

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

### Coding Standards

-   **Frontend**: Follow [Airbnb's React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).
-   **Backend**: Follow [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices).

### Testing

-   Use [Jest](https://jestjs.io/) for unit tests.
-   Use [React Testing Library](https://testing-library.com/) for frontend testing.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy memeing! 🎉
