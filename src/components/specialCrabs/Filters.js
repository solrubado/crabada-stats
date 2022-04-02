import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, TextField, makeStyles, Button } from "@material-ui/core";

import { crabClasses, subclassList } from '../../utils/classSubclassList';


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 100,
        margin: 10,
        padding: '2px',
    },
    quantityFormControl: {
        minWidth: 50,
        margin: 10,
        padding: '2px',
    },
}))

const Filters = ({ onFilterChanged }) => {
    const classes = useStyles();
    const [selectedClass, setSelectedClass] = useState('');
    const [subclasses, setSubclasses] = useState([])
    const [selectedSubClass, setSelectedSubclass] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [selectedPincer, setSelectedPincer] = useState('')
    const [selectedEyes, setSelectedEyes] = useState('')
    const [selectedMouth, setSelectedMouth] = useState('')
    const [selectedBody, setSelectedBody] = useState('')
    const [selectedHorn, setSelectedHorn] = useState('')
    const [selectedShell, setSelectedShell] = useState('')

    const handleNewFilter = () => {
        onFilterChanged(selectedClass, selectedSubClass, selectedQuantity, selectedPincer, selectedEyes,
            selectedMouth, selectedBody, selectedHorn, selectedShell)
    }
    const handleClassChange = (e) => {
        const selectedClass = e.target.value
        setSelectedClass(selectedClass)
        findSubclasses(selectedClass)
    }

    const handleSubclassChange = (e) => {
        if (e.target.value === '') {
            setSelectedSubclass('')
            setSelectedQuantity(0)
        }
        setSelectedSubclass(e.target.value)
    }

    const handleQuantityChange = (e) => {
        setSelectedQuantity(e.target.value)
    }

    const handlePartOfBodyChange = (e, setFunction) => {
        if (!e.target.value) {
            setFunction('')
        }

        setFunction(e.target.value)
    }

    const findSubclasses = (selectedClass) => {
        const sc = subclassList.filter(sub => sub.class === selectedClass)
        sc.push('None');
        setSubclasses(sc);
    }

    return (
        <div>
            <h2 className="filters">Filters</h2>
            <div style={{ backgroundColor: '#ffff', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Classes</InputLabel>
                    <Select
                    onChange={handleClassChange}>
                        {crabClasses.map(c => {
                            return (<MenuItem key={c} value={c}>{c}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Subclasses</InputLabel>
                    <Select onChange={handleSubclassChange}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.quantityFormControl}>
                    <TextField
                        id="quantity-input"
                        name="quantity"
                        label="quantity"
                        type="text"
                        style={{color:'#ffff'}}
                        onChange={handleQuantityChange}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Pincer</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedPincer)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Eyes</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedEyes)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Mouth</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedMouth)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel >Body</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedBody)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Horn</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedHorn)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Shell</InputLabel>
                    <Select onChange={(e) => handlePartOfBodyChange(e, setSelectedShell)}>
                        {subclasses.map(s => {
                            return (<MenuItem key={s.subclass} value={s.subclass}>{s.subclass}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <Button style={{ opacity:'1',backgroundColor: '#fc712c', color: '#ffff', borderRadius: '4px' }} onClick={handleNewFilter}>Apply Filter</Button>
            </div>
        </div>

    )
}

export default Filters;