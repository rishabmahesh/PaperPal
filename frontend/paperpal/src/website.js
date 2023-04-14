import React from 'react'
import logo from './images/PaperPal-extension.png'
import { Image, Button } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'

export default function Website () {
  const [extensionStorage, setExtensionStorage] = React.useState({})

  React.useEffect(() => {
    console.log('Dimensions: ', window.innerWidth, window.innerHeight)
  }, [])

  const styles = {
    folderTabStyles: {
      backgroundColor: '#6CAFBE',
      width: '325px',
    },
    foldersBoxContainerStyles: {
      marginTop: '725px',
    },
    folderBox: {
      width: '325px',
      display: 'flex',
      backgroundColor: '#6CAFBE',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }

  return (
    <div style={styles.website}>
      <div>
        <Image src={logo} alt="paperpal-logo" width={'325px'} height={'192px'} />
        <div style={styles.folderTabStyles}>
          <div style={styles.folderBox}>
            <div style={styles.foldersBoxContainerStyles}>
              {
                extensionStorage.folders && extensionStorage.folders.length > 0
                  ? extensionStorage.folders.map((folder) => <NewFolderButton key={folder.name} name={folder.name} height={'108px'} width={'268px'} marginLeft={'28.5px'} marginTop={'18px'} />)
                  : null}
              {/* Replace null with "No folder yet" in above line */}
            </div>

            <Button
              height='130px'
              width='325px'
              bg='#296A5E'
              borderRadius='0px'
              _hover={{ bg: '#297D6D' }}
              fontSize='23px'
              color='#FFFFFF'
            // onClick={addFolder}
            >
              Add Folder
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
