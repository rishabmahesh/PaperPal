import { Button, Text } from "@chakra-ui/react";
import React from "react";

export default function DisplayPapersinFolder(props) {

  const styles = {
    paperStyles: {
      marginLeft: '28px',
      marginTop: '18px',
    },
  }

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
            bg='#b7bbbc'
            borderRadius='10px'
            fontSize='23px'
            color='#FFFFFF'
            border='1px'
            borderColor='#000000'
            marginLeft= '28px'
            marginTop= '18px'
            _hover={{ bg: '#636a6c' }}
            _active={{
              bg: '#307C6E',
            }}>
            {paper.title}
          </Button>
        </div>
      ))}
    </div>
  );
}