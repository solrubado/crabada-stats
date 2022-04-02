import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@mui/material/Card';
import Filters from './Filters';

import './Rules.css';


const Rules = ({ rules, onFilterChanged, removeRule }) => {

    const calculateText = (rule) => {
        var text = rule.class

        if(rule.subclass){
            text+= ` - ${rule.subclass}`
        }
        if(rule.dnaSubclass){
            text+= ` / ${rule.dnaSubclass}`
        }

        if(rule.quantity){
            text+= ` (${rule.quantity})`
        }

        if (rule.pincer){
            text+= ` Pincer: ${rule.pincer}`
        }


        if (rule.eyes){
            text+= ` Eyes: ${rule.eyes}`
        }


        if (rule.mouth){
            text+= ` Mouth: ${rule.mouth}`
        }


        if (rule.body){
            text+= ` Body: ${rule.body}`
        }


        if (rule.horn){
            text+= ` Horn: ${rule.horn}`
        }


        if (rule.shell){
            text+= ` Shell: ${rule.shell}`
        }

        return text;
    }

    return (
        <div>
            <Filters onFilterChanged={onFilterChanged}/>
            <Grid container>
                {rules.map((rule, index) => {
                    return (
                        <Grid item key={index}>
                            <Card variant="outlined"
                                style={{ display: 'flex', padding: 5, textAlign: 'center', backgroundColor: '#242424', borderColor: '#f5a742', borderWidth: '2px', margin: '10px' }}>
                                <div className="rule">{calculateText(rule)}</div>
                                <div className="cross" onClick={() => removeRule(index)}>X</div>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )

}

export default Rules;

