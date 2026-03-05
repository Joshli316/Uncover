ALTER TABLE leads ADD COLUMN ip TEXT DEFAULT 'unknown';

CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  mode TEXT NOT NULL,
  ip TEXT DEFAULT 'unknown',
  payload TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
