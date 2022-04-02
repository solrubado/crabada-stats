import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { numberWithCommas } from '../../utils/utils';
import {subclassList} from '../../utils/classSubclassList';

import './CrabCard.css'

const CrabCard = ({id, photo, className, price, subclass, searchedSubclass, quantity}) => {
    const priceToShow = ((price).toLocaleString('en-US', {useGrouping:false})/Math.pow(10,18)).toFixed(0)
    const sc = subclassList.find(sub => sub.id === subclass)

    return (
        <CardActionArea href={`https://marketplace.crabada.com/crabada/${id}`}>
            <Box sx={{ maxWidth: 275 }}>
                <Card variant="outlined" className="crab-card">
                    <p className="price">{numberWithCommas(priceToShow)} TUS</p>
                    <img loading="lazy" alt={`Crabada ${id}`} width="200" height="200" src={`https://photos.crabada.com/${photo}`}/>
                    <p className="crab-id">Crab {id}</p>
                    <p className="crab-class">{className.toUpperCase()} - {sc.subclass}</p>
                    <p className="crab-searched-class">{searchedSubclass} ({quantity}/18)</p>
                </Card>
            </Box>
        </CardActionArea>
      );
}

export default CrabCard;