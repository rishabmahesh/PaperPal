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

export default function Website() {

  const [extensionStorage, setExtensionStorage] = React.useState({})
  const [recommendationButtonClicked, setRecommendationButtonClicked] = React.useState(false)

  const [savedPapers, setSavedPapers] = React.useState(false)
  const [folderDetails, setFolderDetails] = React.useState({})


  const extensionStorageInit = {
    numberOfFolders: 0,
    folders: [],
  };

  React.useEffect(() => {
    localStorage.getItem("extensionStorage")
      ? setExtensionStorage(
        JSON.parse(localStorage.getItem("extensionStorage"))
      )
      : setExtensionStorage(extensionStorageInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = {
    websiteStyles: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      display: "flex",
      flexDirection: "row",
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
      flexDirection: "row",
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
      borderRadius: "10px",
      borderColor: "#000000",
      borderWidth: "1px",
      marginLeft: recommendationButtonClicked ? "30px" : "54px",
      marginTop: "40px",
    },
    filterContainerBox: {
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth - 500}px`,
      marginLeft: "175px",
      marginRight: "100px",
    },
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
    setFolderDetails(name);
  }

  function generateRecommendations() {
    // TODO: code to call API and get recs

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
          <div id="papers-container" style={styles.paperContainerBox}>

            {/* Saved papers box */}
            <div style={styles.savedBoxStyles}>
              <div>

              </div>

              <div id="saved-papers-container">
                {
                  savedPapers ? (
                    // TODO: have to pass folder.name and folder.papers to DisplaySavedTable
                    <DisplaySavedTable name={null} papers={null} />
                  ) :
                    <h1>
                      Select a folder
                    </h1>
                }

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
                  onClick={generateRecommendations}
                >
                  Generate Recommendations
                </Button>
              </div>

            </div>

            {/* Recommendation papers box */}
            {recommendationButtonClicked ? (
              <div style={styles.savedBoxStyles}>
                {/* have to pass folder.name and folder.papers to DisplaySavedTable */}
                <DisplaySavedTable name={null} papers={null} />
              </div>
            ) : null}
          </div>

        </Main>
      </Box>
    </div >
  );
}
