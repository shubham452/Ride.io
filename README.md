# Ride.io

A full-stack ride sharing web application. This repository contains both the backend and frontend components to allow users to register, log in, get routes between two locations, calculate optimal distance and time for trips, and view waypoints for step-by-step navigation. Designed as an open-source project for educational or prototyping purposes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features

- User registration and authentication
- Mapping routes between locations
- Calculate optimal distance and time
- Show all waypoints for navigation
- Responsive UI

> *Note: Specific features depend on current implementation and may be updated as the project evolves.*

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Other:** Axios for API calls, React Router for navigation

## Project Structure

```
Ride.io/
│
├── backend/           # Express backend API
├── frontend/          # React frontend client
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

Clone the repository:

```bash
git clone https://github.com/shubham452/Ride.io.git
cd Ride.io
```

Set up the backend:

```bash
cd backend
npm init -y
# Set up environment variables (e.g., .env file)
nodemon start
```

Set up the frontend:

```bash
cd ../frontend
npm create vite@latest
npm start
```

Access the application locally:

- **Frontend:** http://localhost:5173
- **Backend:** API runs on another port, e.g., http://localhost:3000

> *Adjust port numbers as needed depending on your configuration.*

## Usage

- Register as a new user or log in
- Map routes between locations
- Calculate optimal distance and travel time
- View all waypoints for your route

*For developer setup and sample API requests, refer to code comments or API documentation in the backend folder.*

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a pull request

*Please ensure code quality and add tests where appropriate.*

## License

This project is released under the MIT License.

## Credits

Created and maintained by [shubham452](https://github.com/shubham452).
