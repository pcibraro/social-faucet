import Head from 'next/head'
import { TokenForm } from './components/TokenForm';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  
  if (error) return <div>{error.message}</div>;

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
        
      {user && <TokenForm user={user}/>}

      <p className="mt-3 text-2xl">
        {(user) ? 
          <a href="/api/auth/logout" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Logout</a> : 
          <a href="/api/auth/login" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Login</a>
        }

    </p>  
      </main>
    </div>
  )
}
