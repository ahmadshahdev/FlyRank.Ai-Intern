const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Stage 2: In-memory storage
let tasks = [
	{ id: 1, title: "Learn Express", done: true },
	{ id: 2, title: "Build CRUD API", done: false },
	{ id: 3, title: "Deploy to GitHub", done: false },
];
let nextId = 4;

// Stage 0 & 1: Hello Server & Health endpoints
app.get("/", (req, res) => {
	res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

// Stage 2: Read (List all tasks)
app.get("/tasks", (req, res) => {
	res.status(200).json(tasks);
});

// Stage 2: Read (Single task)
app.get("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const task = tasks.find((t) => t.id === taskId);

	if (!task) {
		return res.status(404).json({ error: `Task ${taskId} not found` });
	}

	res.status(200).json(task);
});

// Stage 3: Create
app.post("/tasks", (req, res) => {
	const { title } = req.body;

	if (!title || title.trim() === "") {
		return res.status(400).json({ error: "Title is required" });
	}

	const newTask = {
		id: nextId++,
		title: title,
		done: false,
	};

	tasks.push(newTask);
	res.status(201).json(newTask);
});

// Stage 4: Update
app.put("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const taskIndex = tasks.findIndex((t) => t.id === taskId);

	if (taskIndex === -1) {
		return res.status(404).json({ error: `Task ${taskId} not found` });
	}

	const { title, done } = req.body;

	// Validate body is not completely empty
	if (title === undefined && done === undefined) {
		return res
			.status(400)
			.json({ error: "Provide a title or done status to update" });
	}

	if (title !== undefined) tasks[taskIndex].title = title;
	if (done !== undefined) tasks[taskIndex].done = done;

	res.status(200).json(tasks[taskIndex]);
});

// Stage 4: Delete
app.delete("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const taskIndex = tasks.findIndex((t) => t.id === taskId);

	if (taskIndex === -1) {
		return res.status(404).json({ error: `Task ${taskId} not found` });
	}

	// Remove the task from the array
	tasks.splice(taskIndex, 1);

	// 204 No Content
	res.status(204).send();
});

// Stage 5: Swagger UI Setup
const customSwaggerOptions = {
	// Injects a clean, dark "Material Design" theme from a CDN
	customCssUrl:
		"https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",
	// Hides the ugly green Swagger top bar
	customCss: ".swagger-ui .topbar { display: none }",
	// Changes the browser tab name
	customSiteTitle: "Task API Documentation",
};

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, customSwaggerOptions),
);
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
	console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
