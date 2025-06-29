Dr.Tech Server
This is the backend server for the Dr.Tech medical appointment management system. It handles authentication, doctor availability, patient bookings, and appointment workflows.

✨ Tech Stack
Node.js

Express.js

TypeScript

MongoDB + Mongoose

Zod (for request validation)

JWT (for secure authentication)

bcryptjs (for password hashing)

⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/mohammad-salim-23/Dr.TechtaskServer
cd Dr.TechtaskServer

2. Install Dependencies

npm install

3. Environment Variables
Create a .env file in the project root with the following content:

env

NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_secret

4. Run the Server
Development Mode:
npm run start:dev

Production Build:
npm run build
npm run start:prod
The server will run at: http://localhost:5000

👤 Default Admin User
Username: Dr.Tech

Password: salim123

⚠️ You must manually insert this admin user into the users collection if not created already.

🔐 Authentication Notes
You must login to access any protected route (doctor, patient, or admin).

Once logged in, a JWT token is returned. This must be passed in the Authorization header in Postman or any client like so:

makefile

Authorization: Bearer <your_token_here>
Only one active login per user is allowed. If a user is already logged in, they must log out before logging in again (use /api/auth/logout).

🚀 API Endpoints
✉️ Auth Routes
POST /api/auth/register-doctor

POST /api/auth/register-patient

POST /api/auth/login

POST /api/auth/logout

🏥 Doctor (Public View)
GET /api/doctors — Browse doctors (with filters by hospital, specialization, service)

GET /api/doctors/:id — View individual doctor profile with services and availability

👨‍⚕️ Doctor Panel (Protected - Requires Doctor Login)
POST /api/doctor/services — Add new service

PATCH /api/doctor/services/:id — Edit existing service

DELETE /api/doctor/services/:id — Delete service

POST /api/doctor/availability — Set availability

GET /api/doctor/appointments — View appointment requests (optionally filter by status)

PATCH /api/doctor/appointments/:id/status?status=accepted|cancelled — Update appointment status

👩‍⚕️ Patient Panel (Protected - Requires Patient Login)
POST /api/appointments — Book an appointment

GET /api/patient/appointments — View patient's own appointments

🧑‍💼 Admin Panel (Protected - Requires Admin Login)
GET /api/admin/allcollections — View total doctors, patients, and appointments

📃 Pagination (Bonus)
GET /api/auth/pagination?page=1&limit=10 — Paginate doctor appointments

🚫 Error Handling Format
All errors are globally handled and returned in this format:


{
  "success": false,
  "message": "Error message",
  "errorDetails": "Stack trace if in development mode"
}

// Example global error handler
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
🌐 Deployment
This project is deployable on any Node.js environment.

Example placeholder link (replace when deployed):

https://dr-tech-server.vercel.app

🚧 Future Improvements
🔔 Email notifications (on appointment request and acceptance)

📊 Admin dashboard UI

📆 Enhanced time slot conflict validation

👨‍💻 Author
Mohammad Salim
mohammadsalim017427@gmail.com
If you face any issues setting up or using the API, feel free to open an issue or reach out.