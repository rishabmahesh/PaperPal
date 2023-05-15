import React from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { Key, Person2, Article } from "@mui/icons-material";

export default function DisplaySavedTable(props) {
  const styles = {
    tableContainerStyles: {
      height: `${window.innerHeight - 200}px`,
        // height: 'inherit',
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


  // columns for the insight table
  const insightColumns = React.useMemo(
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
        Cell: ({ cell }) => (
          <div>
            {
              <div>
                {cell.getValue() + "\n"}
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid black',
                      padding: '5px',
                      borderRadius: '5px',
                      width: '75px',
                      height: '30px',
                    }}
                  >
                    <Person2 sx={{ mr: 1 }} />
                    <div style={{
                      width: '30px',
                      height: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>{cell.row.original.Author_Score.toFixed(0) + "%"}</div>
                  </Box>
                </div>
              </div>
            }
          </div >
        ),
      },
      {
        accessorKey: 'Times_Cited',
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
              cell.row.original.Keyword_Score > 0 ? (
                <div>
                  {cell.getValue() + "\n"}
                  <div>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid black',
                        padding: '5px',
                        borderRadius: '5px',
                        width: '75px',
                        height: '30px',
                      }}
                    >
                      <Key sx={{ mr: 1 }} />
                      <div style={{
                        width: '30px',
                        height: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>{cell.row.original.Keyword_Score.toFixed(0) + "%"}</div>
                    </Box>
                  </div>
                </div>
              ) : (
                <div>
                  {console.log(cell.row.original)}
                  {cell.getValue()}
                </div>
              )
            }
          </div >
        ),
      },
      {
        accessorKey: 'Year',
        enableColumnOrdering: true,
        header: 'Year',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.insightsArray],
  );


  return (
    <div style={styles.tableContainerStyles}>
      {props.insightsArray !== null && props.insightsArray !== undefined ? (
        <>
          {console.log('displaying insights table ', props.insightArray)}
          {/* when insights is clicked, display this table */}
          <MaterialReactTable
            columns={insightColumns}
            data={props.insightsArray}
            enableColumnOrdering
            enableColumnResizing
            enableStickyHeader
            enableStickyFooter
            enableBottomToolbar={true}
            renderDetailPanel={({ row }) => (
              <Box
                sx={{
                  display: 'grid',
                  margin: 'auto',
                  width: '100%',
                }}
              >
                <Typography sx={{ mb: 2 }}>Title: {row.original.Title}</Typography>
                <Typography sx={{ mb: 2 }}>
                  Authors: {row.original.Authors}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid black',
                      padding: '5px',
                      borderRadius: '5px',
                      width: '75px',
                      height: '30px',
                    }}
                  >
                    <Person2 sx={{ mr: 1 }} />
                    <div style={{
                      width: '30px',
                      height: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>{row.original.Author_Score.toFixed(0) + "%"}</div>
                  </Box>
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Keywords: {row.original.IEEE_Keywords}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid black',
                      padding: '5px',
                      borderRadius: '5px',
                      width: '75px',
                      height: '30px',
                    }}
                  >
                    <Key sx={{ mr: 1 }} />
                    <div style={{
                      width: '30px',
                      height: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>{row.original.Keyword_Score.toFixed(0) + "%"}</div>
                  </Box>
                </Typography>

                {row.original.Abstract_Score > 0 ? (
                  <>
                    <Typography sx={{ mb: 2 }}>
                      Abstract: {row.original.Abstract}

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '2px solid black',
                          padding: '5px',
                          borderRadius: '5px',
                          width: '75px',
                          height: '30px',
                        }}
                      >
                        <Article sx={{ mr: 1 }} />
                        <div style={{


                          width: '30px',
                          height: '25px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>{row.original.Abstract_Score.toFixed(0) + "%"}</div>
                      </Box>

                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ mb: 2 }}>Abstract: {row.original.Abstract}</Typography>
                )}

                <Typography sx={{ mb: 2 }}>Number of references: {row.original.Number_references}</Typography>
                <Typography sx={{ mb: 2 }}>Number of citations: {row.original.Times_Cited}</Typography>
              </Box>
            )}
          />
        </>

      ) : (
        <>
          {console.log('displaying other table ', props.insightsArray)}
          <MaterialReactTable
            columns={columns}
            data={props.papers}
            enableColumnOrdering
            enableColumnResizing
            enableStickyHeader
            enableStickyFooter
            enableBottomToolbar={true}
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
        </>

      )}

    </div>
  );
}

