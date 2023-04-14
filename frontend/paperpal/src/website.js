import React from 'react'
import logo from './images/PaperPal-extension.png'
import { Image, Button } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'

export default function Website(props) {

  // TODO: FIX FOLDER / EXTENSION STORAGE PROBLEM
  const [extensionStorage, setExtensionStorage] = React.useState(props.extensionStorage)

  const extensionStorageInit = {
    numberOfFolders: 0,
    folders: []
  }

  React.useEffect(() => {
    // localStorage.getItem('extensionStorage') ? setExtensionStorage(JSON.parse(localStorage.getItem('extensionStorage'))) : setExtensionStorage(extensionStorageInit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    leftFolderTabStyles: {
      height: `${window.innerHeight}px`,
      display: 'flex',
      flexDirection: 'column',
    },
    folderTabStyles: {
      backgroundColor: '#6CAFBE',
      width: '325px',
      height: '854px',
      display: 'flex',
      flexDirection: 'column'
    },
    allFoldersBoxStyles: {
      overflowY: 'scroll',
      height: '724px',
    },
  }

  return (
    <div>
      <div style={styles.leftFolderTabStyles}>
        <Image src={logo} alt="paperpal-logo" width={'325px'} height={'192px'} />

        <div style={styles.folderTabStyles}>
          {console.log(extensionStorage)}
          <div style={styles.allFoldersBoxStyles}>
            {
              extensionStorage.folders && extensionStorage.folders.length > 0
                ? extensionStorage.folders.map((folder) => <NewFolderButton key={folder.name} name={folder.name} height={'108px'} width={'268px'} marginLeft={'28.5px'} marginTop={'18px'} />)
                : null
            }
          </div>

          <div>
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
