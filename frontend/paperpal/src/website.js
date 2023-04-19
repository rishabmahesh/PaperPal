import React from "react";
import logo from "./images/PaperPal-extension.png";
import { Image, Button } from "@chakra-ui/react";
import NewFolderButton from "./components/NewFolderButton";
import DisplayPapersinFolder from "./components/DisplayPapersinFolder";
import ReactDOM from "react-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FilterTab from "./components/FilterTab";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const savedPaperColumns = [
  { field: "title", headerName: "Title", width: 130 },
  { field: "authors", headerName: "Authors", width: 130 },
  { field: "year", headerName: "Year", width: 130 },
  { field: "citations", headerName: "Citation no.", width: 130 },
  { field: "references", headerName: "Reference no.", width: 130 },
];

const savedPaperRows = [
  {
    id: 1,
    title: "Paper 1",
    authors: "Author 1",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 2,
    title: "Paper 2",
    authors: "Author 2",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 3,
    title: "Paper 3",
    authors: "Author 3",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 4,
    title: "Paper 4",
    authors: "Author 4",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 5,
    title: "Paper 5",
    authors: "Author 5",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 6,
    title: "Paper 6",
    authors: "Author 6",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 7,
    title: "Paper 7",
    authors: "Author 7",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 8,
    title: "Paper 8",
    authors: "Author 8",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 9,
    title: "Paper 9",
    authors: "Author 9",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 10,
    title: "Paper 10",
    authors: "Author 10",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 11,
    title: "Paper 11",
    authors: "Author 11",
    year: "2021",
    citations: "1",
    references: "1",
  },
  {
    id: 12,
    title: "Paper 12",
    authors: "Author 12",
    year: "2021",
    citations: "1",
    references: "1",
  },
];

export default function Website(props) {
  const [extensionStorage, setExtensionStorage] = React.useState({});

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
      width: "325px",
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
      marginLeft: "0px",
    },
    savedBoxStyles: {
      height: "773px",
      width: "1217px",
      backgroundColor: "#D9D9D9",
      borderRadius: "10px",
      borderColor: "#000000",
      borderWidth: "1px",
      marginLeft: "54px",
      marginTop: "40px",
    },
    FilterContainerBox: {
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
    console.log("in function display");
    const folder = extensionStorage.folders.find((obj) => obj.name === name);
    const element = (
      <DisplayPapersinFolder name={folder.name} papers={folder.papers} />
    );
    ReactDOM.render(element, document.getElementById("papers-container"));
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

  const [open, setOpen] = React.useState(false);

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
              width={"325px"}
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
          <ChevronLeftIcon fontSize="large"/>
        </IconButton>
        <Main open={open}>
          <div id="papers-container" style={styles.paperContainerBox}>
            {/* <div style={styles.savedBoxStyles}>
          
        </div> */}

            {/* <DataGrid
            rows={savedPaperRows}
            columns={savedPaperColumns}
            pageSize={10}
            slots={{
              toolbar: GridToolbar,
            }}
          /> */}

            <h1>paper container</h1>
            <div style={styles.FilterContainerBox}></div>
          </div>
        </Main>
      </Box>
    </div>
  );
}
