# 📅 EventScheduler Server

This is the backend server for the **EventScheduler** application. It handles authentication and event management, including creation, retrieval, archiving, and deletion of events with automatic categorization.

---

## 🔗 Repository Link

[👉 GitHub Repository - EventSchedulerServer](https://github.com/mohammad-salim-23/EventSchedulerServer)

---

## ✨ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (for request validation)
- **JWT** (for secure authentication)
- **bcryptjs** (for password hashing)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mohammad-salim-23/EventSchedulerServer.git
cd EventSchedulerServer

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

🚀 API Endpoints
✉️ Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user

📅 Event Routes
Method	Endpoint	Description	Protected
POST	/api/events	Create a new event (with auto categorization)	
GET	/api/events	Retrieve all events (sorted by date & time)	❌
PUT	/api/events/:id	Update (archive) an event’s status to true	
DELETE	/api/events/:id	Delete an event	

🔑 Authentication Notes
You must login to access any protected route (event creation, update, delete).

Once logged in, a JWT token is returned. Pass this in the Authorization header like:


Authorization: Bearer <your_token_here>
Auto Categorization Logic
When creating an event:

If title or notes contain keywords like meeting, project, client, deadline, presentation, report, it is categorized as "Work".

If they contain birthday, family, anniversary, vacation, holiday, party, it is categorized as "Personal".

Otherwise, it is categorized as "Other".

🚫 Error Handling Format
All errors are globally handled and returned in this format:

{
  "success": false,
  "message": "Error message",
  "errorDetails": "Stack trace if in development mode"
}
 Deployment
This project can be deployed on any Node.js hosting platform such as Render, Vercel, Railway, or AWS.

👨‍💻 Author
Mohammad Salim
📧 mohammadsalim017427@gmail.com

If you face any issues setting up or using the API, feel free to open an issue or reach out.