import { useCallback, useRef } from 'react';
import { useState } from 'react'
import { useEffect } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const passRef = useRef(null)

  const copyToclipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }
    , [password])
  useEffect(() => {
    passGenerator()
  }, [length, numberAllowed, charAllowed, passGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[url(https://www.solutions4it.co.uk/wp-content/uploads/2023/08/password-attacks.jpg)] font-WDXL">
      <div className="w-full max-w-3xl mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-[#02112b] text-orange-500 h-80 opacity-90">
        <h1 className='text-white text-2xl text-center my-3'>Password generator</h1>
        <div className='flex overflow-hidden my-8'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            className='bg-white w-full rounded-l-md px-2 py-2 my-2 outline-none'
            ref={passRef}
          />
          <button
            className='bg-blue-700 text-white px-4 py-2 my-2 rounded-r-md cursor-pointer hover:bg-blue-800 hover:border-black hover:border-1'
            onClick={copyToclipboard}
          >
            Copy
          </button>

        </div>
        <div className='flex justify-around max-w-lg my-10'>
          <div className='flex gap-x-2 mx-auto'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='gap-x-2 flex mx-6'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed(prev => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className='gap-x-2 flex'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed(prev => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>

    </div>
  );

}

export default App
