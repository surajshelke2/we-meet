# Project Name: We Meet

## Overview
**EduFocus** is a Next.js-based web application that enables educators to conduct interactive meetings with students, monitor their focus levels, and analyze their understanding using chat analysis. This project integrates with **Stream.io** for chat functionalities and **Clerk** for user authentication.

---

## Features
- **Student Meetings:** Conduct live sessions with multiple students.
- **Chat Analysis:** Analyze student chat interactions to gauge understanding and focus.
- **Focus Metrics:** Monitor student engagement during sessions.
- **Authentication:** Secure sign-in and sign-up using Clerk.

---

## Technologies Used
- **Next.js**: Framework for building the frontend.
- **Stream.io**: For real-time chat functionalities.
- **Clerk**: For authentication and user management.

---

## Environment Variables
Ensure you set up the following environment variables in your `.env.local` file:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aHVtYW5lLWdsb3d3b3JtLTk0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_HKr0dnc9oGrmOHzgRiLsYxM8XCZSwjMZR9w6qfn3xa

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream.io Configuration
NEXT_PUBLIC_STREAM_API_KEY=4wg4ap6fvgr5
STREAM_SECRET_KEY=fwa57hqequtnafjexpbktj7yz2us5snt6fzvtrt9yjhgkx6d58sd2dw86nzdwpyz

# Application Base URL
NEXT_PUBLIC_BASE_URL=localhost:3000
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and copy the environment variables mentioned above into it.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```plaintext
   http://localhost:3000
   ```

---

## Usage
1. Sign up or sign in using the provided authentication links.
2. Create or join a meeting.
3. Use the chat feature to interact with other participants.
4. Analyze chat interactions and focus metrics in real-time.

---

## Deployment

To deploy the application:

1. Ensure the `.env.local` file is set up with the production keys.
2. Build the application:

   ```bash
   npm run build
   ```

3. Start the production server:

   ```bash
   npm start
   ```

Alternatively, deploy the app using platforms like Vercel or Netlify by linking your GitHub repository.

---

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For questions or feedback, reach out to [your-email@example.com](surajshelke332@gmail.com).

