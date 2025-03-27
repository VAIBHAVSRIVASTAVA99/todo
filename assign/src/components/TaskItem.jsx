import React from 'react'

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <div className="task-content">
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <span className={`priority ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          {task.isOutdoor && (
            <>
              <span className="outdoor">🌳 Outdoor</span>
              <span className="weather">{task.weather}</span>
            </>
          )}
          <span className="timestamp">
            about {Math.round((Date.now() - new Date(task.timestamp).getTime()) / 3600000)} hours ago
          </span>
        </div>
      </div>
      <button onClick={() => deleteTask(task.id)} className="delete-btn">
        🗑
      </button>
    </div>
  )
}

export default TaskItem