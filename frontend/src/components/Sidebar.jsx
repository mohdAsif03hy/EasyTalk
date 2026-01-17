import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation } from 'react-router'
import { Link } from 'react-router'
import { BellIcon, HeartHandshake, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react'

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname

  const navLinks = [
    { label: "Home", path: "/", icon: HomeIcon },
    // { label: "Friends", path: "/friends", icon: UserIcon },
    { label: "Notifications", path: "/notifications", icon: BellIcon },
  ]

  return (
    <aside className='
      w-64 
      bg-base-200
      border-r border-base-300/70
      hidden lg:flex flex-col 
      h-screen sticky top-0 
    '>

      {/* Brand */}
      <div className='px-5 py-4 border-b border-base-300/60'>
        <Link to="/" className='flex items-center gap-2.5 '>
          
          <HeartHandshake className='size-8 text-primary' />
          <span className='text-2xl font-bold tracking-wide'>
            EasyTalk
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-4 py-3 space-y-1'>
        {navLinks.map(({ label, path, icon: Icon }) => {
          const active = currentPath === path
          return (
            <Link
              key={path}
              to={path}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-md 
                transition-all duration-150
                hover:bg-base-300
                ${active 
                  ? "bg-primary/15 text-primary font-medium border-l-4 border-primary" 
                  : "text-base-content/80 hover:text-primary"
                }
              `}
            >
              <Icon className={`
                size-5 transition-colors duration-150
                ${active ? "text-primary" : "text-base-content/60 group-hover:text-primary"}
              `} />

              <span>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User Footer */}
      <div className='p-4 border-t border-base-300/60 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-10 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-200'>
              <img src={authUser.profilePic} alt="avatar" />
            </div>
          </div>
          <div className='flex-1 leading-tight'>
            <p className='font-semibold text-sm'>{authUser?.fullName}</p>
            <p className='text-xs text-success flex items-center gap-1'>
              <span className='size-2 rounded-full bg-success animate-pulse'/>
              Online
            </p>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar
