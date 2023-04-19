import { Button, Text } from "@chakra-ui/react";
import React, { useState } from 'react'
import DisplayPaperInformation from './DisplayPaperInformation'

export default function DisplayPapersinFolder(props) {

  const styles = {
    paperStyles: {
      marginLeft: '28px',
      marginTop: '18px',
    },
  }

  const [selectedPaper, setSelectedPaper] = useState(null);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };
  

  return (
    <div style={styles.paperStyles}>
      <Text fontSize="23px">
        Papers in: {props.name}
    </Text>
      {props.papers.map((paper) => (
        <div>
          <Button
            height='44px'
            width='400px'
            bg={selectedPaper === paper ? '#636a6c' : '#b7bbbc'}
            borderRadius='10px'
            fontSize='23px'
            color='#FFFFFF'
            border='1px'
            borderColor='#000000'
            marginLeft= '28px'
            marginTop= '18px'
            _hover={{ bg: '#636a6c' }}
            _active={{
              bg: '#636a6c',
            }}
            onClick={() => handlePaperClick(paper)}>
            {paper.title}
          </Button>
          {selectedPaper && selectedPaper.title === paper.title && (
            <div style={styles.infoStyles}>
              <DisplayPaperInformation author={paper.author} pub={paper.pub} year={paper.year}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}