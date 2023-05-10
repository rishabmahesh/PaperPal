import React from 'react'
import logo from './images/PaperPal-extension.png'
import { Image, Button } from '@chakra-ui/react'
import NewFolderButton from './components/NewFolderButton'
import DisplaySavedTable from './components/DisplaySavedTable';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DisplayRecommendationTable from './components/DisplayRecommendationTable';
import PaperConsumer from './PaperConsumer'

export default function Website() {

  const [extensionStorage, setExtensionStorage] = React.useState({})
  const [recommendationButtonClicked, setRecommendationButtonClicked] = React.useState(false)

  const [savedPapers, setSavedPapers] = React.useState(false)
  const [folderName, setFolderName] = React.useState("")

  React.useEffect(() => {
    async function getData() {
      const resp5 = await PaperConsumer.getSessionData(1);
      setExtensionStorage(resp5.session_data);
    }
    getData()
    .catch(() => {
      console.log("Error occurred in Website getData()");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = {
    websiteStyles: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      display: "flex",
      flexDirection: "row",
      overflowY: "hidden",
      overflowX: "hidden",
    },
    leftFolderTabStyles: {
      height: `${window.innerHeight}px`,
      display: "flex",
      flexDirection: "column",
    },
    folderTabStyles: {
      backgroundColor: "#6CAFBE",
      width: `${window.innerWidth * 0.2115}px`,
      height: "854px",
      display: "flex",
      flexDirection: "column",
    },
    allFoldersBoxStyles: {
      overflowY: "scroll",
      height: "724px",
    },
    paperContainerBox: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth - 325}px`,
      display: "flex",
      flexDirection: "column",
    },
    paperContainerBox2: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth - 325}px`,
      marginLeft: `${window.innerWidth - 325}px`,
    },
    savedBoxStyles: {
      height: `${window.innerHeight * 0.85}px`,
      width: recommendationButtonClicked ? `${window.innerWidth * 0.35}px` : `${window.innerWidth * 0.6864}px`,
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      marginLeft: recommendationButtonClicked ? "30px" : "64px",
      marginTop: "40px",
    },
    recommendedBoxStyles: {
      height: `${window.innerHeight * 0.85}px`,
      width: recommendationButtonClicked ? `${window.innerWidth * 0.35}px` : `${window.innerWidth * 0.6864}px`,
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      marginLeft: recommendationButtonClicked ? "30px" : "64px",
      marginTop: "40px",
    },
    filterContainerBox: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth - 500}px`,
      marginLeft: "175px",
      marginRight: "100px",
    },
    folderNameStyles: {
      color: "#000000",
      fontSize: "24px",
    },
    tablesContainerStyles: {
      display: "flex",
      flexDirection: "row",
    }
  };

  /**
   * Adds a new folder to the extensionStorage object and updates the local storage
   */
  function addFolder() {
    // create new folder obj
    const newFolder = {
      name: `Folder ${extensionStorage.folders.length + 1}`,
      papers: [],
    };

    // push new folder obj to folders array
    extensionStorage.folders.push(newFolder);

    // update extensionStorage locally and in local storage
    setExtensionStorage((prevState) => {
      return {
        ...prevState,
        numberOfFolders: extensionStorage.folders.length,
        folders: prevState.folders,
      };
    });
    saveExtensionStorage();
  }

  /**
   * Saves the extensionStorage object to local storage
   */
  function saveExtensionStorage() {
    localStorage.setItem("extensionStorage", JSON.stringify(extensionStorage));
  }

  function displayPapers(name) {
    setSavedPapers(true);
    setFolderName(name);
  }

  async function generateRecommendations(paperIdArray) {
    // TODO: code to call API and get recs
    const response = await PaperConsumer.getRecommendations(paperIdArray);
    console.log("response for recs");
    console.log(response);
    // TODO: format received papers to required format and send in DisplaySavedTable
    // code to validate recs button click
    setRecommendationButtonClicked(true)
  }
  //drawer width
  const drawerWidth = 325;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.websiteStyles}>
      <Box sx={{ display: "flex" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div style={styles.leftFolderTabStyles}>
            <Image
              src={logo}
              alt="paperpal-logo"
              width={`${window.innerWidth * 0.2115}px`}
              height={"192px"}
            />

            <div style={styles.folderTabStyles}>
              <div style={styles.allFoldersBoxStyles}>
                {extensionStorage.folders && extensionStorage.folders.length > 0
                  ? extensionStorage.folders.map((folder) => (
                    <NewFolderButton
                      key={folder.name}
                      name={folder.name}
                      height={"108px"}
                      width={"268px"}
                      marginLeft={"28.5px"}
                      marginTop={"18px"}
                      onClick={() => displayPapers(folder.name)}
                    />
                  ))
                  : null}
              </div>

              <div>
                <Button
                  height="130px"
                  width="325px"
                  bg="#296A5E"
                  borderRadius="0px"
                  _hover={{ bg: "#297D6D" }}
                  fontSize="23px"
                  color="#FFFFFF"
                  onClick={addFolder}
                >
                  Add Folder
                </Button>
              </div>
            </div>
          </div>

        </Drawer>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={{ mr: 2, ...(!open && { display: "none" }) }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <Main open={open}>
          <div style={styles.paperContainerBox}>

            <div>
              {folderName !== "" ? (
                <div style={styles.folderNameStyles}>
                  Papers in: { folderName }
                </div> 
              ) : null}
            </div>
            <div style={styles.tablesContainerStyles}>
              {/* Saved papers box */}
              <div style={styles.savedBoxStyles}>
                {
                  savedPapers ? (
                    // TODO: have to pass folder.name and folder.papers to DisplaySavedTable
                    <div>
                      <DisplaySavedTable name={null} papers={null} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                        <Button
                          height='45px'
                          width='405px'
                          bg='#296A5E'
                          borderRadius='10px'
                          _hover={{ bg: '#297D6D' }}
                          fontSize='23px'
                          color='#FFFFFF'
                          onClick={generateRecommendations}
                        >
                          Generate Recommendations
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: "400px", marginLeft: "500px" }}>
                      <p style={{ fontSize: 40 }}>
                        Select a folder
                      </p>
                    </div>
                  )
                }
              </div>

              {/* Recommendation papers box */}
              {recommendationButtonClicked ? (
                <div style={styles.recommendedBoxStyles}>
                  {/* have to pass folder.name and folder.papers to DisplaySavedTable */}
                  <DisplayRecommendationTable name={null} papers={null} />
                </div>
              ) : null}
            </div>
          </div>

        </Main>
      </Box>
    </div >
  );
}
