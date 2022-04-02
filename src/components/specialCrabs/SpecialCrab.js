import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Grid from "@material-ui/core/Grid";

import { convertDecimalToHex } from '../../utils/utils';
import CrabCard from './CrabCard';
import Rules from './Rules';
import { subclassList } from '../../utils/classSubclassList';

const SpecialCrab = ({ crabadas }) => {

    const [specialCrabadas, setSpecialCrabadas] = useState([])
    const searchRules = [
        {
            class: 'PRIME',
            subclass: '',
            dnaSubclass: 'Fantom',
            quantity: 9,
            pincer: '',
            eyes: '',
            mouth: '',
            body: '',
            horn: '',
            shell: ''
        },
        {
            class: 'PRIME',
            subclass: '',
            dnaSubclass: 'Avalanche',
            quantity: 6,
            pincer: '',
            eyes: '',
            mouth: '',
            body: '',
            horn: '',
            shell: ''
        },
        {
            class: 'RUINED',
            subclass: '',
            dnaSubclass: 'Crauldron',
            quantity: 9,
            pincer: '',
            eyes: '',
            mouth: '',
            body: '',
            horn: '',
            shell: ''
        }
    ]
    const [rules, setRules] = useState(searchRules)
    const [crabsData, setCrabsData] = useState([])
    const crabsInfo = []

    const searchCrabs = (selectedClass, selectedSubclass, selectedDnaSubclass, selectedQuantity, selectedPincer, selectedEyes,
        selectedMouth, selectedBody, selectedHorn, selectedShell) => {
        const newRules = [...rules]
        if(selectedSubclass && !selectedDnaSubclass){
            selectedDnaSubclass = selectedSubclass
            selectedQuantity = 0
        }
        
        newRules.push({
            class: selectedClass,
            subclass: selectedSubclass,
            dnaSubclass: selectedDnaSubclass,
            quantity: selectedQuantity,
            pincer: selectedPincer,
            eyes: selectedEyes,
            mouth: selectedMouth,
            body: selectedBody,
            horn: selectedHorn,
            shell: selectedShell
        })

        setRules(newRules)
    }

    const removeRule = (i) => {
        const newRules = rules.filter((rule, index) => index !== i);
        setRules(newRules)
    }

    useEffect(() => {
        const findSpecialCrab = () => {
            if (crabadas.length > 0) {
                const specialCrabadas = []
                crabadas.forEach(crab => {
                    const adn = crab.dna;
                    const hexDna = convertDecimalToHex(adn)
                    const dna36 = hexDna.substr(hexDna.length - 36)
                    const decDna = dna36.match(/.{2}/g).map(dna => {
                        return parseInt(dna, 16)
                    })

                    if (rules.length > 0) {
                        rules.forEach(rule => {
                            const alreadyFound = specialCrabadas.find(specialCrab => specialCrab.id === crab.id);
                            if (crab.class_name === rule.class && !alreadyFound) {
                                if (rule.subclass) {
                                    const sc = subclassList.find(sub => sub.subclass === rule.subclass);
                                    if (sc.id === crab.crabada_subclass) {
                                        checkDnaAndParts(crab, decDna, rule, specialCrabadas)
                                    }
                                } else {
                                    checkDnaAndParts(crab, decDna, rule, specialCrabadas)
                                }

                            }

                        })
                    }

                });

                setSpecialCrabadas(specialCrabadas)

            }
        }

        findSpecialCrab();
    }, [crabadas, rules])

    const checkDnaAndParts = (crab, decDna, rule, specialCrabadas) => {
        const dnaSc = subclassList.find(sub => sub.subclass === rule.dnaSubclass);
        if (dnaSc) {
            const dna = decDna.filter(dna => dna === dnaSc.id).length;
            if (dna >= rule.quantity && checkCrabParts(decDna, rule)) {
                const foundCrab = {
                    id: crab.id,
                    searchedSubclass: rule.dnaSubclass,
                    quantity: dna
                }

                specialCrabadas.push(foundCrab)
            }
        } else {
            if (checkCrabParts(decDna, rule)) {
                const foundCrab = {
                    id: crab.id,
                    searchedSubclass: rule.dnaSubclass,
                    quantity: null
                }

                specialCrabadas.push(foundCrab)

            }
        }
    }

    const checkCrabParts = (decDna, rule) => {
        const checks = []
        const pincerSc = subclassList.find(sub => sub.subclass === rule.pincer);
        const eyesSc = subclassList.find(sub => sub.subclass === rule.eyes);
        const mouthSc = subclassList.find(sub => sub.subclass === rule.mouth);
        const bodySc = subclassList.find(sub => sub.subclass === rule.body);
        const hornSc = subclassList.find(sub => sub.subclass === rule.horn);
        const shellSc = subclassList.find(sub => sub.subclass === rule.shell);

        if (!pincerSc && !eyesSc && !mouthSc && !bodySc && !hornSc && !shellSc) {
            // There are no parts checks, so let the dna check pass
            return true
        }

        if (pincerSc) {
            const pincerCheck = (decDna[17] === pincerSc.id || decDna[16] === pincerSc.id || decDna[15] === pincerSc.id)
            checks.push(pincerCheck)
        }

        if (eyesSc) {
            const eyesCheck = (decDna[12] === eyesSc.id || decDna[13] === eyesSc.id || decDna[14] === eyesSc.id)
            checks.push(eyesCheck)
        }

        if (mouthSc) {
            const mouthCheck = (decDna[9] === mouthSc.id || decDna[10] === mouthSc.id || decDna[11] === mouthSc.id)
            checks.push(mouthCheck)
        }

        if (bodySc) {
            const bodyCheck = (decDna[8] === bodySc.id || decDna[7] === bodySc.id || decDna[6] === bodySc.id)
            checks.push(bodyCheck)
        }

        if (hornSc) {
            const hornCheck = (decDna[3] === hornSc.id || decDna[4] === hornSc.id || decDna[5] === hornSc.id)
            checks.push(hornCheck)
        }

        if (shellSc) {
            const shellCheck = (decDna[0] === shellSc.id || decDna[1] === shellSc.id || decDna[2] === shellSc.id)
            checks.push(shellCheck)
        }

        const invalidCrab = checks.find(c => c === false)

        return invalidCrab !== false
    }

    useEffect(() => {
        const getCrabData = async () => {
            if (specialCrabadas.length > 0) {
                specialCrabadas.map(async (crab) => {
                    const { data } = await axios.get(`https://api.crabada.com/public/crabada/info/${crab.id}`);
                    const crabsInf = {
                        data: data.result,
                        searchedSubclass: crab.searchedSubclass,
                        quantity: crab.quantity
                    }

                    crabsInfo.push(crabsInf)
                    if (crabsInfo.length === specialCrabadas.length) {
                        const sortedCrabadasInfo = crabsInfo.sort((a, b) => (a.data.price > b.data.price) ? 1 : -1) 
                        setCrabsData(sortedCrabadasInfo)
                    }
                })
            } else {
                setCrabsData([])
            }
        }

        getCrabData();
    }, [specialCrabadas])

    const renderedCrabadas = () => {
        if (crabsData.length > 0) {
            return (crabsData.map(crab => {
                if (crab.data) {
                    return (
                        <Grid item key={crab.data.id} xs={12} sm={6} md={3} xl={2} style={{ marginTop: "30px" }}>
                            <CrabCard
                                id={crab.data.id}
                                photo={crab.data.photo}
                                className={crab.data.class_name}
                                price={crab.data.price}
                                subclass={crab.data.crabada_subclass}
                                searchedSubclass={crab.searchedSubclass}
                                quantity={crab.quantity}
                            />
                        </Grid>
                    )
                } else {
                    return (
                        <SkeletonTheme baseColor="#202020" highlightColor="#505050" height={'50px'}>
                            <div style={{ width: '100px', height: '150px', position: 'fixed' }}>
                                <Skeleton count={1} />
                            </div>
                        </SkeletonTheme>
                    )
                }
            }))
        } else {
            return <div>
                <p style={{ fontSize: 15, color: '#ffffff', fontFamily: 'Arial', textAlign: 'center' }}>No matching crabs found</p></div>
        }

    }

    console.log(rules)
    return (
        <div style={{ margin: '15px', marginBottom: '40px' }}>
            <p style={{ marginTop: '50px', fontSize: 20, color: '#f5bf42', fontWeight: 'bold', fontFamily: 'Arial', textAlign: 'center' }}>SPECIAL CRABS</p>
            <Rules rules={rules} onFilterChanged={searchCrabs} removeRule={removeRule} />
            <Grid container>
                {renderedCrabadas()}
            </Grid>
        </div>
    )
}

export default SpecialCrab;