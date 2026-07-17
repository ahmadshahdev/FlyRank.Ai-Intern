# WEEK 2 ASSIGNMENT 1 CRUD API

A simple, in-memory RESTful API built with Node.js and Express to manage a daily to-do list. This project was built for Week 2 Assignment 1, demonstrating foundational CRUD (Create, Read, Update, Delete) operations and API documentation using Swagger UI.

## Features
* **In-memory Storage:** Tasks are stored in memory (resets on server restart).
* **Full CRUD Operations:** Support for GET, POST, PUT, and DELETE methods.
* **Input Validation:** Rejects invalid or empty requests with `400 Bad Request`.
* **Standardized Status Codes:** Correct usage of `200`, `201`, `204`, `400`, and `404`.
* **Interactive Documentation:** Integrated Swagger UI for testing endpoints directly in the browser.

## Getting Started

Follow these steps to run the API on your local machine.

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Run Command
Run the following commands in your terminal to start the server:

```bash
# Install dependencies
npm install

# Start the server
node index.js
```
*The server will start on `http://localhost:3000`.*

## Endpoints

| CRUD Operation | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Read (All)** | `GET` | `/tasks` | Retrieves an array of all tasks. |
| **Read (Single)**| `GET` | `/tasks/:id` | Retrieves a specific task by its ID. |
| **Create** | `POST` | `/tasks` | Creates a new task. Requires a JSON body with a `title`. |
| **Update** | `PUT` | `/tasks/:id` | Updates an existing task's `title` or `done` status. |
| **Delete** | `DELETE` | `/tasks/:id` | Deletes a task by its ID. |
| **Health Check** | `GET` | `/health` | Returns server health status. |

## Example Request

Here is an example of fetching all tasks using `curl`:

**Command:**
```bash
curl -i http://localhost:3000/tasks
```

**Output:**
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 135
ETag: W/"87-dC/R/B4+Z0..."
Date: Fri, 17 Jul 2026 12:00:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
  {"id":1,"title":"Learn Express","done":true},
  {"id":2,"title":"Build CRUD API","done":false},
  {"id":3,"title":"Deploy to GitHub","done":false}
]
```

## Swagger UI Documentation

You can view and interact with the full API documentation without using the terminal. 
Once the server is running, open your browser and visit:
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

*(Replace the placeholder below with your actual screenshot before submitting)*
![Swagger UI Screenshot](./screenshot.png)

---
## Images
<img src="./swagger images/Screenshot (19).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (20).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (21).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (22).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (23).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (24).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (25).png alt="Swagger UI Screenshot" width="500" heigth = "auto">
<img src="./swagger images/Screenshot (26).png alt="Swagger UI Screenshot" width="500" heigth = "auto">



---
### Stage 7: AI vs Me (Optional)
*If you completed the AI Rematch bonus stage, document your findings here:*
* **What the AI did better:** [Your observation here]
* **What it got wrong/ignored:** [Your observation here]
* **What my prompt forgot to specify:** [Your observation here]

---
**Author:** Syed Ahmad Shah