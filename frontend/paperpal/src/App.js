import React, { useState } from 'react'
import logo from './images/PaperPal-extension.png'
import { AddIcon } from '@chakra-ui/icons'
import { Image, Button, useTheme } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'
import Website from './website'
import DisplayPapersinFolder from './components/DisplayPapersinFolder'

function App() {
  const theme = useTheme()
  const { brand } = theme.colors

  const [extensionStorage, setExtensionStorage] = useState({})

  const extensionStorageInit = {
    numberOfFolders: 0,
    folders: []
  }

  // const paper = {
  //   title: 'Paper 1',
  //   authors: ['Author 1'],
  //   year: '2021',
  //   pubication: 'Publication 1',
  // }

  React.useEffect(() => {
    localStorage.getItem('extensionStorage') ? setExtensionStorage(JSON.parse(localStorage.getItem('extensionStorage'))) : setExtensionStorage(extensionStorageInit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    extensionStyles: {
      width: '721px',
      height: '496px',
      backgroundColor: brand.extensionStyles
    },
    topBarStyles: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: brand.topBarStyles,
      width: '721px',
      height: '122px'
    },
    imageStyle: {
      width: '202px',
      height: '122px'
    },
    upperBox: {
      width: '519px',
      height: '122px',
      backgroundColor: brand[500],
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomBarStyles: {
      width: '721px',
      height: '374px',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'row'
    },
    folderBox: {
      width: '202px',
      height: '374px',
      backgroundColor: brand.folderBox,
      display: 'flex',
      flexDirection: 'column'
    },
    addFolderButtonStyles: {
      width: '202px',
      height: '69px',
      backgroundColor: '#296A5E'
    },
    addFolderButtonTextStyles: {
      color: '#FFFFFF',
      fontSize: '23px',
      textAlign: 'center'
    },
    foldersBoxContainerStyles: {
      width: '202px',
      height: '305px',
      overflowY: 'scroll'
    },
    addPaperButtonBox: {
      display: 'flex',
      paddingLeft: '5%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
      marginLeft: '20px',
      width: '350px',
      height: '30px'
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

  function deletePaper(paper, folderName) {
    const folder = extensionStorage.folders.find((obj) => obj.name === folderName);
    const index = folder.papers.indexOf(paper);
    if (index > -1) {
      folder.papers.splice(index, 1);
    }

    // update extensionStorage locally and in local storage
    setExtensionStorage(prevState => {
      return {
        ...prevState,
        folders: [...prevState.folders, folder]
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

  //Displays the papers in each fodler on click
  const [displayedPapers, setDisplayedPapers] = useState(null);

  function displayPapers(name) {
    const folder = extensionStorage.folders.find((obj) => obj.name === name);
    const element = (
      <DisplayPapersinFolder name={folder.name} papers={folder.papers} handleDeletePaper={(paper) => deletePaper(paper, folder.name)} />
    );
    setDisplayedPapers(element);
  }

  const [tabUrl, setTabUrl] = useState("");

  React.useEffect(() => {
    window.chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setTabUrl(tabs[0].url);
    });
  }, []);

  function getURL(){
    console.log(tabUrl);
  }


  return (
    <div>
      {
        window.chrome && window.chrome.runtime && window.chrome.runtime.id ? (
          <div style={styles.extensionStyles}>
            <div style={styles.topBarStyles}>
              <Image src={logo} alt="paperpal-logo" width={'202px'} height={'122px'} />
              <div style={styles.upperBox}>
                <div style={styles.addPaperButtonBox}>
                  <Button bg="addPaperButton.500" height='50px' width='50px' borderRadius='25px' fontSize='30px' textAlign='center' onClick={getURL}>
                    <AddIcon color="white" />
                  </Button>
                  <input type="text" style={styles.inputBox} />
                </div>
              </div>
            </div>

            <div style={styles.bottomBarStyles}>
              <div style={styles.folderBox}>
                <div style={styles.foldersBoxContainerStyles}>
                  {
                    extensionStorage.folders && extensionStorage.folders.length > 0
                      ? extensionStorage.folders.map((folder) =>
                        <NewFolderButton
                          name={folder.name}
                          height={'44px'}
                          width={'145px'}
                          marginLeft={'28px'}
                          marginTop={'18px'}
                          onClick={() => displayPapers(folder.name)}
                        />
                      )
                      : null}
                  {/* Replace null with "No folder yet" in above line */}
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

              <div id="papers-container" style={styles.paperContainerBox}>
                {displayedPapers}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Website extensionStorage={extensionStorage} />
          </div>
        )

      }
    </div>
  )
}

export default App
