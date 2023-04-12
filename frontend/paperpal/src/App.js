import React from 'react';
import logo from './images/PaperPal-extension.png';
import { Image } from '@chakra-ui/react'

function App() {

  const styles = {
    extensionStyles: {
      width: '721px',
      height: '496px',
      display: 'flex',
      backgroundColor: '#F2F2F2',
    },
    topBarStyles: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#13747A',
      width: '721px',
      height: '122px',
    },
    imageStyle: {
      width: '202px',
      height: '122px',
    },
    upperBox: {
      width: '519px',
      height: '122px',
      backgroundColor: '#6CAFBE',
    },
  }


  return (
    <div style={styles.extensionStyles}>
      <div style={styles.topBarStyles}>
        <Image src={logo} alt="paperpal-logo" width={"202px"} height={"122px"} />
        <div style={styles.upperBox}>
          <h1>Hello world!</h1>
        </div>
      </div>


    </div>
  );
}

export default App;
