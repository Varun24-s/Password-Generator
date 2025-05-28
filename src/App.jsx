import { useCallback, useRef, useState, useEffect } from 'react';

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
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passRef = useRef(null);

  const copyToclipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numberAllowed, charAllowed, passGenerator]);

  return (
    // On mobile screens the background is black.
    // On medium screens and above the background image is applied.
    <div className="fixed inset-0 flex items-center justify-center 
                bg-black md:bg-[url('https://www.solutions4it.co.uk/wp-content/uploads/2023/08/password-attacks.jpg')] 
                bg-cover bg-center text-orange-500 font-WDXL 
                overflow-hidden">


      <div className="w-full max-w-3xl mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-[#02112b] text-orange-500 h-80 opacity-90">
        <h1 className="text-white text-2xl text-center my-3">Password Generator</h1>
        <div className="flex overflow-hidden my-8">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="bg-white w-full rounded-l-md px-2 py-2 my-2 outline-none"
            ref={passRef}
          />
          <button
            className="bg-blue-700 text-white px-4 py-2 my-2 rounded-r-md cursor-pointer hover:bg-blue-800 hover:border-black hover:border"
            onClick={copyToclipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-around max-w-lg my-10 space-y-4 sm:space-y-0 sm:space-x-6">
  <div className="flex items-center gap-2 mx-auto">
    <input
      type="range"
      min={6}
      max={100}
      value={length}
      className="cursor-pointer"
      onChange={(e) => setLength(Number(e.target.value))}
    />
    <label>Length: {length}</label>
  </div>
  <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 mx-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={numberAllowed}
        onChange={() => setNumberAllowed(prev => !prev)}
      />
      Number
    </label>
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={charAllowed}
        onChange={() => setCharAllowed(prev => !prev)}
      />
      Characters
    </label>
  </div>
</div>

      </div>
    </div>
  );
}

export default App;
