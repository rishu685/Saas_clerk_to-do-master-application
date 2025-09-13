# SaaS Clerk Todo Application

A powerful task management application built with Next.js, featuring role-based authentication using Clerk and a PostgreSQL database.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A Clerk account (for authentication)
- A Neon account (for PostgreSQL database)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/rishu685/Saas_clerk_to-do-master-application.git
   cd saas-clerk-todo-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_actual_clerk_publishable_key
   CLERK_SECRET_KEY=your_actual_clerk_secret_key

   # Database (PostgreSQL)
   DATABASE_URL=your_actual_neon_database_url

   # Webhook Secret (from Clerk Dashboard)
   WEBHOOK_SECRET=your_actual_clerk_webhook_secret
   ```

   ⚠️ **Security Note**: Never commit your actual `.env.local` file to version control. The `.gitignore` file already excludes it.

4. Set up the database:

   ```
   npx prisma db push
   ```

5. Generate Prisma client:
   ```
   npx prisma generate
   ```

### Running the Application

To run the development server:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication with Clerk
- Role-based access control (Admin and User roles)
- Todo management (Create, Read, Update, Delete)
- Subscription-based todo limits
- Admin dashboard for user management

## Webhook Setup

This application uses a Clerk webhook to synchronize user data with the database. Specifically, it listens for the `user.created` event to create a corresponding user record in the database.

To set up the webhook:

1. Go to the Clerk Dashboard.
2. Navigate to the "Webhooks" section.
3. Click on "Add Endpoint".
4. Set the Endpoint URL to `https://your-app-url.com/api/webhook/register` (replace with your actual URL).
5. Under "Events", select "user.created".
6. Save the endpoint.
7. Copy the "Signing Secret" and add it to your `.env.local` file as `WEBHOOK_SECRET`.

The webhook handler is implemented in `app/api/webhook/register/route.ts`. It verifies the webhook signature and creates a new user record in the database when a user is created in Clerk.

## @Codebase

### Setting up an Admin User

To test the admin functionality, you need to manually set the user's role to "admin" in Clerk. Here's how to do it:

1. Log in to your Clerk Dashboard.
2. Go to the "Users" section.
3. Find the user you want to make an admin.
4. Click on the user to open their details.
5. Scroll down to the "Public metadata" section.
6. Add a new key-value pair:
   - Key: `role`
   - Value: `admin`
7. Save the changes.

Now, when this user logs in, they will have admin privileges in the application.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. Here's how to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

### License Summary

- ✅ **Commercial use** - You can use this project for commercial purposes
- ✅ **Modification** - You can modify the source code
- ✅ **Distribution** - You can distribute the original or modified code
- ✅ **Patent use** - Express grant of patent rights from contributors
- ✅ **Private use** - You can use this project privately

**Requirements:**
- 📄 Include the license and copyright notice
- 📝 State changes made to the code
- 🔗 Include the original license in distributions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Clerk](https://clerk.dev/) - Authentication and user management
- [Prisma](https://prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help with the project, please:

1. Check the [Issues](https://github.com/rishu685/Saas_clerk_to-do-master-application/issues) for existing solutions
2. Create a new [Issue](https://github.com/rishu685/Saas_clerk_to-do-master-application/issues/new) if you need help
3. Star ⭐ the repository if you find it useful!

---

**Made with ❤️ by [Rishu](https://github.com/rishu685)**
