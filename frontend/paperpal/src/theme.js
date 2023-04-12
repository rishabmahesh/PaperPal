import { extendTheme } from "@chakra-ui/react"

const paperPalTheme = extendTheme({
    colors: {
        brand: {
            extensionStyles: "#F2F2F2",
            topBarStyles: "#13747A",
            upperBox: '#6CAFBE',
            bottomBarStyles: '#FFFFFF',
            folderBox: '#6CAFBE',
            addFolderButtonStyles: '#296A5E',
            500: '#6CAFBE'
        },
        addPaperButton: {
            500: "#2F83E7",
        },
    },
})

export default paperPalTheme;
