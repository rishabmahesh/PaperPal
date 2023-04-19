import { Button, RangeSlider, RangeSliderThumb, RangeSliderTrack, RangeSliderFilledTrack, Box, Text, Input, Tag, TagLabel, TagCloseButton, } from "@chakra-ui/react";
import React, { useState } from 'react'
import Select from 'react-select';

export default function FilterTab(props) {

  const styles = {
    paddingStyles: {
      marginLeft: '10px',
      marginTop: '20px',
      display: 'flex', 
      justifyContent: 'center',
      textAlign: 'center'
    },
  }
  
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  //grab from the end point
  //is not displaying for some reason
  const authorOptions = [
    { value: "author1", label: "Author 1" },
    { value: "author2", label: "Author 2" },
    { value: "author3", label: "Author 3" },
    { value: "author4", label: "Author 4" },
  ];

  // Handle change event when selecting authors
  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions);
  };

  //Year 
  const [yearRange, setYearRange] = useState([1990, 2020]); // initial range

  const handleYearRangeChange = (newRange) => {
    setYearRange(newRange);
  };

  //Keyword
  const [keywordInputValue, setKeywordInputValue] = useState('');
  const [keywordTags, setKeywordTags] = useState([]);

  const handleKeywordInputChange = (event) => {
    setKeywordInputValue(event.target.value);
  };

  const handleKeywordInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      setKeywordTags([...keywordTags, keywordInputValue]);
      setKeywordInputValue('');
    }
  };

  const handleKeywordTagClose = (tag) => {
    setKeywordTags(keywordTags.filter((t) => t !== tag));
  };

  return (
    <div>
        <h1> Filters</h1>
        <div> 
            <h1> Authors</h1>
            <Select
                placeholder="Select authors"
                isMulti
                value={selectedAuthors}
                onChange={handleAuthorChange}
                options={authorOptions}
            />
        </div>

        <div style={styles.paddingStyles}>
            <Box>
                <Text>Year Range: {yearRange[0]} - {yearRange[1]}</Text>
                <RangeSlider
                    min={1990}
                    max={2020}
                    step={1}
                    defaultValue={yearRange}
                    onChange={handleYearRangeChange}
                >
                    <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
            </Box>
        </div>

        <div>
            <h1> Keywords</h1>
            <Input
                placeholder="Enter keywords"
                value={keywordInputValue}
                onChange={handleKeywordInputChange}
                onKeyDown={handleKeywordInputKeyDown}
            />
            <Box mt="1" bg="#D9D9D9">
                {keywordTags.map((tag) => (
                <Tag
                    key={tag}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                    mr="1"
                >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleKeywordTagClose(tag)} />
                </Tag>
                ))}
            </Box>
        </div>

    <div style={styles.paddingStyles}>
        <Button
            height={props.height}
            width={props.width}
            bg='#45B19D'
            borderRadius='10px'
            fontSize='23px'
            color='#FFFFFF'
            border='1px'
            borderColor='#000000'
            _hover={{ bg: '#378D7D' }}
            _active={{
            bg: '#307C6E',
            }}
            onClick={props.onClick}>
            Apply
        </Button></div>
        
    </div>
  );
}