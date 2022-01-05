import type { AppProps } from 'next/app';
import { ChakraProvider, color, extendTheme, FadeProps, StyleProps, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/400.css';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import { GlobalProps } from '@emotion/react';
import { lighten, getColor, mode } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Lato'
  },
  components: {
    Button: {
      variants: {
        gradient: (props: GradientButtonProps) => {
          const { theme, fromcolor, tocolor } = props
          const lgFrom = getColor(theme, fromcolor)
          const lgTo = getColor(theme, tocolor)
          const bgColor = getColor(theme, mode('gray.50', 'gray.800')(props))

          return {
            border: '0px solid',
            borderColor: 'transparent',
            background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, 
            linear-gradient(135deg, ${lgFrom}, ${lgTo}) border-box`,
            '> *': {
              background: `gray.700`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
            },
            _hover: {
              background: `linear - gradient(${bgColor}, ${bgColor}) padding- box,
            linear- gradient(315deg, ${lgFrom}, ${lgTo}) border - box`,
              border: '2px solid',
              borderColor: 'transparent',
              '> *': {
                background: `gray.700`,
                backgroundClip: 'text',
              },
            },
          }
        },
      }
    }
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: props.colorMode == 'dark' ? 'gray.900' : 'gray.50',
      }
    })
  }
},
)

interface GradientButtonProps {
  fromcolor: string
  tocolor: string
  theme: Dict<any>
}