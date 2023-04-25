import React from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Key } from "@mui/icons-material";

const paperData = [
  {
    Paper_ID: 146361,
    Title: "The VIS-5D system for easy interactive visualization",
    Date_Published: 1990,
    Abstract: "The VIS-5D system provides highly interactive visual access to five-dimensional data sets containing up to 50 million data points. VIS-5D runs on the Stardent ST-1000 and ST-2000 workstations and generates animated three-dimensional graphics from gridded data sets in real time. It provides a widget-based user interface and fast visual response which allows scientists to interactively explore their data sets. VIS-5D generates literal and intuitive depictions of data, has user controls that are data oriented rather than graphics oriented, and provides a WYSIWYG (what-you-see-is-what-you-get) response. The result is a system that enables scientists to produce and direct their own animations.<\n>",
    Author_Keywords: null,
    Track: "Vis",
    Award_Type: null,
    Award: false,
    Number_Authors: 2,
    Number_references: 2,
    Times_Cited: 27,
    IEEE_Keywords: "Animation,Data visualization,Graphics,Workstations,Software tools,Earth,Atmospheric modeling,Hydrology,Land surface temperature,Ocean temperature",
    Authors: "Bill Hibbard, David Santek",
  },
  {
    Paper_ID: 146362,
    Title: "A procedural interface for volume rendering",
    Date_Published: 1990,
    Abstract: "The author presents a simple, procedural interface for volume rendering. The interface is built on three types of objects: volumes, which contain the data to be visualized, environments, which set up viewing and lighting, and image objects, which convert results to a user-definable format. A volume is rendered against a particular environment with the results sent to an image object for conversion. By defining volume qualities such as color, opacity, and gradient in terms of user-definable transfer functions, the rendering process is made independent of the data set's underlying representation.<\n>",
    Author_Keywords: null,
    Track: "Vis",
    Award_Type: null,
    Award: false,
    Number_Authors: 1,
    Number_references: 9,
    Times_Cited: 3,
    IEEE_Keywords: "Rendering (computer graphics),Transfer functions,Data visualization,Image converters,Data structures,Drives,Color,Light sources",
    Authors: "J.L. Montine",
  },
  {
    Paper_ID: 146363,
    Title: "Techniques for the interactive visualization of volumetric data",
    Date_Published: 1990,
    Abstract: "Some ideas and techniques for visualizing volumetric data are introduced. The methods presented are different from both the volume rendering techniques and surface contour methods. Volumetric data is data with a domain of three independent variables. The independent variables do not have to indicate a position in space and can be abstract in the sense that they can represent any quantity. The authors cover only the case where the dependent data is a single scalar. The authors describe a collection of techniques and ideas for graphing cuberille grid data. All of these techniques are quite simple and rather easy to implement. During the development of these techniques, the authors were particularly concerned with allowing the user to interact with the system in order to interrogate and analyze the relationships indicated by the volumetric data.<\n>",
    Author_Keywords: null,
    Track: "Vis",
    Award_Type: null,
    Award: false,
    Number_Authors: 2,
    Number_references: 35,
    Times_Cited: 7,
    IEEE_Keywords: "Data visualization,Scattering,Computer science,Temperature measurement,Furnaces,Functional analysis",
    Authors: "Gregory M. Nielson, Bernd Hamann",
  }
]

export default function DisplaySavedTable() {
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
              cell.row.original.Times_Cited === 7 ? (
                <div>
                  {cell.getValue() + "\n"}
                  {console.log(cell.row.original.Times_Cited)}
                  <div>
                    <PersonOutlineIcon />
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
        accessorKey: 'Date_Published',
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
        data={paperData}
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
            <Typography sx={{ mb: 2 }}>Title: {row.original.Title}</Typography>
            <Typography sx={{ mb: 2 }}>Authors: {row.original.Authors}</Typography>
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

