import './App.css';
import { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js'; // Import Supabase types
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Chat from './pages/Chat';
import Products from './pages/Products';
import Header from './components/Header';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

if (!supabaseUrl) {
  throw new Error("Missing Supabase URL!");
}
if (!supabaseAnonKey) {
  throw new Error("Missing Supabase Anonymous Key!");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Chat />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  // Handle session management with useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // If the user is not logged in, show the Auth component
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        theme="dark"
      />
    );
  }

  // If logged in, render the main router
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

