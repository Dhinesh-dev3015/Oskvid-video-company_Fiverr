'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError('')

      // Simple authentication - in production, use proper authentication
      if (
         username === 'AdminCmsPanelAdminstrators' &&
         password === 'AdminstratorsOskVidPanelis123!'
      ) {
         localStorage.setItem('cms_user', username)
         router.push('/admin/simple-cms')
      } else {
         setError('Nepareizs lietotājvārds vai parole')
      }

      setIsLoading(false)
   }

   return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4'>
         <Card className='w-full max-w-md shadow-xl border-0'>
            <CardHeader className='text-center space-y-2 pb-6'>
               <div className='mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4'>
                  <LogIn className='h-8 w-8 text-white' />
               </div>
               <CardTitle className='text-2xl font-bold text-gray-900'>
                  CMS Pieslēgšanās
               </CardTitle>
               <CardDescription className='text-gray-600'>
                  Pieslēdzieties, lai pārvaldītu vietnes saturu
               </CardDescription>
            </CardHeader>

            <CardContent>
               <form onSubmit={handleLogin} className='space-y-4'>
                  <div className='space-y-2'>
                     <Label
                        htmlFor='username'
                        className='text-sm font-medium text-gray-700'
                     >
                        Lietotājvārds
                     </Label>
                     <Input
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='bg-white text-gray-900 border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                        placeholder='Ievadiet lietotājvārdu'
                        required
                     />
                  </div>

                  <div className='space-y-2'>
                     <Label
                        htmlFor='password'
                        className='text-sm font-medium text-gray-700'
                     >
                        Parole
                     </Label>
                     <div className='relative'>
                        <Input
                           id='password'
                           type={showPassword ? 'text' : 'password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className='bg-white text-gray-900 border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10'
                           placeholder='Ievadiet paroli'
                           required
                        />
                        <button
                           type='button'
                           onClick={() => setShowPassword(!showPassword)}
                           className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                           {showPassword ? (
                              <EyeOff className='h-4 w-4' />
                           ) : (
                              <Eye className='h-4 w-4' />
                           )}
                        </button>
                     </div>
                  </div>

                  {error && (
                     <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
                        {error}
                     </div>
                  )}

                  <Button
                     type='submit'
                     disabled={isLoading}
                     className='w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium'
                  >
                     {isLoading ? 'Pieslēdzas...' : 'Pieslēgties'}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
