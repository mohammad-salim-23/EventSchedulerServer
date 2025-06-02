9am Job Task Server

This is a simple **Express.js** server built with **TypeScript** and **Mongoose** for basic user authentication, including:

✅ User **signup**  
✅ User **signin**  

---

## 📚 Documentation

This server-side project includes:

- **Express.js** for routing and middleware.
- **Mongoose** for MongoDB data modeling.
- **TypeScript** for strong typing and maintainability.
- **Only two basic user routes**: `/signup` and `/signin`.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mohammad-salim-23/9amjobtaskserver.git
cd 9amjobtaskserver
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Setup environment variables
Create a .env file in the root directory:

ini
Copy
Edit
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
4️⃣ Build TypeScript
bash
Copy
Edit
npm run build
5️⃣ Start the server
For production:
npm run start
For development (with live reload):

npm run dev
📂 API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Authenticate a user

💡 Example Requests
Signup

POST /auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
login

POST /auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securepassword"
}
🌐 Local Testing
Once you’ve started the server (npm run dev), visit:
http://localhost:5000/
Use tools like Postman or curl to test the signup/signin routes.

📦 Scripts
Script	Command	Description
start	node dist/index.js	Runs the compiled JS code.
dev	nodemon src/index.ts	Development mode with live reload.
build	tsc	Compiles TypeScript to JavaScript.

🤝 Contributing
Feel free to fork this repo and create a pull request if you’d like to contribute!

📝 License
MIT

📌 Notes
✅ Replace <your-mongodb-connection-string> and <your-secret-key> with your actual credentials in .env.
✅ You can explore the source code and update routes or models as needed!

GitHub Repository:
https://github.com/mohammad-salim-23/9amjobtaskserver

