# 🛠️ Skill Swap Platform

## 🚀 Problem Statement

Build a **Skill Swap Platform** — a mini-application that enables users to list their skills and request others in return.  
The platform fosters a community of collaborative learning and sharing by allowing users to **swap skills** with one another.

---

## 👥 Team

| Name                   | Role        | Email                       |
|------------------------|-------------|-----------------------------|
| **Venkatesh Rapolu**   | Team Leader | rapoluvenky7@gmail.com      |
| **Dhruv Raval**        | Team Member | dhruvraval150@gmail.com     |
| **Alokkumar Kushwaha** | Team Member | alokkushwaha881@gmail.com   |

---

## 📦 Features

- ✨ User Profile (Name, Location, Profile Photo)
- 🧠 List of Skills Offered
- 🎯 List of Skills Wanted
- 📆 Availability Preferences (Weekends, Evenings)
- 🔒 Public/Private Profile Toggle
- 🔍 Browse/Search Users by Skills
- 🔁 Request & Accept Skill Swaps

---

## 🧰 Tech Stack

| Layer       | Technology     |
|-------------|----------------|
| Frontend    | React.js (Vite) |
| Backend     | Spring Boot     |
| Database    | MySQL           |
| AI Services | Gemini API      |

---

## 🚀 Run Locally

### 🔧 Prerequisites

- Node.js (for frontend)
- MySQL (for backend)
- Java 17+ & Maven

---

### 💻 Frontend Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your Gemini API key
echo "GEMINI_API_KEY=your_gemini_api_key" > .env.local

# 3. Run the app
npm run dev
```



### 🖥️ Backend Setup
```bash
Install MySQL and create a new database (e.g., skill_swap_db).

Update the following in application.properties:

properties
Copy
Edit
spring.application.name=odooproject-Backend

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.datasource.url=jdbc:mysql://localhost:3306/skill_swap_db
spring.datasource.username=root
spring.datasource.password=your_password

server.port=8080

spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
logging.level.org.springframework.data=DEBUG




run the backend
./mvnw spring-boot:run
