import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { submitTransaction } from '../../scripts/faucet-client';

import type {DefaultSession} from 'next-auth'

export function TokenForm(prop: {session: DefaultSession}) {
  const [address, setAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClick = async () => {
    const response = await submitTransaction(address);

    if(response.successful) {
      setMessage("The transaction was submitted successfully");
    }
    else if(response.error){
      setMessage("Error " + response.error || "An error ocurred while trying to submit the transaction");
    }
  }

  return ( 
    <div>
    <p className="mt-3 text-2xl">
      Welcome {prop.session?.user?.name}
    </p>
    <p className="mt-3 text-2xl">
    Your address
    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" onChange={(e) => setAddress(e.target.value)}/>
    
    </p>
    <p className="mt-3 text-2xl">
      <button onClick={handleClick} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Request Tokens
      </button>
    </p>
    <p className="mt-3 text-2xl">
      {message}
    </p>
    </div>
  )
}