import Layout from '../components/Layout'
import '../styles/globals.scss'
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        // Pass all pages as 'children' props to layout 
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
};
