import { useForm } from 'react-hook-form';
import { Turnstile } from '@marsidev/react-turnstile';
import { useState } from "react"

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
    alert(JSON.stringify(data, null, 4))
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input placeholder='First name' {...register('firstName')} />
          <input placeholder='Last name' {...register('lastName', { required: true })} />
          <input type='submit' />

          <Turnstile 
            onSuccess={setTurnstileResponse} 
            onError={() => setTurnstileError('Invalid captcha response, please try again later.')} 
            onExpire={() => setTurnstileError('Your captcha response has expired, please try again.')} 
            siteKey='0x4AAAAAAABeHJ1RWCe4V-HV' 
          />
        </form>
        {turnstileError || (errors.lastName && <p>Last name is required.</p>)}

      </div>
    </div>
  );
}

export default App;
