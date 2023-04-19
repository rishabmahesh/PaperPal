import React from 'react'
import logo from './images/PaperPal-extension.png'
import { Image, Button } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'
import ReactDOM from "react-dom";
import FilterTab from './components/FilterTab'
import DisplaySavedTable from './components/DisplaySavedTable';

export default function Website() {

  const [extensionStorage, setExtensionStorage] = React.useState({})
  const [recommendationButtonClicked, setRecommendationButtonClicked] = React.useState(false)

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
      width: `${window.innerWidth - 325}px`,
      marginLeft: '0px',
    },
    savedBoxStyles: {
      height: '773px',
      width: '1217px',
      backgroundColor: '#D9D9D9',
      borderRadius: '10px',
      borderColor: '#000000',
      borderWidth: '1px',
      marginLeft: '54px',
      marginTop: '40px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterContainerBox: {
      height: `${window.innerHeight}px`,
      width: `500px`,
      marginLeft: '375px',
      backgroundColor: '#D9D9D9',
    },

    generateRecsButtonContainerStyles: {
      justifyContent: 'center',
      alignItems: 'center',
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
      <DisplaySavedTable name={folder.name} papers={folder.papers} />
    );
    ReactDOM.render(element, document.getElementById("saved-papers-container"));
  }

  function generateRecommendations() {
    // TODO: code to call API and get recs

    // TODO: format received papers to required format and send in DisplaySavedTable


    // code to validate recs button click
    setRecommendationButtonClicked(true)

    // code to display recs in table format
    const element = (
      <DisplaySavedTable name={null} papers={null} />
    );
    ReactDOM.render(element, document.getElementById("saved-papers-container"));
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

        <div style={styles.savedBoxStyles}>
          <div>

          </div>

          <div id="saved-papers-container">
            <h1>
              select a folder
            </h1>
          </div>

          {/* TODO: Hide generate recommendation button until folder is selected via variable */}
          <div style={styles.generateRecsButtonContainerStyles}>
            <Button
              height='45px'
              width='405px'
              bg='#296A5E'
              borderRadius='10px'
              _hover={{ bg: '#297D6D' }}
              fontSize='23px'
              color='#FFFFFF'
              onClick={{generateRecommendations}}
            >
              Generate Recommendations
            </Button>
          </div>

        </div>
      </div>

      <div id="papers-container" style={styles.paperContainerBox}>

        <div style={styles.savedBoxStyles}>
          <div>

          </div>

          <div id="saved-papers-container">
            <h1>
              select a folder
            </h1>
          </div>

          {/* TODO: Hide generate recommendation button until folder is selected via variable */}
          <div style={styles.generateRecsButtonContainerStyles}>
            <Button
              height='45px'
              width='405px'
              bg='#296A5E'
              borderRadius='10px'
              _hover={{ bg: '#297D6D' }}
              fontSize='23px'
              color='#FFFFFF'
              onClick={{}}
            >
              Generate Recommendations
            </Button>
          </div>

        </div>
      </div>

    </div>
  )
}
