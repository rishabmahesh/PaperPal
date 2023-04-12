import { Button } from "@chakra-ui/react";
import React from "react";

export default function NewFolderButton() {
  return (
    <Button
      height='44px'
      width='145px'
      bg='#45B19D'
      borderRadius='10px'
      fontSize='23px'
      color='#FFFFFF'
      border='1px'
      borderColor='#000000'
      // _hover={{ bg: '#307C6E' }} 
      _active={{
        bg: '#307C6E',
      }}>
      Folder 1
    </Button>
  );
}