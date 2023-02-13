import { AiOutlineCopyrightCircle } from 'react-icons/ai';

export default function Footer() {

  return (
    <footer className="bg-brand-light-color-1 px-20 py-6" >
      <div className='text-center' >
        <span><AiOutlineCopyrightCircle /> </span>
        <p>All rights reserved</p>
      </div>
    </footer>
  )
}