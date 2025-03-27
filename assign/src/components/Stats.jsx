import React from 'react'

function Stats({ stats }) {
  return (
    <aside className="stats">
      <h2>Task Statistics</h2>
      <div className="stat-item">
        <label>Total Tasks:</label>
        <span>{stats.total}</span>
      </div>
      <div className="stat-item">
        <label>Completed:</label>
        <span>{stats.completed}</span>
      </div>
      <div className="stat-item">
        <label>High Priority:</label>
        <span>{stats.highPriority}</span>
      </div>
    </aside>
  )
}

export default Stats