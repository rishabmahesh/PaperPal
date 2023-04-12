import React, { useState } from 'react';
import logo from './images/PaperPal-extension.png';
import { Image, Button, useTheme } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton';

function App() {
  const theme = useTheme();
  const { brand } = theme.colors;

  const [folders, setFolders] = useState([]);

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

  function addFolder() {
    setFolders([...folders, <NewFolderButton />]);
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
            {folders.map((folder) => folder)}
          </div>

          <Button
            height='69px'
            width='202px'
            bg='#296A5E'
            borderRadius='0px'
            _hover={{ bg: '#297D6D' }}
            fontSize='23px'
            color='#FFFFFF'
            onClick={addFolder}>
            Add Folder
          </Button>
        </div>

        <div style={styles.paperContainerBox}>
          <h1>paper container</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
