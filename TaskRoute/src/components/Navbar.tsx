import React from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav className='fixed bg-gray-500 top-0 left-0 w-full text-white flex items-center justify-between gap-6 px-6 py-4 z-50'>
        <h2>Study Hive</h2>
        <div className='flex gap-5'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="courses">Courses</NavLink>
          <NavLink to="instructor">Instructor</NavLink>
          <NavLink to="login">Login</NavLink>
          <NavLink to="signup">Sign up</NavLink>
        </div>
    </nav>
  )
}
