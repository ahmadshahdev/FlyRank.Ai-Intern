const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// NEW: Using Node's built-in SQLite instead of better-sqlite3!
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(express.json());

// ==========================================
// STAGE 0: Database Setup
// ==========================================
// Create 'tasks.db' using the built-in DatabaseSync
const db = new DatabaseSync('tasks.db');

// Create the table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);

// Check if table is empty. If it is, insert 3 example tasks.
const checkCount = db.prepare('SELECT COUNT(*) AS count FROM tasks');
const rowCount = checkCount.get();

if (rowCount.count === 0) {
    const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
    insert.run('Learn Express', 1);
    insert.run('Build CRUD API', 0);
    insert.run('Connect to SQLite', 0);
    console.log("Database seeded with initial tasks.");
}

// ==========================================
// API ENDPOINTS (API Layer remains identical)
// ==========================================

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "2.0 (Built-in DB Edition)", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// STAGE 1: Read (List all tasks)
app.get('/tasks', (req, res) => {
    const query = db.prepare('SELECT * FROM tasks');
    const rows = query.all();
    
    // SQLite stores booleans as 1/0. We map them back to true/false for the client.
    const tasks = rows.map(row => ({
        id: row.id,
        title: row.title,
        done: row.done === 1
    }));
    
    res.status(200).json(tasks);
});

// STAGE 1: Read (Single task)
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const query = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = query.get(taskId);

    if (!task) {
        return res.status(404).json({ error: `Task ${taskId} not found` });
    }
    
    res.status(200).json({
        id: task.id,
        title: task.title,
        done: task.done === 1
    });
});

// STAGE 2: Create
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
    }

    const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
    const info = insert.run(title, 0); // 0 means false

    res.status(201).json({
        id: info.lastInsertRowid,
        title: title,
        done: false
    });
});

// STAGE 3: Update
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    const existingTaskQuery = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const existingTask = existingTaskQuery.get(taskId);
    
    if (!existingTask) {
        return res.status(404).json({ error: `Task ${taskId} not found` });
    }

    const { title, done } = req.body;
    if (title === undefined && done === undefined) {
        return res.status(400).json({ error: "Provide a title or done status to update" });
    }

    const newTitle = title !== undefined ? title : existingTask.title;
    let newDone = existingTask.done;
    
    if (done !== undefined) {
        newDone = done ? 1 : 0; 
    }

    const update = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?');
    update.run(newTitle, newDone, taskId);

    res.status(200).json({
        id: taskId,
        title: newTitle,
        done: newDone === 1
    });
});

// STAGE 3: Delete
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    const del = db.prepare('DELETE FROM tasks WHERE id = ?');
    const info = del.run(taskId);

    // info.changes tells us how many rows were deleted
    if (info.changes === 0) {
        return res.status(404).json({ error: `Task ${taskId} not found` });
    }

    res.status(204).send();
});

// ==========================================
// SWAGGER UI SETUP
// ==========================================
const customSwaggerOptions = {
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Task API Documentation"
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, customSwaggerOptions));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});