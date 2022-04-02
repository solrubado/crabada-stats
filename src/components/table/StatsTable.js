import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import EnhancedTableHead from './EnhancedTableHead';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tabs/style/react-tabs.css';
import './StatsTable.css'
import { numberWithCommas } from '../../utils/utils';


const StatsTable = () => {
    const [crabadas, setCrabadas] = useState([])
    const [filterCrabadas, setFilterCrabadas] = useState([])
    const [tab, setTab] = useState(0)
    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('pure_number')

    useEffect(() => {
      getCrabadas()
    }, [])

    const getCrabadas = async() => {
      const { data } = await axios.get('https://api.crabada.com/public/order/matched-recently?limit=1000&page=1');
      setCrabadas(data.result);
      setFilterCrabadas(data.result)
  }

    const tabs = ["all","pure bulk","pure prime","pure surge","pure sunken","pure craboid","pure ruined","pure gem","pure organic"];

    const handleRequestSort = (event, property) => {
        const isAsc = order === 'asc';
        setOrder(isAsc? 'desc': 'asc')
        setOrderBy(property)
      };
      
    const getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
    
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

    const changeTab = (tab) => {
        var filter = []
        setTab(tab)

        if(tab === 'all'){
            setFilterCrabadas(crabadas)
        } else {
            const crabadaClass = tab.split('pure ')[1].toUpperCase() 
            filter = crabadas.filter(crabada => crabada.pure_number === 6 && crabada.class_name === crabadaClass)
            setFilterCrabadas(filter)
        }
    }

    const renderedTabs = tabs.map( tab => {
        return( 
            <Tab style={{fontWeight:'bold', fontFamily:'Gill Sans'}}
            onClick = {()=> changeTab(tab)}>{tab.toLocaleUpperCase()}</Tab>
        )
    })


    const handleTabs = (e, val) => {
      setTab(val)
    }
  
    return (
        <div className="background">
          <Tabs value={tab} onChange={handleTabs}>
            <TabList>
              {renderedTabs}
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
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody> 
                      {      
                        crabadas.length === 0 ?
                        <SkeletonTheme baseColor="#202020" highlightColor="#505050" height={'50px'}>
                          <div style={{width:'100%', height:'100%', position:'fixed'}}>
                            <Skeleton count={50} />
                          </div>
                        </SkeletonTheme> 
                        :
                        filterCrabadas.sort(getComparator(order, orderBy))
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
                              <TableCell component="th" align="right">{numberWithCommas(price)}</TableCell>
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
    )

};

export default StatsTable;