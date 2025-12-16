## API Documentation
The API is documented using Insomnia.
Import the provided Insomnia YAML file to test all endpoints.


Library Management System API

A RESTful Library Management System API built with Node.js, Express, MongoDB, and Mongoose.
This API allows libraries to manage books, borrowers, borrowing operations, reservations, late fees, and user authentication with role-based access.


Features
  Book Management

Create, read, update, and delete books

Search books by title, author, or ISBN

Pagination support for book listings

Track total and available copies

  Borrower Management

CRUD operations for borrowers

Each borrower has a name, email, and member ID

 Borrowing System

Borrow books with availability checks

Return books with automatic copy restoration

Track due dates and borrowing history

View currently borrowed books

 Late Fee Calculation

Automatic late fee calculation based on overdue days

Configurable daily fee rate

  Book Reservation

Reserve books when no copies are available

FIFO (first-come, first-served) reservation queue

Automatic fulfillment when a book is returned

  Authentication & Authorization

JWT-based authentication

Role-based access:

Librarian: manage books and view all records

User: borrow, return, reserve books

  Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose ODM)

Authentication: JWT (jsonwebtoken)

Security: bcryptjs

API Testing: Insomnia / Postman



1. Installation & Setup

  
   git clone https://github.com/lapingaro/Library_management_system_api.git
   cd Library_management_system_api

2. npm install

3. Create environment variables
   Create a .env file in the root directory:

   -include this in the file : 
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

4. Run the server
   npm run dev 

   You should see :

   successful connection to MongoDB
   Server running on port 3000


5. Authentication Flow

Register a user (/api/auth/register)

Login (/api/auth/login)

Copy the returned JWT token

Send the token in request headers:

Authorization: Bearer <your_token>

6.  API Endpoints (Overview)
Auth

POST /api/auth/register

POST /api/auth/login

Books

GET /api/books

POST /api/books (librarian only)

PUT /api/books/:id (librarian only)

DELETE /api/books/:id (librarian only)

Borrowing

POST /api/borrow

POST /api/borrow/return

GET /api/borrow/history

GET /api/borrow/current

Reservations

POST /api/reservations



7. Program Logic 

Borrowing:
When a book is borrowed, available copies are reduced and a due date is set.

Returning:
On return, overdue days are calculated and a late fee is applied if necessary.

Reservations:
If a book has no available copies, users can reserve it.
When a copy is returned, the earliest reservation is automatically fulfilled.

Security:
Routes are protected using JWT and role-based authorization middleware.


8.  Testing the API

You can test the API using:

Insomnia

Postman

Make sure to:

Set request body to JSON

Add Bearer token in the Authorization tab



9. Author

BEHINT BENJAMIN CHRISTOPHER

Library Management System API – Backend Project

