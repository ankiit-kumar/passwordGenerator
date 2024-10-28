import { useCallback, useState,useEffect,useRef} from 'react'

function App() {
  const [length,setLength]=useState(8);//it means that the password length minimum val is 8
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("")

  /*syntax of hooks
  hook name(function,dependency)
  function is in either regular fn call or arrow fn
  dependency is passed in the form of array
  example:-
  useCallback(fn,[a1,a2,a3])
  here a1,a2,a3 are dependencies due to which the changes will be visible
  */
const passwordRef=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*()_+:?/<>,.[]}{*/|"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    
    }
    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword])
  useEffect(()=>{passwordgenerator()},[length,numAllowed,charAllowed,passwordgenerator])
  const copyToClip=useCallback(()=>{
    passwordRef.current?.select()//highlights the selected password that has been copied
    //passwordRef.current?.setSelectionRange(0,10)//allows us to select only upto a range of password
    window.navigator.clipboard.writeText(password)//allows us to copy the password to the clipboard
  },[password])

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-emerald-950">
      {/*the above div is to get the below div to center of the view page */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8  text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyToClip}
          className='outline-none text-white bg-blue-700 py-0.5 px-3 shrink-0  transition duration-300 ease-in-out 
                  hover:bg-blue-600 hover:scale-90'>copy</button>    
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}//minimum length of password
            max={40}//maximum length of password
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length:{length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={()=>{
              setNumAllowed((prev)=>!prev)
            }}/>
            <label htmlFor="numberInput">number</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev)=>!prev)//helps us to toggle between the previous value, if it was checked then we can uncheck it next time
            }}/>
            <label htmlFor="charInput">character</label>

          </div>

        </div>
      </div>
      </div>
      
    </>
  )
}

export default App
