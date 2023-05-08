import React, { useState } from 'react'
import logo from './images/PaperPal-extension.png'
import { AddIcon } from '@chakra-ui/icons'
import { Image, Button, useTheme, Text } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'
import Website from './website'
import DisplayPapersinFolder from './components/DisplayPapersinFolder'
import PaperConsumer from './PaperConsumer'

function App() {
  const theme = useTheme()
  const { brand } = theme.colors

  const [extensionStorage, setExtensionStorage] = useState({})

  //Displays the papers in each folder
  const [displayedPapers, setDisplayedPapers] = useState(null);

  // Store the folder name
  const [folderName, setFolderName] = useState("");

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
    paperBox: {
      width: '519px',
      height: '374px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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

  async function addPaper() {
    // get title from chrome window
    await window.chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      var tabURL = tabs[0].url;
      console.log(tabURL);
      // todo un-hardcode below code
      // const paperNumber = parseInt(tabURL.match(/\d+/)[0], 10);
      const paperNumber = "146362";
      const response = await PaperConsumer.getPaperInfo([paperNumber]);
      console.log("RES ", response);

      // todo remove resp2 and resp3 as they're only for testing
      const resp2 = await PaperConsumer.getRecommendations([1372243, 346340, 1532153, 1532153, 146375]);
      console.log("RES2 ", resp2);

      const resp3 = await PaperConsumer.getInsights([1372243, 346340, 1532153, 1532153, 146375], '636792');
      console.log("RES3 ", resp3);

      const resp4 = await PaperConsumer.setSessionData(1234, [1, 2, 3, "hello"])
      console.log("RES4 ", resp4);

      const resp5 = await PaperConsumer.getSessionData(1234)
      console.log("RES5 ", resp5);


      const paper = {
        title: 'Paper ' + paperNumber,
      }

      if (folderName !== "") {
        // add paper to folder
        const folder = extensionStorage.folders.find((obj) => obj.name === folderName);
        folder.papers.push(paper);

        // update extensionStorage locally and in local storage
        setExtensionStorage(prevState => {
          return {
            ...prevState,
            folders: [...prevState.folders, folder]
          }
        })
        saveExtensionStorage()
      } else {
        console.log("Folder not selected")
        // can add a text here to store "Please select a folder" and display it in the div with styles.paperBox
      }

    });
  }

  window.addPaper= addPaper;

  /**
   * Saves the extensionStorage object to local storage
   */
  function saveExtensionStorage() {
    localStorage.setItem('extensionStorage', JSON.stringify(extensionStorage))
  }

  function displayPapers(name) {
    const folder = extensionStorage.folders.find((obj) => obj.name === name);
    setFolderName(name);
    const element = (
      <DisplayPapersinFolder name={folder.name} papers={folder.papers} handleDeletePaper={(paper) => deletePaper(paper, folder.name)} />
    );
    setDisplayedPapers(element);
  }

  return (
    <div>
      {
        (window.chrome && window.chrome.runtime && window.chrome.runtime.id) ? (
          <div style={styles.extensionStyles}>
            <div style={styles.topBarStyles}>
              <Image src={logo} alt="paperpal-logo" width={'202px'} height={'122px'} />
              <div style={styles.upperBox}>
                <div style={styles.addPaperButtonBox}>
                  <Button bg="addPaperButton.500" height='50px' width='50px' borderRadius='25px' fontSize='30px' textAlign='center' onClick={addPaper}>
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

              {folderName !== "" ?
                <div>
                  {displayedPapers}
                </div>
                :
                <div style={styles.paperBox}>
                  <Text fontSize="23px">Please select a folder</Text>
                </div>
              }
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
