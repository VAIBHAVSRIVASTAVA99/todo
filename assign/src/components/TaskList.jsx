import React from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, filter, setFilter, stats, filteredTasks, toggleTask, deleteTask }) {
  return (
    <section className="task-list">
      <h2>Your Tasks</h2>
      <div className="task-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          Pending ({tasks.length - stats.completed})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>
      <div className="tasks">
        {filteredTasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </section>
  )
}

export default TaskList