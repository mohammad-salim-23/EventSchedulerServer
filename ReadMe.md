Dr.Tech Server

This is the backend server for the Dr.Tech medical appointment management system.

✨ Tech Stack

Node.js

Express.js

TypeScript

MongoDB with Mongoose

Zod for validation

JWT for authentication

bcryptjs for password hashing

⚙️ Setup Instructions

1. Clone the repository

https://github.com/mohammad-salim-23/Dr.TechtaskServer
cd Dr.TechtaskServer

2. Install dependencies

npm install

3. Environment Variables

Create a .env file in the root with the following:

NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_secret

4. Run the server

Development Mode:

npm run start:dev

Production Build:

npm run build
npm run start:prod

Server will be running at: http://localhost:5000

💡 Default Admin User

Username: Dr.Tech
Password: salim123

Note: You must add this admin manually in your database if it doesn't exist.

🚀 API Endpoints

✉️ Auth

POST /api/auth/register-doctor

POST /api/auth/register-patient

POST /api/auth/login

POST /api/auth/logout

🏥 Public Doctor View (Patient Side)

GET /api/doctors - Browse doctors with filters (hospital, specialization, service)

GET /api/doctors/:id - View a doctor's full profile

💼 Doctor Panel

POST /api/doctor/services

PATCH /api/doctor/services/:id

DELETE /api/doctor/services/:id

POST /api/doctor/availability

GET /api/doctor/appointments

PATCH /api/doctor/appointments/:id/status

🎓 Patient Panel

POST /api/appointments - Book an appointment

GET /api/patient/appointments - View booked appointments

📈 Admin Dashboard

GET /api/admin/allcollections - Get total counts of doctors, patients, and appointments

📃 Pagination (Bonus Feature)

GET /api/auth/pagination?page=1&limit=10 - Paginated doctor appointments

🚫 Error Handling

Global error handler is available and integrated into the middleware. All errors are formatted with:



const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;

#deploy_link: https://dr-tech-server.vercel.app
🚧 Future Improvements

Email notifications on appointment request/accept (currently planned but not implemented)

Admin panel UI

🎉 That's it!

You can now start using Dr.Tech server locally. For any setup issues or improvements, feel free to reach out.

Author: [Mohammad Salim]
