import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function DisplayPaperInformation(props) {

  return (
    <div>
      <Box
        as="div"
        width='400px'
        bg='#b7bbbc'
        borderRadius='10px'
        fontSize='17px'
        color='#000000'
        border='1px'
        borderColor='#000000'
        paddingLeft= "1rem"
        paddingRight= "1rem"
        textAlign= "left"
        >
         <div>
         <Text>Title: {props.title}</Text>
          <Text>Authors: {props.author}</Text>
          <Text>Publication Year: {props.year}</Text>
        </div>
      </Box>
    </div>
  );
}