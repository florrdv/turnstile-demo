import { useForm } from 'react-hook-form';
import './App.css';
import { Turnstile } from '@marsidev/react-turnstile';
import {useState} from "react"

function App() {
  const [turnstileResponse, setTurnstileResponse] = useState(null)
  const [turnstileError, setTurnstileError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    if (!turnstileResponse || turnstileError) return
    data.turnstileResponse = turnstileResponse

    // Do something with the data
    // e.g.
    // await fetch("https://mydomain.com/myapi/vote", { method: "POST", "headers": { "content-type": "application/json" }, body: JSON.stringify(data) })
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <input {...register('lastName', { required: true })} />
        <input type="submit" />

        <Turnstile 
          onSuccess={setTurnstileResponse} 
          onError={() => setTurnstileError("Invalid captcha response, please try again later.")} 
          onExpire={() => setTurnstileError("Your captcha response has expired, please try again.")} 
          siteKey="0x4AAAAAAABeHJ1RWCe4V-HV" 
        />
      </form>
      {turnstileError || (errors.lastName && <p>Last name is required.</p>)}
    </div>
  );
}

export default App;
