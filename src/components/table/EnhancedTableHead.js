import React from 'react'
import TableHead from '@mui/material/TableHead';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles'
import './EnhancedTableHead.css'

const headCells = [
    {
      id: 'crabada_id',
      numeric: false,
      disablePadding: false,
      label: 'ID',
    },
    {
      id: 'is_origin',
      numeric: false,
      disablePadding: false,
      label: 'Origin',
    },
    {
      id: 'pure_number',
      numeric: false,
      disablePadding: false,
      label: 'Purity',
    },
    {
      id: 'legend_number',
      numeric: false,
      disablePadding: false,
      label: 'Legend',
    },
    {
      id: 'class_name',
      numeric: false,
      disablePadding: false,
      label: 'Class',
    },
    {
      id: 'breed_count',
      numeric: false,
      disablePadding: false,
      label: 'Breed',
    },
    {
      id: 'transaction_time',
      numeric: false,
      disablePadding: false,
      label: 'Transaction Date',
    },
    {
      id: 'buyer_full_name',
      numeric: false,
      disablePadding: false,
      label: 'Buyer',
    },
    {
      id: 'seller_full_name',
      numeric: false,
      disablePadding: false,
      label: 'Seller',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price'
    }
  ];

const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } =
      props;

    const useStyles = makeStyles({
        root: {
          '&$active': {
            color: '#f5bf42',
          }
        },
        active: {}, // pseudo
      });
      
    const classes = useStyles();
    const createSortHandler = (property, event) => {
        onRequestSort(event, property);
    };

    const renderedTableCells = headCells.map((headCell) => {
        return(
            <TableCell
                style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    hideSortIcon = {orderBy !== headCell.id}
                    direction={order}
                    onClick={()=>createSortHandler(headCell.id)}
                    classes={{ root: classes.root, active: classes.active }}
                >
                    {headCell.label}
                </TableSortLabel>
            </TableCell>
        )
    })


    return (
    
      <TableHead>
        <TableRow >
            {renderedTableCells}
        </TableRow>
      </TableHead>
    );
  }
  
  export default EnhancedTableHead;

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };
  