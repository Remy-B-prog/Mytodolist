import React from 'react'
import Button from '../component/Button'

export default function home() {
  return (
    <div>
      <h1 className='flex justify-center ' >homepage</h1>
      <div className='flex justify-center'> 
      <Button text='S inscrire' redirection='/inscription'/>
      </div>
    </div>
  )
}
