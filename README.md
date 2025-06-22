# 🏎️ Ride Showcase – JS Back-End Regular Exam

## 📚 Table of Contents

- [📋 Exam Rules](#-exam-rules)
- [🚀 Application Overview](#-application-overview)
- [🔐 Functional Requirements](#-functional-requirements)
- [🧾 Database Models](#-database-models)
- [📄 Application Pages (80 pts)](#-application-pages-80-pts)
- [🔐 Security and Route Guards (10 pts)](#-security-and-route-guards-10-pts)
- [⚠️ Validation and Error Handling (10 pts)](#validation-and-error-handling-10-pts)
- [🌟 Bonus – My Showcase (10 pts)](#bonus--my-showcase-10-pts)
- [🧪 How to Run](#-how-to-run)

---

## 📋 Exam Rules

- ⏱️ Time limit: **6 hours**
- ✅ Before submitting:
  - Delete the `node_modules` folder
  - Ensure all dependencies are listed in `package.json`
  - Archive the project (excluding `node_modules`)
- 🧑‍💻 Requirements:
  - Use the provided HTML and CSS (you can only add attributes, not modify existing ones)
  - Use Express.js as your backend framework
  - Use MongoDB with mongoose
  - Use bcrypt to hash passwords
  - Use any templating engine (EJS, Handlebars, Pug, etc.)
- ❌ NOT allowed:
  - Do not use React, Vue, Angular or any front-end frameworks
- 📦 Application start:
  - Must run from `index.js`
  - Must run on **port 3000**
  - Must start using `npm run start`
- ❗ Examiners:
  - Will run `npm install` then `npm run start`
  - Will not change or add anything to your code

---

## 🚀 Application Overview

Ride Showcase is a car post-sharing web app. Users can register, log in, post cars, view details, like other users’ posts, and edit/delete their own.

---

## 🔐 Functional Requirements

### 👤 Guest (Not Logged In)

- View Home page
- View Browse Rides page
- View Login and Register pages
- View Details page (without buttons)
  
![Picture1](https://github.com/user-attachments/assets/cd8a2d6f-dbfe-4680-ae5c-cf867229264d)

### 👥 Logged-in User

- View Home and all public pages
- Access Browse Rides
- Create a car post
- View car details with [Edit], [Delete] or [Like] options
- Logout
  
![Picture2](https://github.com/user-attachments/assets/1be75447-0eb9-4ac3-b4b8-bf89b54f26ea)

---

## 🧾 Database Models

### 🧑‍💼 User

| Field      | Type            | Required | Validation                 |
|------------|-----------------|----------|----------------------------|
| firstName  | String          | ✅        | min 3 characters           |
| lastName   | String          | ✅        | min 3 characters           |
| email      | String          | ✅        | min 10 characters          |
| password   | String (hashed) | ✅        | min 4 characters           |

### 🚗 Car

| Field         | Type              | Required | Validation                            |
|---------------|-------------------|----------|-------------------------------------|
| model         | String            | ✅        | min 2 characters                    |
| manufacturer  | String            | ✅        | min 3 characters                    |
| engine        | String            | ✅        | min 3 characters                    |
| topSpeed      | Number            | ✅        | number ≥ 10 (2-digit or more)       |
| image         | String (URL)      | ✅        | must start with http:// or https:// |
| description   | String (5–500)    | ✅        | length 5 to 500 characters          |
| likes         | Array of User IDs | ❌        | —                                   |
| owner         | ObjectId (User)   | ✅        | —                                   |



---

## 📄 Application Pages (80 pts)

### 🏠 Home Page

- Static content, accessible to all users
  
![Picture3](https://github.com/user-attachments/assets/fa6666dd-4fd8-437a-95e7-8cb5c775aaa2)

### 📝 Register Page

- Register a new user
- Auto-login after success
- Hash password using bcrypt
- Redirect to home
  
![Picture4](https://github.com/user-attachments/assets/10610baf-149b-484b-9f4c-e8a146b7e857)

### 🔐 Login Page

- Login with existing credentials
- Redirect to home page after success
  
![Picture5](https://github.com/user-attachments/assets/d997eae2-cff2-42c3-a6f3-d16184e8c845)

### 🚪 Logout

- Clear session info
- Redirect to home page

### 🚘 Browse Rides

- List all car posts
    ![Picture6](https://github.com/user-attachments/assets/dc5e6a71-3415-4737-bfb4-fb75cb22c526)
- If no posts: display “There are no car posts yet...”
  ![Picture7](https://github.com/user-attachments/assets/69d6cb4e-fd5a-4175-843b-7e9003a9fbab)
- Each post shows image, model, top speed, description, and a [Details] button




### 📑 Details Page


- Visible to all users
- Shows:
  - model, manufacturer, engine, top speed, description, image
  - Likes count and emails of users who liked it (or “No one has liked yet”)
  - If logged in:
    - Owner: [Edit] and [Delete]
      ![Picture9](https://github.com/user-attachments/assets/50a03797-0e46-4c78-90c4-fce9221285e8)
    - Not owner: [Like]
      ![Picture10](https://github.com/user-attachments/assets/14f7517b-7a7a-4d6e-ae57-486eb566175d)
  - Guests: no buttons visible
![Picture8](https://github.com/user-attachments/assets/bd257e3e-f4ae-427a-8fb3-2d579e613dfa)
    

### ➕ Add Car Post

- Only accessible to logged-in users
- On success, redirect to Browse Rides page

### ✏️ Edit Car Post

- Only the owner can edit
- Fields pre-filled with current data
- On success, redirect to Details page
  ![Picture11](https://github.com/user-attachments/assets/e5fc247b-8e5f-46dd-8db2-68f919ee7d9d)


### ❌ Delete Car Post

- Only the owner can delete
- On success, redirect to Browse Rides page

### ❤️ Like Post

- Only users who are NOT the owner can like
- Adds user ID to likes array
- Shows thank you message after like
- Redirects back to the Details page

---

## 🔐 Security and Route Guards (10 pts)

| Page / Action          | Guest | Logged-in | Post Owner |
|------------------------|--------|------------|-------------|
| Home                   | ✅      | ✅          | ✅           |
| Login / Register       | ✅      | ❌          | ❌           |
| Browse Rides           | ✅      | ✅          | ✅           |
| Details Page           | ✅      | ✅          | ✅           |
| Create Post            | ❌      | ✅          | ✅           |
| Edit/Delete Post       | ❌      | ❌          | ✅           |
| Like Post              | ❌      | ✅          | ❌           |
| My Showcase (Bonus)    | ❌      | ✅          | ✅           |

![Picture12](https://github.com/user-attachments/assets/0f6d208c-f556-4e41-9da4-ef12377a3a5d)


---

##  Validation and Error Handling (10 pts)

All error messages must appear inside:

```html
<div class="error-container">Your error message here</div>
```

# Bonus – My Showcase (10 pts)

This feature is available **only for logged-in users** and displays **only the user's own car posts**.

### Behavior:
- If the user has no car posts, it shows the message:
  
  > "You haven't added any cars yet."
![Picture14](https://github.com/user-attachments/assets/fa56ff1b-ba18-494f-b126-c3ba241259fb)


- If the user has car posts, each post displays the following details:
  - **Image** of the car
  - **Model** name
  - **Top speed**
  - **Manufacturer**
  - **Engine**
  - A **[Details]** button that links to more information about the car 
![Picture13](https://github.com/user-attachments/assets/075fa19e-6521-41c5-804f-14852bebc14b)
    

---

This feature helps users easily view and manage their personal car posts in the application.

# 🧪 **How to Run**

Install dependencies:

```bash
npm install
```
Start the application:
```bash
npm run start
```
or
```bash
npm run dev
```
Open in browser:
```bash
http://localhost:3000
```
