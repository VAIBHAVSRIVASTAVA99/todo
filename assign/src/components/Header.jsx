import React from 'react'

function Header() {
  return (
    <header className="text-center">
      <h1>Advanced Task Manager</h1>
      <div className="user-info">
        <span className="avatar">👤</span>
        <div>
          <h2>Vaibhav Srivastava</h2>
          <p>Welcome back!</p>
        </div>
      </div>
    </header>
  )
}

export default Header