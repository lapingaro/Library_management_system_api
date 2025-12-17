# 📚 Library Management System API

A **RESTful Library Management System API** built with **Node.js, Express, MongoDB, and Mongoose**.

This API allows libraries to manage **books, borrowers, borrowing operations, reservations, late fees**, and **user authentication** with **role-based access control**.

---

##   Features

###   Book Management
- Create, read, update, and delete books
- Search books by **title, author, or ISBN**
- Pagination support for book listings
- Track **total copies** and **available copies**

###  Borrower Management
- CRUD operations for borrowers
- Each borrower has:
  - Name
  - Email
  - Member ID

###  Borrowing System
- Borrow books with availability checks
- Return books with automatic copy restoration
- Track **due dates** and **borrowing history**
- View currently borrowed books

###  Late Fee Calculation
- Automatic late fee calculation based on overdue days
- Configurable daily fee rate

###  Book Reservation
- Reserve books when no copies are available
- FIFO (First-In, First-Out) reservation queue
- Automatic fulfillment when a book is returned

###  Authentication & Authorization
- JWT-based authentication
- Role-based access:
  - **Librarian**
    - Manage books
    - View all records
  - **User**
    - Borrow, return, and reserve books

---

##  Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (`jsonwebtoken`)
- **Security:** `bcryptjs`
- **API Testing:** Insomnia

---

##   Project Structure

```bash
Library_management_system_api/
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   ├── borrowerController.js
│   ├── borrowController.js
│   └── reservationController.js
│
├── models/
│   ├── bookModel.js
│   ├── borrowerModel.js
│   ├── borrowRecordModel.js
│   ├── reservationModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── borrowerRoutes.js
│   ├── borrowRoutes.js
│   └── reservationRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

---
##   Installation & Setup

  **Clone repository:**
  - git clone https://github.com/lapingaro/Library_management_system_api.git
  - cd Library_management_system_api

   **Install dependencies:**
     - npm install
   
   **Create environment variables:**
    - Create a .env file in the root directory:

     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key

     **Run the server:**
       node server.js

    **Yous should see:**:
      * Successful connection to MongoDB
      * Server running on port 3000

---
## Authentication
   
 * Register a user
     - POST /api/auth/register

 * Login
     - POST /api/auth/login

*  Copy the returned JWT token
* Send the token in request headers:




   



   

