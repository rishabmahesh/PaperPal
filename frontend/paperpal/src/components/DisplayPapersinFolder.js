import { Button, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DisplayPaperInformation from "./DisplayPaperInformation";
import { DeleteIcon } from "@chakra-ui/icons";

export default function DisplayPapersinFolder(props) {
  const styles = {
    paperStyles: {
      marginLeft: "28px",
      marginTop: "18px",
    },
    boxStyles: {
      alignItems: "center",
      position: "relative",
      marginTop: "20px",
    },
    infoStyles: {
      display: "flex",
      alignItems: "flex-end",
    },
    hoverButtonStyles: {
      position: "relative",
      alignItems: "right",
    },
    paperButton: { 
      display: "flex", 
      alignItems: "center" 
    },
  };

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [hoveredPapers, setHoveredPapers] = useState([]);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  const handleMouseEnter = (index) => {
    setHoveredPapers([...hoveredPapers, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredPapers(hoveredPapers.filter((item) => item !== index));
  };

 // const handleDeletePaper = (paper) => {};


  return (
    <div style={styles.paperStyles}>
      <Text fontSize="23px">Papers in: {props.name}</Text>
      {props.papers.map((paper, index) => (
        <div
          key={index}
          style={styles.boxStyles}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div style={styles.paperButton}>
            <Button
              height="44px"
              width="400px"
              bg={selectedPaper === paper ? "#636a6c" : "#b7bbbc"}
              borderRadius="10px"
              color="#FFFFFF"
              border="1px"
              borderColor="#000000"
              _hover={{ bg: "#636a6c" }}
              _active={{
                bg: "#636a6c",
              }}
              onClick={() => handlePaperClick(paper)}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {paper.title}
            </Button>
            {((hoveredPapers.indexOf(index) !== -1) || (selectedPaper && selectedPaper.title === paper.title)) && (
              <Box style={styles.hoverButtonStyles}>
                <Button onClick={() => props.handleDeletePaper(paper)}>
                  {/*<DeleteIcon boxSize={6} color='white'/>*/}
                  <DeleteIcon boxSize={6} />
                </Button>
              </Box>
            )}
          </div>
          {selectedPaper && selectedPaper.title === paper.title && (
            <div style={styles.infoStyles}>
              <DisplayPaperInformation
                author={paper.author}
                pub={paper.pub}
                year={paper.year}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
