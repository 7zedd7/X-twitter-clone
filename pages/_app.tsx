import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Inter } from "next/font/google";
import toast, { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <GoogleOAuthProvider clientId='483548662391-kokeqp5n6svu8g568jvdpktfbhcblm76.apps.googleusercontent.com'>
    <Component {...pageProps} />
    <Toaster/>
    </GoogleOAuthProvider>
    </div>
}
