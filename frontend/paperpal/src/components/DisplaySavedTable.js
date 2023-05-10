import React from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { Key } from "@mui/icons-material";

export default function DisplaySavedTable(props) {
  const styles = {
    tableContainerStyles: {
      height: `${window.innerHeight * 0.75}px`,
      overflowY: 'auto',
    },
    insightCellStyles: {
      backgroundColor: '#FFD700',
    }
  }

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'title', //access nested data with dot notation
        enableColumnOrdering: true,
        header: 'Paper Title',
      },
      {
        accessorKey: 'author',
        enableColumnOrdering: true,
        header: 'Authors',
      },
      {
        accessorKey: 'Times_Cited', //normal accessorKey
        enableColumnOrdering: true,
        header: 'Citations No.',
      },
      {
        accessorKey: 'IEEE_Keywords',
        enableColumnOrdering: true,
        header: 'Keywords',
        Cell: ({ cell }) => (
          <div>
            {
              cell.row.original.Times_Cited === 7 ? (
                <div>
                  {cell.getValue() + "\n"}
                  <div>
                    <Key />
                  </div>
                </div>
              ) : (
                <div>
                  {cell.getValue()}
                </div>
              )
            }
          </div >
        ),
      },
      {
        accessorKey: 'year',
        enableColumnOrdering: true,
        header: 'Year',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


  return (
    <div style={styles.tableContainerStyles}>
      <MaterialReactTable
        columns={columns}
        data={props.papers}
        enableColumnOrdering
        enableColumnResizing
        enableStickyHeader
        enableStickyFooter
        enableBottomToolbar={false}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              width: '100%',
            }}
          >
            <Typography sx={{ mb: 2 }}>Title: {row.original.title}</Typography>
            <Typography sx={{ mb: 2 }}>Authors: {row.original.author}</Typography>
            <Typography sx={{ mb: 2 }}>Keywords: {row.original.IEEE_Keywords}</Typography>
            <Typography sx={{ mb: 2 }}>Abstract: {row.original.Abstract}</Typography>
            <Typography sx={{ mb: 2 }}>Number of references: {row.original.Number_references}</Typography>
            <Typography sx={{ mb: 2 }}>Number of citations: {row.original.Times_Cited}</Typography>
          </Box>
        )}
      />
    </div>
  );
}

