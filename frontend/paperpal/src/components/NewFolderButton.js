import { Button } from "@chakra-ui/react";
import React from "react";

export default function NewFolderButton(props) {

  const styles = {
    folderStyles: {
      marginLeft: '28px',
      marginTop: '18px',
    },
  }

  return (
    <div style={styles.folderStyles}>
      <Button
        height='44px'
        width='145px'
        bg='#45B19D'
        borderRadius='10px'
        fontSize='23px'
        color='#FFFFFF'
        border='1px'
        borderColor='#000000'
        _hover={{ bg: '#378D7D' }}
        _active={{
          bg: '#307C6E',
        }}>
        {props.name}
      </Button>
    </div>
  );
}