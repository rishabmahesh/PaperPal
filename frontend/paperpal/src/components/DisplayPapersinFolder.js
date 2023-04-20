import { Button, Text, Box } from "@chakra-ui/react";
import React, { useState } from 'react';
import DisplayPaperInformation from './DisplayPaperInformation';
import {DeleteIcon} from "@chakra-ui/icons";

export default function DisplayPapersinFolder(props) {
  const styles = {
    paperStyles: {
      marginLeft: '28px',
      marginTop: '18px',
    },
    boxStyles: {
      // display: 'flex',
      alignItems: 'center',
      position: 'relative',
      // backgroundColor: "#b7bbbc",
      marginTop: '20px'
    },
    hoverButtonStyles: {

      // display: 'none',
      position: 'absolute',
      alignItems: 'right',

      top: '26%',
      right: '2%',
    },
  }

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [hoveredPapers, setHoveredPapers] = useState([]);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  const handleMouseEnter = (index) => {
    setHoveredPapers([...hoveredPapers, index]);
  }

  const handleMouseLeave = (index) => {
    setHoveredPapers(hoveredPapers.filter(item => item !== index));
  }

  const handleDeletePaper =  (paper) => {

  };
  return (
      <div style={styles.paperStyles}>
        <Text fontSize="23px">
          Papers in: {props.name}
        </Text>
        {props.papers.map((paper, index) => (
            <div key={index} style={styles.boxStyles} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
              <Button
                  height='44px'
                  width='400px'
                  bg={selectedPaper === paper ? '#636a6c' : '#b7bbbc'}
                  // bg={selectedPaper === paper ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 0, 255, 0.5)'}
                  borderRadius='10px'
                  fontSize='23px'
                  color='#FFFFFF'
                  border='1px'
                  borderColor='#000000'
                  // marginLeft='28px'
                  // marginTop='18px'
                  _hover={{ bg: '#636a6c' }}
                  _active={{
                    bg: '#636a6c',
                  }}
                  onClick={() => handlePaperClick(paper)}>
                {paper.title}
              </Button>
              {hoveredPapers.indexOf(index) !== -1 && (
                  <Box style={styles.hoverButtonStyles}>
                    <Button
                    onClick={() => props.handleDeletePaper(paper)}
                    >
                      <DeleteIcon boxSize={6} color='white'/>
                    </Button>
                  </Box>
              )}
              {selectedPaper && selectedPaper.title === paper.title && (
                  <div style={styles.infoStyles}>
                    <DisplayPaperInformation author={paper.author} pub={paper.pub} year={paper.year} />
                  </div>
              )}
            </div>
        ))}
      </div>
  );
}
