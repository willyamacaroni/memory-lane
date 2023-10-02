const cors = require('cors');
const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(express.json())
app.use(cors());

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS memories`)
  db.run(`DROP TABLE IF EXISTS lanes`)
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lane_id INTEGER,
      name TEXT,
      description TEXT,
      timestamp DATE,
      image TEXT
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS lanes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      image TEXT
    )
  `)
})

app.get('/lanes', (req, res) => {
  db.all('SELECT * FROM lanes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ lanes: rows })
  })
})

app.post('/lanes', (req, res) => {
  const { name, description, image } = req.body

  if (!name || !description || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO lanes (name, description, image) VALUES (?, ?, ?)'
  )
  stmt.run(name, description, image, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/lanes/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM lanes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Lane not found' })
      return
    }
    res.json({ lane: row })
  })
})

app.get('/lanes/:id/memories', (req, res) => {
  const { id } = req.params
  db.all('SELECT * FROM memories WHERE lane_id = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!rows) {
      res.status(404).json({ error: 'No memories found' })
      return
    }
    res.json({ memories: rows })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, image = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, image, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})


app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.post('/memories', (req, res) => {
  const { lane_id, name, description, timestamp, image } = req.body

  if (!lane_id) {
    res.status(500).json({
      error: 'lane_id missing. Something went wrong',
    })
    return
  }
  if (!name || !description || !timestamp || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }
  console.log(lane_id, name, description, timestamp, image)

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image, lane_id) VALUES (?, ?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, image, lane_id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, image = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, image, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
