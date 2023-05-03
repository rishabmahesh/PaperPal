import { EditIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

export default function NewFolderButton(props) {

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [text, setText] = React.useState(props.name);
  const buttonRef = React.useRef(null);

  const handleBlur = (e) => {
    console.log("in blur");
    setIsEditMode(false);
    props.onSave(text, props.name);
    console.log("in blur after save");
    console.log("text in blur", text);
  };

  const handleChange = (e) =>{
    //console.log("in chage", text);
    //console.log("in change but inner text", e.target.innerText, "boolean", e.target.innerText !== "")
    if (e.target.innerText !== ""){
      setText(e.target.innerText);
    }
    else{
      console.log("in the else statement");
      setText(props.name);
      console.log("text in there", text);
    }
    
    //console.log("in change", text);
  }

  React.useEffect(() => {
    if (isEditMode) {
      buttonRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(buttonRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditMode, text]);
  

  const styles = {
    folderStyles: {
      marginLeft: props.marginLeft,
      marginTop: props.marginTop,
    },
  }

  return (
    <div style={styles.folderStyles}>
      <ButtonGroup variant='outline' spacing='1'>
      {isEditMode ? (
          <Button
            height={props.height}
            width={props.width}
            bg="#45B19D"
            borderRadius="10px"
            fontSize="23px"
            color="#FFFFFF"
            border="1px"
            borderColor="#000000"
            _hover={{ bg: "#378D7D" }}
            _active={{
              bg: "#307C6E",
            }}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
              if (e.key === "Enter") {
                e.preventDefault();
                handleBlur();
              }
            }}
            onInput={handleChange}
            contentEditable
            suppressContentEditableWarning
            ref={buttonRef}
            overflow={"hidden"}
          >
            {text}
          </Button>
        ) : (
          <Button
            height={props.height}
            width={props.width}
            bg="#45B19D"
            borderRadius="10px"
            fontSize="23px"
            color="#FFFFFF"
            border="1px"
            borderColor="#000000"
            _hover={{ bg: "#378D7D" }}
            _active={{
              bg: "#307C6E",
            }}
            onClick={props.onClick}
            overflow={"hidden"}
          >
            {text}
          </Button>
        )}
        <Button onClick={() => setIsEditMode(true)}>
          <EditIcon />
        </Button>
    </ButtonGroup>
      
    </div>
  );
}