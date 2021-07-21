import Head from 'next/head'
import { TokenForm } from './components/TokenForm';
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  
  const [ session ] = useSession()
    
  console.log(session);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Faucet with Social Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <p className="mt-3 text-2xl">
        
        You can use this Faucet to request Cibrax tokens
      </p>
        
      {session && <TokenForm session={session}/>}

      <p className="mt-3 text-2xl">
        {(session) ? 
          <button onClick={() => signOut()} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Logout</button> : 
          <button onClick={() => signIn()} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Login</button>
        }

    </p>  
      </main>
    </div>
  )
}
