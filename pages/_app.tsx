import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Lato'
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: 'gray.50',
      }
    })
  }
})