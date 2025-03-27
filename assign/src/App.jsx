import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Stats from './components/Stats'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isOutdoor, setIsOutdoor] = useState(false)
  const [filter, setFilter] = useState('all')
  const [weather, setWeather] = useState(null)
  const OPENWEATHERMAP_API_KEY = '4f5729a7b0c4699069a36941505f6c1c'

  const getWeather = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported');
      setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
      return;
    }
    const showLocationPermissionPrompt = () => {
      const confirm = window.confirm(
        "Location access is needed to get local weather. Would you like to:\n" +
        "1. Try again and allow location access\n" +
        "2. Continue with default weather"
      );

      if (confirm) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
      }
    };
    const successCallback = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather fetch failed');
        }

        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].main,
          city: data.name
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
      }
    };
    const errorCallback = (error) => {
      console.error('Geolocation error:', error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          showLocationPermissionPrompt();
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable. Using default weather.");
          setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
          break;
        case error.TIMEOUT:
          alert("Location request timed out. Using default weather.");
          setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
          break;
        default:
          setWeather({ temp: 27, description: 'Sunny', city: 'Unknown' });
      }
    };
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (isOutdoor) {
      getWeather()
    }
  }, [isOutdoor])

  const addTask = () => {
    if (!taskInput.trim()) return

    const newTask = {
      id: Date.now(),
      description: taskInput,
      priority,
      isOutdoor,
      completed: false,
      timestamp: new Date().toISOString(),
      weather: isOutdoor && weather
        ? `${weather.description}, ${weather.temp}°C in ${weather.city}`
        : null
    }

    setTasks([...tasks, newTask])
    setTaskInput('')
    setIsOutdoor(false)
    setPriority('medium')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    highPriority: tasks.filter(task => task.priority === 'high').length
  }

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="content">
          <TaskForm
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            priority={priority}
            setPriority={setPriority}
            isOutdoor={isOutdoor}
            setIsOutdoor={setIsOutdoor}
            addTask={addTask}
            weather={weather}
          />
          <TaskList
            tasks={tasks}
            filter={filter}
            setFilter={setFilter}
            stats={stats}
            filteredTasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
        <Stats stats={stats} />
      </main>
    </div>
  )
}

export default App