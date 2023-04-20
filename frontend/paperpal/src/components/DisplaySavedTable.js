import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const savedPaperColumns = [
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'authors', headerName: 'Authors', width: 130 },
  { field: 'year', headerName: 'Year', width: 130 },
  { field: 'citations', headerName: 'Citation no.', width: 130 },
  { field: 'references', headerName: 'Reference no.', width: 130 },
]

const savedPaperRows = [
  { id: 1, title: 'Paper 1', authors: 'Author 1', year: '2021', citations: '1', references: '1' },
  { id: 2, title: 'Paper 2', authors: 'Author 2', year: '2021', citations: '1', references: '1' },
  { id: 3, title: 'Paper 3', authors: 'Author 3', year: '2021', citations: '1', references: '1' },
  { id: 4, title: 'Paper 4', authors: 'Author 4', year: '2021', citations: '1', references: '1' },
  { id: 5, title: 'Paper 5', authors: 'Author 5', year: '2021', citations: '1', references: '1' },
  { id: 6, title: 'Paper 6', authors: 'Author 6', year: '2021', citations: '1', references: '1' },
  { id: 7, title: 'Paper 7', authors: 'Author 7', year: '2021', citations: '1', references: '1' },
  { id: 8, title: 'Paper 8', authors: 'Author 8', year: '2021', citations: '1', references: '1' },
  { id: 9, title: 'Paper 9', authors: 'Author 9', year: '2021', citations: '1', references: '1' },
  { id: 10, title: 'Paper 10', authors: 'Author 10', year: '2021', citations: '1', references: '1' },
  { id: 11, title: 'Paper 11', authors: 'Author 11', year: '2021', citations: '1', references: '1' },
  { id: 12, title: 'Paper 12', authors: 'Author 12', year: '2021', citations: '1', references: '1' },
  { id: 13, title: 'Paper 13', authors: 'Author 13', year: '2021', citations: '1', references: '1' },
  { id: 14, title: 'Paper 14', authors: 'Author 14', year: '2021', citations: '1', references: '1' },
  { id: 15, title: 'Paper 15', authors: 'Author 15', year: '2021', citations: '1', references: '1' },
]

export default function DisplaySavedTable() {
  const styles = {
    tableContainerStyles: {
      height: `${window.innerHeight*0.70}px`,
    },
  }

  return (
    <div style={styles.tableContainerStyles}>
      <DataGrid
        rows={savedPaperRows}
        columns={savedPaperColumns}
        pageSize={10}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

