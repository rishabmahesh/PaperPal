import React from 'react';
import logo from './images/PaperPal-extension.png';
import { Image, Button, useTheme } from '@chakra-ui/react'



function App() {
  const theme = useTheme();
  const { brand } = theme.colors;
  const styles = {
    extensionStyles: {
      width: '721px',
      height: '496px',
      backgroundColor: brand.extensionStyles,
    },
    topBarStyles: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: brand['topBarStyles'],
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
      backgroundColor: brand[500],
      // backgroundColor: '#6CAFBE',
    },
    bottomBarStyles: {
      width: '721px',
      height: '374px',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'row',
    },
    folderBox: {
      width: '202px',
      height: '374px',
      backgroundColor: brand.folderBox,
      display: 'flex',
      flexDirection: 'column',
    },
    addFolderButtonStyles: {
      width: '202px',
      height: '69px',
      backgroundColor: '#296A5E',
    },
    addFolderButtonTextStyles: {
      color: '#FFFFFF',
      fontSize: '23px',
      textAlign: 'center',
    },
    insideAddFolderButtonStyles: {
      backgroundColor: '#000000',
    },
    foldersBoxContainerStyles: {
      width: '202px',
      height: '305px',
      overflowY: 'scroll',
    },
    addPaperButton: {
      display: 'flex',
      paddingLeft: '5%',
    }
  }

  function handleAddFolderButtonMouseEnter(e) {
    e.target.style.backgroundColor = '#297D6D'; // can be changed for color blindness
  }

  function handleAddFolderButtonMouseLeave(e) {
    e.target.style.backgroundColor = '#296A5E';
  }


  return (
    <div style={styles.extensionStyles}>
      <div style={styles.topBarStyles}>
        <Image src={logo} alt="paperpal-logo" width={"202px"} height={"122px"} />
        <div style={styles.upperBox}>
          <div style={styles.addPaperButton}>
            <Button colorScheme='addPaperButton'>Button</Button>
          </div>
          <h1>Hello world!!</h1>
        </div>
      </div>

      <div style={styles.bottomBarStyles}>
        <div style={styles.folderBox}>
          <div style={styles.foldersBoxContainerStyles}>
            <h1>inside folderbox container</h1>
          </div>

          <button style={styles.addFolderButtonStyles} onMouseEnter={handleAddFolderButtonMouseEnter} onMouseLeave={handleAddFolderButtonMouseLeave}>
            <text style={styles.addFolderButtonTextStyles}>Add Folder</text>
          </button>
        </div>

        <div style={styles.paperContainerBox}>
          <h1>paper container</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
