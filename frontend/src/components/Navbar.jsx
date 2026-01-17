import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import { BellIcon, HeartHandshake, LogOutIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  });

  return (
    <nav className='
      bg-base-200 
      border-b border-base-300/70 
      sticky top-0 z-30 h-16 
      flex items-center
      
    '>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between w-full'>

          {/* Left area */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5">
              <HeartHandshake className='size-8 text-primary' />
              <span className='text-2xl font-bold tracking-wide'>
                EasyTalk
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Right area */}
          <div className='flex items-center gap-3 sm:gap-4 ml-auto'>

            {/* Notifications */}
            <Link to="/notifications">
              <button className='btn btn-ghost btn-circle hover:bg-base-300'>
                <BellIcon className='h-6 w-6 opacity-70' />
              </button>
            </Link>

            {/* Theme switcher */}
            <ThemeSelector />

            {/* Avatar */}
            <div className='avatar'>
              <div className='w-9 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-200'>
                <img src={authUser?.profilePic} alt="user avatar" />
              </div>
            </div>

            {/* Logout */}
            <button
              className='btn btn-ghost btn-circle hover:bg-base-300'
              onClick={logoutMutation}
              title="Logout"
            >
              <LogOutIcon className='h-6 w-6 opacity-70' />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
