import React, { useState, useEffect } from 'react';
function TaskForm({ taskInput, setTaskInput, priority, setPriority, isOutdoor, setIsOutdoor, addTask }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const fetchWeatherFromBrowser = () => {
  };
  useEffect(() => {
    if (isOutdoor) {
      fetchWeatherFromBrowser();
    }
  }, [isOutdoor]);

  return (
    <section className="add-task">
      <h2>Add New Task</h2>
      <div className="task-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="task-input"
        />
        <div className="task-options">
          <div className="priority-options">
            <label>Priority</label>
            <div className="radio-group">
              {['low', 'medium', 'high'].map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={priority === level}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          </div>
          
          <div className="outdoor-container">
            <label className="outdoor-checkbox">
              <input
                type="checkbox"
                checked={isOutdoor}
                onChange={(e) => setIsOutdoor(e.target.checked)}
              />
              This is an outdoor activity
            </label>

            {locationError && (
              <div className="location-error" style={{color: 'red', marginBottom: '10px'}}>
                {locationError}
              </div>
            )}

            {weatherError && (
              <div className="weather-error" style={{color: 'red', marginBottom: '10px'}}>
                {weatherError}
              </div>
            )}

            {isOutdoor && weather && (
              <div className="weather-info">
                <img 
                  src={weather.icon} 
                  alt="Weather icon" 
                  style={{width: '50px', height: '50px'}}
                />
                <div>
                  <p>{weather.city}</p>
                  <p>{weather.description}, {weather.temp}°C</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={addTask} 
          disabled={!taskInput.trim()}
          className={`add-task-btn ${!taskInput.trim() ? 'disabled' : 'active'}`}
        >
          <span className="btn-text">
            {!taskInput.trim() ? 'Enter a task' : 'Add Task'}
          </span>
          <span className="btn-icon">
            {!taskInput.trim() ? '' : ''}
          </span>
        </button>
      </div>

      <style jsx>{`
        .add-task-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
          gap: 10px;
        }

        .add-task-btn.disabled {
          background-color: #e0e0e0;
          color: #888;
          cursor: not-allowed;
        }

        .add-task-btn.active {
          background-color: #4CAF50;
          color: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .add-task-btn.active:hover {
          background-color: #45a049;
        }

        .add-task-btn .btn-text {
          flex-grow: 1;
          text-align: center;
        }

        .add-task-btn .btn-icon {
          font-size: 1.2em;
        }
      `}</style>
    </section>
  );
}

export default TaskForm;