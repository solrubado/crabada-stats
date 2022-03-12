import * as React from 'react';
import './Main.css'
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crabadas: [],
            filterCrabadas: [],
            tab:'all',
            order: 'desc',
            orderBy: 'pure_number',
            selected: [],
            page: 0,
            rowsPerPage: 5
        };
      }

      handleRequestSort = (event, property) => {
        const isAsc = this.state.order === 'asc';
        this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property});
      };
      
      getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }

    changeTab = (tab) => {
        var filter = []

        switch (tab) {
            case 'all':
              filter = this.state.crabadas;
              this.setState({filterCrabadas: filter})
              break;
            case 'pure bulk':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'BULK')
              this.setState({filterCrabadas: filter})
              break;
            case 'pure prime':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'PRIME')
              this.setState({filterCrabadas: filter})
              break
            case 'pure surge':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'SURGE')
              this.setState({filterCrabadas: filter})
              break
            case 'pure sunken':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'SUNKEN')
              this.setState({filterCrabadas: filter})
              break
            case 'pure craboid':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'CRABOID')
              this.setState({filterCrabadas: filter})
              break
            case 'pure ruined':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'RUINED')
              this.setState({filterCrabadas: filter})
              break
            case 'pure gem':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'GEM')
              this.setState({filterCrabadas: filter})
              break
            case 'pure organic':
              filter = this.state.crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === 'ORGANIC')
              this.setState({filterCrabadas: filter})
              break
          }

      }

    componentDidMount() {
        const axios = require('axios').default;
        axios.get('https://api.crabada.com/public/order/matched-recently?limit=1000&page=1')
            .then((response) => {
                this.setState({crabadas: response.data.result, filterCrabadas: response.data.result})
            })
            .catch((error)=>{
            console.log(error);
            });
    }

    render(){
        return (
            <div className="background">
                <img src={logo} style={{padding: 20}} alt="Logo" />         
                <Tabs>
                    <TabList>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                    onClick = {()=>this.changeTab('all')}>All</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                    onClick = {()=>this.changeTab('pure bulk')}>Pure Bulk</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure prime')}>Pure Prime</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure surge')}>Pure Surge</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure sunken')}>Pure Sunken</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure craboid')}>Pure Craboid</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure ruined')}>Pure Ruined</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure gem')}>Pure Gem</Tab>
                    <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
                     onClick = {()=>this.changeTab('pure organic')}>Pure Organic</Tab>
                    </TabList>
                </Tabs>
            
            <div className='table-div'>
            <Box sx={{ width: '100%'}} style={{background:'#00000'}}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                
                <TableContainer >
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    className="table"
                  >
                    <EnhancedTableHead
                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      onRequestSort={this.handleRequestSort}
                    />
                    <TableBody> 
                      {      
                        this.state.crabadas.size == 0?
                        <Skeleton count={5} /> :
                      
                        stableSort(this.state.filterCrabadas, this.getComparator(this.state.order, this.state.orderBy))
                        .map((row, index) => {
                            const date = moment(row.transaction_time*1000).format("DD-MM-YY hh:mm:ss")
                            const price = ((row.price).toLocaleString('fullwide', {useGrouping:false})/Math.pow(10,18)).toFixed(0)
                        
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={row.crabada_id+'/'+row.transaction_time+index}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                padding="normal"
                                key={row.crabada_id+row.transaction_time}
                              >
                                {row.crabada_id}
                              </TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 10, color:'#fffff' }}>{row.is_origin}</TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 10 }}>{row.pure_number}</TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 20 }}>{row.legend_number}</TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 60 }}>{row.class_name}</TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 60 }}>{row.breed_count}</TableCell>
                              <TableCell component="th" align="left" style={{ maxWidth: 60 }}>{date}</TableCell>
                              <TableCell component="th" align="left" padding="normal" style={{ maxWidth: 60,  overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.buyer_full_name}</TableCell>
                              <TableCell component="th" align="left" padding="normal" style={{ maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis'}}>{row.seller_full_name}</TableCell>
                              <TableCell component="th" align="right">{price}</TableCell>
                            </TableRow>
                          );
                        })}
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
            </div>
            </div>
          );

    }
}

export default Main;


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}



// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell
            style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              style={{color: orderBy === headCell.id? '#f5bf42':'#fffff'}}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span"
                style={{color: '#f5bf42'}}
                 sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
