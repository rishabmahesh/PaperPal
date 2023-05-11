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
import LoadingSpinner from './components/LoadingSpinner';

export default function Website() {

  const [extensionStorage, setExtensionStorage] = React.useState({})
  const [recommendationButtonClicked, setRecommendationButtonClicked] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState(false)

  const [savedPapers, setSavedPapers] = React.useState(null)
  const [recommendedPapers, setRecommendedPapers] = React.useState(null)
  const [folderName, setFolderName] = React.useState("")
  const [savedPaperIDArray, setSavedPaperIDArray] = React.useState([])
  const [open, setOpen] = React.useState(true);
  const scaler = {'open_no_reco': 1.5, 'open_reco': 2.9, 'close_no_reco': 1.1, 'close_reco': 2.2}
  // const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);

      // get data from server and store to variable
      const resp5 = await PaperConsumer.getSessionData(1);
      setExtensionStorage(resp5.session_data);
      setIsLoading(false);
    }
    getData()
      .catch(() => {
        console.log("Error occurred in Website getData()");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = {
    websiteStyles: {
      // width: `${window.innerWidth}px`,
      // height: `${window.innerHeight}px`,
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
      // height: `${window.innerHeight}px`,
      // width: `${window.innerWidth - 325}px`,
      width: recommendationButtonClicked ? `50%` : `100%`,
      // width: open ? (recommendationButtonClicked ? `${window.innerWidth/scaler["open_reco"]}px` : `${window.innerWidth/scaler["open_no_reco"]}px`): (recommendationButtonClicked ? `${window.innerWidth/scaler["close_reco"]}px` : `${window.innerWidth/scaler["close_no_reco"]}px`),

      display: "flex",
      flexDirection: "column",
    },
    savedBoxStyles: {
      // height: `${window.innerHeight * 0.85}px`,
      // width: recommendationButtonClicked ? `50%` : `100%`,
      // width: open ? (recommendationButtonClicked ? `${window.innerWidth/4}px` : `${window.innerWidth/4}px`): (recommendationButtonClicked ? `${window.innerWidth/2}px` : `${window.innerWidth/4}px`),
      width: open ? (recommendationButtonClicked ? `${window.innerWidth/scaler["open_reco"]}px` : `${window.innerWidth/scaler["open_no_reco"]}px`): (recommendationButtonClicked ? `${window.innerWidth/scaler["close_reco"]}px` : `${window.innerWidth/scaler["close_no_reco"]}px`),
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      justifyContent: 'center',
      alignItems: 'center',
      // marginLeft: recommendationButtonClicked ? "30px" : "64px",
      // marginTop: "40px",
      display: recommendationButtonClicked ? "flex" : "flex",
    },
    recommendedBoxStyles: {
      // height: `${window.innerHeight * 0.85}px`,
      // width: open ? (recommendationButtonClicked ? `70%` : `100%`): (recommendationButtonClicked ? `90%` : `100%`),
      width: open ? (recommendationButtonClicked ? `${window.innerWidth/scaler["open_reco"]}px` : `${window.innerWidth/scaler["open_no_reco"]}px`): (recommendationButtonClicked ? `${window.innerWidth/scaler["close_reco"]}px` : `${window.innerWidth/scaler["close_no_reco"]}px`),
      display: "flex",
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      flexDirection: "column",
      // marginLeft: recommendationButtonClicked ? "30px" : "64px",
      // marginTop: "40px",
    },
    folderNameStyles: {
      color: "#000000",
      fontSize: "24px",
      width: "100%",
    },
    tablesContainerStyles: {
      display: "flex",
      // width: recommendationButtonClicked ? `50%` : `100%`
      // flexDirection: "row",
      // width: recommendationButtonClicked ? `50%` : `100%`
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

  /**
   * Set folder name and papers to display in saved papers table
   * @param {name} Name of selected folder
   */
  function displayPapers(name) {
    setFolderName(name);

    // get papers from folder name
    const papers = extensionStorage.folders.find((folder) => folder.name === name).papers;
    setSavedPapers(papers);

    if (folderName !== name) {
      setRecommendationButtonClicked(false);
      setRecommendedPapers(null);
    }
  }

  async function generateRecommendations() {
    setIsLoading(true);
    // get paper ids from saved papers
    const paperIdArray = savedPapers.map((paper) => parseInt(paper.Paper_ID));
    setSavedPaperIDArray(paperIdArray);

    // get recommendations from server
    const recPapers = await PaperConsumer.getRecommendations(paperIdArray);
    setRecommendationButtonClicked(true);

    const papersToRec = recPapers.map((paper) => {
      return {
        Paper_ID: paper.Paper_ID,
        Title: paper.Title,
        Authors: paper.Authors.join(", "),
        Year: paper.Date_Published,
        IEEE_Keywords: paper.IEEE_Keywords.replaceAll(",", ", "),
        Abstract: paper.Abstract,
        Number_Authors: paper.Number_Authors,
        Number_references: paper.Number_references,
        Times_Cited: paper.Times_Cited,
      }
    });

    setRecommendedPapers(papersToRec);
    setIsLoading(false);
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
            {isLoading ? (
              <div style={{ marginTop: `${window.innerHeight / 4}px` }}>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div>
                  {folderName !== "" ? (
                    <div style={styles.folderNameStyles}>
                      Papers in: {folderName}
                    </div>
                  ) : null}
                </div>

                <div style={styles.tablesContainerStyles}>
                  {/* Saved papers box */}
                  {recommendationButtonClicked ? (
                    <div style={styles.recommendedBoxStyles}>
                      {/* have to pass folder.name and folder.papers to DisplaySavedTable */}
                      {/*<div>*/}
                        <DisplaySavedTable papers={savedPapers} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', flexDirection:'column'}}>
                            <Button
                              height='45px'
                              width='400px'
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
                      {/*</div>*/}
                    </div>
                  ) :
                  <div style={styles.savedBoxStyles}>
                    {
                      savedPapers ? (
                        <div>
                          <DisplaySavedTable papers={savedPapers} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                            <Button
                              height='45px'
                              width='40%'
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
                        <div style={{ marginTop: "300px", marginLeft: "300px", marginRight:"300px", marginBottom:"300px", display:"flex" }}>
                          <p style={{ fontSize: 40 }}>
                            Select a folder
                          </p>
                        </div>
                      )
                    }
                  </div>
                  }&nbsp;

                  {/* Recommendation papers box */}
                  {recommendationButtonClicked ? (
                    <div style={styles.recommendedBoxStyles}>
                      {/* have to pass folder.name and folder.papers to DisplaySavedTable */}
                      <DisplayRecommendationTable papers={recommendedPapers} savedPapersIDArray={savedPaperIDArray} />
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </Main>
      </Box>
    </div >
  );
}
