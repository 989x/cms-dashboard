'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SERVER_IP } from '@/api/config';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '@/api/login';
import { storeAuthToken } from '@/utils/authStorage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password || !isHuman) {
      setError('Please fill out all fields and confirm you are not a bot.');
      return;
    }
    try {
      const data = await login(username, password);
      storeAuthToken(data.token);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center h-screen sm:bg-gray-200'>
      <div className='bg-white px-4 sm:p-8 sm:rounded-xl sm:shadow-md w-full sm:max-w-md'>
        <div className='mb-10 sm:mb-8 flex flex-col sm:items-center'>
          <Image
            src='/favicon.png'
            alt='Logo'
            width={56}
            height={56}
            priority
          />
          <h1 className='text-2xl font-bold text-gray-800 mt-6 sm:mt-4 text-left sm:text-center'>
            Welcome back!
          </h1>
          <p className='text-gray-600 text-sm mt-2 text-left sm:text-center'>
            Access to the CMS at{' '}
            <span className='text-blue-600 font-medium'>{SERVER_IP}</span>
          </p>
        </div>
        {error && (
          <p className='text-red-500 text-sm mb-4 text-left sm:text-center'>
            {error}
          </p>
        )}
        <div className='space-y-5'>
          <div>
            <label className='block text-gray-600 font-medium mb-2'>
              Username
            </label>
            <input
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full py-2 px-3 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label className='block text-gray-600 font-medium mb-2'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full py-2 px-3 border border-gray-300 rounded-md'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='notABot'
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)}
              className='h-4 w-4 text-blue-600 border-gray-300 rounded'
            />
            <label htmlFor='notABot' className='ml-2 text-gray-600 text-sm'>
              I am not a bot
            </label>
          </div>
        </div>
        <button
          onClick={handleLogin}
          disabled={!username || !password || !isHuman}
          className={`mt-8 w-full py-2 rounded-md font-medium ${
            !username || !password || !isHuman
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white'
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
}
