import { Outlet, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Layout() {

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  // Timer state
  const [runningTime, setRunningTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Timer logic
  useEffect(() => {
    let timer

    if (isRunning) {
      timer = setInterval(() => {
        setRunningTime(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning])

  // Format timer
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hrs.toString().padStart(2,'0')}:${mins
      .toString()
      .padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
  }

  // Controls
  const handleStart = () => setIsRunning(true)

  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setRunningTime(0)
    setIsRunning(false)
  }

  const handleStop = () => {
    setRunningTime(0)
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Dk Micro finance"
            className="w-30 h-20 rounded-full object-contain shrink-0"
          />

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Dk Micro finance demo section
            </h1>
            <p className="text-xs text-slate-500">
              ENTERPRISE DATA VALIDATION
            </p>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink to="/mutual-fund" className={navLinkClass}>
            Mutual Fund
          </NavLink>
          <NavLink to="/banking" className={navLinkClass}>
            Banking
          </NavLink>
          <NavLink to="/mortgage" className={navLinkClass}>
            Mortgage
          </NavLink>
        </nav>

        {/* Right Section (Timer) */}
        <div className="flex items-center gap-3">

          {/* Timer Display */}
          <div className="bg-slate-100 px-4 py-2 rounded-md text-sm font-mono font-semibold"
          style={{height:'40px', width:"120px", fontSize:"20px"}}>
            {formatTime(runningTime)}
          </div>

          {/* Buttons */}
          {!isRunning ? (
            <>
              <button
                onClick={handleStart}
                className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                style={{height:'40px', width:"100px", fontSize:"20px"}}
              >
                Start
              </button>

              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-600"
                style={{height:'40px', width:"100px", fontSize:"20px"}}
              >
                Reset
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                style={{height:'40px', width:"100px", fontSize:"20px"}}
              >
                Pause
              </button>

              <button
                onClick={handleStop}
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                style={{height:'35px', width:"100px", fontSize:"20px"}}
              >
                Stop
              </button>
            </>
          )}

        </div>

      </header>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  )
}