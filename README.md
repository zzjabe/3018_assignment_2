# Employee & Branch Management API

## Project Overview  
This is an Employee and Branch Management API. It provides the following features:  
- Manage employees: create, read, update, and delete (CRUD) operations  
- Manage branches: create, read, update, and delete (CRUD) operations  
- Filter employees by branch ID or department name  
- Built with Firebase Admin SDK (Firestore database)  
- Implemented with Express.js, Joi validation, and Swagger/OpenAPI documentation  

The API is suitable for organizations that want to maintain an internal directory of employees and branches, allowing easy querying and management.

---

## Installation Instructions  

1. Clone the repository:  

- git clone https://github.com/zzjabe/3018_assignment_2.git  
- cd 3018_assignment_2  

2. Install dependencies: 

- npm install  

3. Set up environment variables.  

- Create a .env file in the project root with the following content (adjust according to your Firebase project):  

- FIREBASE_PROJECT_ID=your_project_id
- FIREBASE_CLIENT_EMAIL=your_client_email
- FIREBASE_PRIVATE_KEY="your_private_key_here"
- PORT=3000

4. Start the server:  

- npm start

## Employees API Endpoints  
- GET /employees: Get all employees  
- GET /employees/:id: Get employee by ID  
- GET /employees/byBranch?branchId={id}: Get employees by branch  
- GET /employees/byDepartment?department={name}: Get employees by department  
- POST /employees: Create a new employee  
- PUT /employees/:id: Update an existing employee
- DELETE /employees/:id: Delete an employee

## Branches API Endpoints  
- GET /branches: Get all branches  
- GET /branches/:id: Get branch by ID  
- POST /branches: Create a new branch  
- PUT /branches/:id: Update an existing branch  
- DELETE /branches/:id: Delete a branch  

## Public Documentation Link  
- https://zzjabe.github.io/3018_assignment_2  

## Local Documentation Access  
- After starting the server, open the following URL in your browser to access the OpenAPI/Swagger documentation:  
- http://localhost:3000/api-docs

## Security Configuration  
- Helmet is used to enhance HTTP header security (prevent clickjacking, XSS, MIME type sniffing, etc.).  
- CORS is configured to restrict which domains can access your API.  

## Environment Variable Management  
- Sensitive configurations (Firebase credentials, database URLs, API keys) are stored in a .env file.  
- Add .env to .gitignore to prevent committing secrets.  
