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

  const [isLoading, setIsLoading] = React.useState(true)

  const [savedPapers, setSavedPapers] = React.useState(null)
  const [recommendedPapers, setRecommendedPapers] = React.useState(null)
  const [savedPaperIDArray, setSavedPaperIDArray] = React.useState([])
  const [insightsPapers, setInsightsPapers] = React.useState(null)

  const [bulbIndex, setBulbIndex] = React.useState(-1);
  const [folderName, setFolderName] = React.useState("")
  const [open, setOpen] = React.useState(true);
  const scaler = { 'open_no_reco': 1.35, 'open_reco': 2.7, 'close_no_reco': 1.1, 'close_reco': 2.2 }

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);

      // get data from server and store to variable
      const sessionData = await PaperConsumer.getSessionData(1);
      setExtensionStorage(sessionData.session_data);
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
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      display: "flex",
      flexDirection: "row",
      overflowX: "hidden",
    },
    leftFolderTabStyles: {
      height: `${window.innerHeight}px`,
      display: "flex",
      flexDirection: "column",
    },
    folderTabStyles: {
      backgroundColor: "#6CAFBE",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
    },
    allFoldersBoxStyles: {
      overflowY: "scroll",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    paperContainerBox: {
      height: `${window.innerHeight * (0.85)}px`,
      width: open ? window.innerWidth - window.innerWidth / 6 : `100%`,
      display: "flex",
      flexDirection: "column",
    },
    savedBoxStyles: {
      width: open ? (recommendationButtonClicked ? `${window.innerWidth / scaler["open_reco"]}px` : `${window.innerWidth / scaler["open_no_reco"]}px`) : (recommendationButtonClicked ? `${window.innerWidth / scaler["close_reco"]}px` : `${window.innerWidth / scaler["close_no_reco"]}px`),
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: recommendationButtonClicked ? "30px" : "64px",
      marginTop: "45px",
      display: "flex",
    },
    recommendedBoxStyles: {
      height: `${window.innerHeight * 0.85}px`,
      width: open ? (recommendationButtonClicked ? `${window.innerWidth / scaler["open_reco"]}px` : `${window.innerWidth / scaler["open_no_reco"]}px`) : (recommendationButtonClicked ? `${window.innerWidth / scaler["close_reco"]}px` : `${window.innerWidth / scaler["close_no_reco"]}px`),
      display: "flex",
      backgroundColor: "#D9D9D9",
      borderRadius: "2px",
      borderColor: "#000000",
      borderWidth: "1.5px",
      flexDirection: "column",
      marginLeft: "20px"
    },
    folderNameStyles: {
      color: "#000000",
      fontSize: "24px",
      width: "100%",
    },
    tablesContainerStyles: {
      display: "flex",
      height: `${window.innerHeight * 0.85}px`,
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

    // remove recommendations if folder name is changed
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
        Track: paper.Track,
      }
    });

    setRecommendedPapers(papersToRec);
    setIsLoading(false);
  }

  const drawerWidth = window.innerWidth / 6;

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

  async function getInsights(insightPaperID, show) {
    setIsLoading(true)

    // if the bulb is clicked, show the insights
    if (show >= 0) {
      setBulbIndex(show)

      // get insight info from server
      const res = await PaperConsumer.getInsights(savedPaperIDArray, parseInt(insightPaperID))

      const papersForInsights = res.map((paper) => {
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
          Abstract_Score: paper.Abstract_Score * 100,
          Author_Score: paper.Author_Score * 100,
          Keyword_Score: paper.Keyword_Score * 100,
          Track: paper.Track,
        }
      });
      setInsightsPapers(papersForInsights);
    } else {
      // if bulb is clicked again, hide the insights
      setBulbIndex(-1)
      setInsightsPapers(null);
    }
    setIsLoading(false)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.websiteStyles}>
      {/* left hand side of the website */}
      <Box sx={{ display: "flex" }}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
          <ChevronRightIcon fontSize="large" />
        </IconButton>
        <Drawer sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }} variant="persistent" anchor="left" open={open}>
          <div style={styles.leftFolderTabStyles}>
            <Image
              src={logo}
              alt="paperpal-logo"
              width={`${window.innerWidth * 0.2115}px`}
            />

            <div style={styles.folderTabStyles}>
              <div style={styles.allFoldersBoxStyles}>
                {extensionStorage.folders && extensionStorage.folders.length > 0
                  ? extensionStorage.folders.map((folder) => (
                    <NewFolderButton
                      key={folder.name}
                      name={folder.name}
                      height={"108px"}
                      width={drawerWidth * 0.9}
                      display={"flex"}
                      flexDirection={"row"}
                      marginTop={"18px"}
                      onClick={() => displayPapers(folder.name)}
                    />
                  ))
                  : null}
              </div>
            </div>
            <div>
              <Button
                height="130px"
                width={drawerWidth}
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
        </Drawer>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerClose} edge="start" sx={{ mr: 2, ...(!open && { display: "none" }) }}>
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        {/* right hand side of the website */}
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
                      <DisplaySavedTable papers={savedPapers} insightsArray={insightsPapers} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', flexDirection: 'column' }}>
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
                    </div>
                  ) :
                    <div style={styles.savedBoxStyles}>
                      <>
                        {
                          savedPapers !== null ? (
                            <div>
                              <DisplaySavedTable papers={savedPapers} insightsArray={insightsPapers} />

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
                            <div style={{ marginTop: "300px", marginLeft: "300px", marginRight: "300px", marginBottom: "300px", display: "flex" }}>
                              <p style={{ fontSize: 40 }}>
                                Select a folder
                              </p>
                            </div>
                          )
                        }
                      </>
                    </div>
                  }

                  {/* Recommendation papers box */}
                  {recommendationButtonClicked ? (
                    <div style={styles.recommendedBoxStyles}>
                      <DisplayRecommendationTable papers={recommendedPapers} getInsights={(paperID, show) => getInsights(paperID, show)} bulbIndex={bulbIndex} />
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
