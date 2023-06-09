import React from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Typography, IconButton } from '@mui/material';
import { Lightbulb as LightBulbIcon } from '@mui/icons-material';

export default function DisplayRecommendationTable(props) {

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'Title', //access nested data with dot notation
        enableColumnOrdering: true,
        header: 'Paper Title',
      },
      {
        accessorKey: 'Authors',
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
      },
      {
        accessorKey: 'Year',
        enableColumnOrdering: true,
        header: 'Year',
      },
    ],
    [],
  );

  const [bulbIndex, setBulbIndex] = React.useState(props.bulbIndex);

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={props.papers}
        enableColumnOrdering
        enableColumnResizing
        enableStickyHeader
        enableStickyFooter
        enableRowActions
        enableBottomToolbar={true}
        muiTableContainerProps={{ sx: { maxHeight: `${window.innerHeight - 280}px` } }}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              width: '100%',
            }}
          >
            <Typography sx={{ mb: 2 }}>Title: {row.original.Title}</Typography>
            <Typography sx={{ mb: 2 }}>Authors: {row.original.Authors}</Typography>
            <Typography sx={{ mb: 2 }}>Keywords: {row.original.IEEE_Keywords}</Typography>
            <Typography sx={{ mb: 2 }}>Abstract: {row.original.Abstract}</Typography>
            <Typography sx={{ mb: 2 }}>Number of references: {row.original.Number_references}</Typography>
            <Typography sx={{ mb: 2 }}>Number of citations: {row.original.Times_Cited}</Typography>
          </Box>
        )}
        renderRowActions={(row) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
              color="#000000"
              onClick={() => {
                // bulb is on
                if (bulbIndex !== -1) {
                  // different bulb is already on
                  if (bulbIndex !== row.row.id) {
                    setBulbIndex(row.row.id)
                    props.getInsights(row.row.original.Paper_ID, row.row.id)

                  } else {
                    // turn off bulb of row
                    setBulbIndex(-1)
                    props.getInsights(row.row.original.Paper_ID, -1)
                  }
                } else {
                  // bulb is off
                  setBulbIndex(row.row.id)
                  props.getInsights(row.row.original.Paper_ID, row.row.id)

                }
              }}
            >
              {bulbIndex === row.row.id ? (
                <LightBulbIcon style={{ color: "#FFD700" }} />
              ) : (
                <>
                  <LightBulbIcon />
                </>
              )}
            </IconButton>
          </Box>
        )}
      />
    </div>
  );
}
