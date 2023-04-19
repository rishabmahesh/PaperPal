import React from 'react'
import logo from './images/PaperPal-extension.png'
import { Image, Button } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'
import DisplayPapersinFolder from './components/DisplayPapersinFolder'
import ReactDOM from "react-dom";
import FilterTab from './components/FilterTab'

export default function Website(props) {

  const [extensionStorage, setExtensionStorage] = React.useState({})

  const extensionStorageInit = {
    numberOfFolders: 0,
    folders: []
  }

  React.useEffect(() => {
    localStorage.getItem('extensionStorage') ? setExtensionStorage(JSON.parse(localStorage.getItem('extensionStorage'))) : setExtensionStorage(extensionStorageInit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    websiteStyles: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      display: 'flex',
      flexDirection: 'row',
    },
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
    paperContainerBox: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth-325}px`,
      marginLeft: '0px',
    },
    FilterContainerBox: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth-500}px`,
      marginLeft: '175px',
      marginRight:'100px',
    }
  }

  /**
   * Adds a new folder to the extensionStorage object and updates the local storage
   */
  function addFolder() {
    // create new folder obj
    const newFolder = {
      name: `Folder ${extensionStorage.folders.length + 1}`,
      papers: []
    }

    // push new folder obj to folders array
    extensionStorage.folders.push(newFolder)

    // update extensionStorage locally and in local storage
    setExtensionStorage(prevState => {
      return {
        ...prevState,
        numberOfFolders: extensionStorage.folders.length,
        folders: prevState.folders
      }
    })
    saveExtensionStorage()
  }

  /**
   * Saves the extensionStorage object to local storage
   */
  function saveExtensionStorage() {
    localStorage.setItem('extensionStorage', JSON.stringify(extensionStorage))
  }

  function displayPapers(name) {
    console.log("in function display");
    const folder = extensionStorage.folders.find((obj) => obj.name === name);
    const element = (
      <DisplayPapersinFolder name={folder.name} papers={folder.papers} />
    );
    ReactDOM.render(element, document.getElementById("papers-container"));
  }

  return (
    <div style={styles.websiteStyles}>
      <div style={styles.leftFolderTabStyles}>
        <Image src={logo} alt="paperpal-logo" width={'325px'} height={'192px'} />

        <div style={styles.folderTabStyles}>
          <div style={styles.allFoldersBoxStyles}>
            {
              extensionStorage.folders && extensionStorage.folders.length > 0
                ? extensionStorage.folders.map((folder) =>
                  <NewFolderButton
                    key={folder.name}
                    name={folder.name}
                    height={'108px'}
                    width={'268px'}
                    marginLeft={'28.5px'}
                    marginTop={'18px'}
                    onClick={() => displayPapers(folder.name)}
                  />
                )
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
              onClick={addFolder}
            >
              Add Folder
            </Button>
          </div>

        </div>
      </div>

      <div id="papers-container" style={styles.paperContainerBox}>
        <h1>paper container</h1>
          <div style={styles.FilterContainerBox}>
          <FilterTab /> 
          </div>
      </div>

    </div>
  )
}
