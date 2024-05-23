import React, { useState, useEffect, useCallback, useRef } from 'react';
import "tailwindcss/tailwind.css";

const App = () => {
  const [usernameLength, setUsernameLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [email, setEmail] = useState('');

  // use of ref hooks
  const emailRef = useRef();

  const emailGenerator = useCallback(() => {
    let username = '';
    let userStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      userStr += '0123456789';
    }
    if (charAllowed) {
      userStr += '._';
    }
    for (let i = 0; i < usernameLength; i++) {
      let char = Math.floor(Math.random() * userStr.length);
      username += userStr.charAt(char);
    }
    const emailGenerated = `${username}@gmail.com`;
    setEmail(emailGenerated);
  }, [usernameLength, numberAllowed, charAllowed]);

  // Create copy to clipboard
  const copyEmailToClipboard = useCallback(() => {
    emailRef.current?.select();
    emailRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(email);
  }, [email]);

  useEffect(() => {
    emailGenerator();
  }, [usernameLength, numberAllowed, charAllowed, emailGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 bg-gray-500 text-blue-700'>
      <h1 className='text-white text-center my-3'>Email Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text' 
          placeholder='Email' 
          readOnly 
          className='outline-none w-full py-1 px-3' 
          value={email} 
          ref={emailRef} 
        />
        <button 
          className='outline-none bg-blue-700 text-teal-50 px-3 py-0.5 shrink-0' 
          onClick={copyEmailToClipboard}
        >
          Copy
        </button>
      </div>
      <div className='flex flex-col text-sm gap-y-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type='range' 
            min={5} 
            max={20} 
            className='cursor-pointer' 
            value={usernameLength} 
            onChange={(e) => setUsernameLength(Number(e.target.value))} 
          />
          <label htmlFor='usernameLength'>User Name Length: {usernameLength}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox' 
            id='numberInput' 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)} 
          />
          <label htmlFor='numberInput'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox' 
            id='charInput' 
            checked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)} 
          />
          <label htmlFor='charInput'>Include Characters (._)</label>
        </div>
      </div>
    </div>
  );
}

export default App;
