# FullStackTodoApp

A simple full-stack Todo application built to practice frontend development, backend API integration, and CRUD operations using JavaScript and Node.js.

The application provides a user interface to create, retrieve, and delete todo items through HTTP requests to a backend server.

## Features

- **Create Todos** — Add a todo with a title and description.
- **Read Todos** — Fetch and display todo items from the backend.
- **Delete Todos** — Remove an individual todo using its ID.
- **REST API Integration** — Communicate with the backend using JavaScript's Fetch API.
- **Dynamic UI Updates** — Render todo items dynamically using DOM manipulation.
- **Input Validation** — Check that required fields are provided before submitting.
- **Error Handling** — Handle unsuccessful API responses and network errors.
- **Responsive UI** — A clean interface with an Apple-inspired design, rounded cards, and subtle shadows.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | DOM manipulation and application logic |
| Node.js | Backend JavaScript runtime |
| Express.js | HTTP server and API routes |
| Fetch API | Frontend-to-backend communication |
| JSON | Request and response data format |

## Architecture

The application follows a client-server architecture.

```text
┌──────────────────────────────┐
│        Frontend              │
│                              │
│     HTML + CSS + JavaScript  │
│                              │
│   Add / Fetch / Delete Todos │
└──────────────┬───────────────┘
               │
               │ HTTP Requests
               │ JSON
               ▼
┌──────────────────────────────┐
│         Backend              │
│                              │
│       Node.js + Express      │
│                              │
│       Todo REST API          │
└──────────────────────────────┘
```

The frontend collects input from the user and sends HTTP requests to the backend. The backend processes those requests and returns HTTP responses, which the frontend uses to update the interface.

## Project Structure

```text
FullStackTodoApp/
├── backend/
│   └── ...              # Backend server and API implementation
├── frontend/
│   └── public/
│       └── ...          # Frontend static assets
├── .gitignore
└── README.md
```

The exact internal files may differ as the project evolves.

## Getting Started

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/) — includes npm.
- [Git](https://git-scm.com/) — for cloning the repository.
- A modern web browser.
- A code editor such as Visual Studio Code.

### 1. Clone the repository

```bash
git clone https://github.com/satishkumarpeddi/FullStackTodoApp.git
cd FullStackTodoApp
```

### 2. Set up the backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Start the backend using the script configured in your `package.json`.

For example, if your project defines a `dev` script:

```bash
npm run dev
```

Alternatively, use the appropriate start script or entry-point file from your backend project.

The frontend examples use the following backend address:

```text
http://localhost:3000
```

Ensure the backend is running on port `3000`, or update the frontend API URL to match your configuration.

### 3. Run the frontend

Open the frontend HTML file in your browser, or serve the frontend directory using a local static file server.

If your frontend is plain HTML, CSS, and JavaScript, it does not necessarily require a separate Node.js development server.

**Note:** If the frontend and backend run on different origins, configure CORS in Express to allow requests from the frontend origin.

## API Documentation

The frontend communicates with the backend using the following endpoints.

Base URL:

```text
http://localhost:3000
```

### 1. Get all todos

**Endpoint:** `GET /todos`

Retrieves the available todo items.

Example request:

```javascript
const response = await fetch("http://localhost:3000/todos");
const todos = await response.json();

console.log(todos);
```

Example response:

```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Build a backend API"
  },
  {
    "id": 2,
    "title": "Practice DSA",
    "description": "Solve coding problems"
  }
]
```

The response illustrates the expected data shape; actual fields depend on the backend implementation.

### 2. Create a todo

**Endpoint:** `POST /todos`

Creates a new todo using its title and description.

Example request:

```javascript
const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "Learn Express",
        description: "Build REST APIs"
    })
});
```

The `Content-Type: application/json` header tells the backend that the request body contains JSON data.

### 3. Delete a todo

**Endpoint:** `DELETE /todos/:id`

Deletes a todo using its unique identifier.

Example request:

```javascript
const id = 1;

const response = await fetch(
    `http://localhost:3000/todos/${id}`,
    {
        method: "DELETE"
    }
);

if (response.ok) {
    console.log("Todo deleted successfully");
}
```

Replace `1` with the ID of the todo you want to delete.

### API Summary

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/todos` | Retrieve todos |
| POST | `/todos` | Create a todo |
| DELETE | `/todos/:id` | Delete a todo |

These endpoints describe the frontend's current API usage. An update endpoint is not documented because an update operation has not been established in the supplied implementation.

## How the Application Works

### Creating a Todo

1. The user enters a title and description.
2. JavaScript reads the input values from the DOM.
3. The values are serialized into JSON using `JSON.stringify()`.
4. The Fetch API sends a `POST` request.
5. The backend processes the request.
6. After a successful response, the frontend clears the input fields and refreshes the displayed todos.

### Fetching Todos

1. The frontend sends a `GET` request to `/todos`.
2. The backend returns the todo data as JSON.
3. JavaScript parses the response using `response.json()`.
4. DOM methods create elements for each todo.
5. The todo title, description, and Delete button are displayed.

### Deleting a Todo

1. The user clicks the Delete button for a specific todo.
2. JavaScript retrieves that todo's ID.
3. A `DELETE` request is sent to `/todos/:id`.
4. After a successful response, the frontend fetches the updated list.
5. The remaining todos are rendered again.

## Concepts Demonstrated

This project provides hands-on practice with several important web development concepts:

- **Asynchronous JavaScript:** Using `async` and `await` for HTTP requests.
- **Promises:** Handling asynchronous operations.
- **Fetch API:** Sending GET, POST, and DELETE requests.
- **JSON Serialization:** Converting JavaScript objects into JSON.
- **DOM Manipulation:** Creating, updating, and clearing HTML elements dynamically.
- **Event Listeners:** Responding to button clicks.
- **HTTP Methods:** Understanding how different methods represent API operations.
- **Status Codes:** Checking `response.ok` and handling unsuccessful responses.
- **Client-Server Communication:** Connecting a browser-based interface to a backend API.
- **Error Handling:** Managing network failures and unsuccessful requests.

## Testing the Application

Test the following scenarios manually:

- [ ] Create a todo with a valid title and description.
- [ ] Verify that the new todo appears in the list.
- [ ] Fetch todos multiple times and confirm that duplicate entries are not rendered.
- [ ] Delete a todo and verify that it disappears.
- [ ] Try submitting empty input fields.
- [ ] Stop the backend and verify that network errors are handled.
- [ ] Check the browser's developer console for JavaScript errors.
- [ ] Verify that the API requests return the expected HTTP status codes.

## Future Improvements

Potential enhancements include:

- Update existing todos.
- Mark todos as completed.
- Persist todos in MongoDB or another database.
- Add user authentication with JWT.
- Associate each user's todos with their account.
- Add loading indicators and better error messages.
- Add automated backend API tests.
- Containerize the application using Docker.
- Deploy the frontend and backend.
- Add CI/CD automation.

These are potential future enhancements, not claims about features already implemented.

## Learning Outcomes

Building this project helps develop an understanding of how a frontend communicates with a backend API, how JSON data flows between client and server, and how to implement common CRUD operations.

It also provides a foundation for progressing toward database-backed applications, authentication, testing, and deployment.

## Author

**Satish Kumar Peddi**

GitHub: [@satishkumarpeddi](https://github.com/satishkumarpeddi)

