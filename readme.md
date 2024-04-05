# Authentication with Express.js

This repository contains a simple authentication system built with Express.js. The authentication system allows users to sign up, log in, and log out.

## Features

- User sign up: Users can create a new account by providing a username and password.
- User log in: Existing users can log in with their username and password.
- User log out: Logged-in users can log out of their accounts.
- Password hashing: User passwords are hashed using bcrypt to enhance security.
- Session management: User sessions are managed using express-session middleware.

## Dependencies

The authentication system relies on the following dependencies:

- Express.js: Web framework for Node.js
- Bcrypt.js: Library for hashing passwords
- Express-session: Middleware for managing sessions

## Installation

To run the authentication system locally, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone
   ```
2. Navigate to the project directory:
   ```
   cd auth
   ```
3. Install the dependencies: npm install

4. Set up environment variables:

- Create a `.env` file in the root directory.
- Add the following variables:
  ```
  PORT=3000
  SESSION_SECRET=your_session_secret
  ```

5. Start the server: npm start

6. Access the authentication system at `http://localhost:3000` in your web browser.

## Usage

- Sign up: Navigate to the sign-up page and fill in the required information.
- Log in: Once signed up, navigate to the log-in page and enter your credentials.
- Log out: Click on the log-out button to end the current session.

## Contributing

Contributions to improve the authentication system are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Author: Dam Nguyen

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
