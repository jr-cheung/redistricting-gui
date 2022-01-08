import { Grid, Button, Typography, Slider, TextField, Checkbox, Radio, RadioGroup, FormControl, FormControlLabel, MenuItem, Select, Container } from '@material-ui/core'
import React from 'react'
import axios from 'axios'
import IncumbentProtectionDialog from './IncumbentProtectionDialog.js'

export default function ConstraintScreen(props) {
    const [compactness, setCompactness] = React.useState(props.districtingReq.compactness)
    const [compactnessType, setCompactnessType] = React.useState(props.districtingReq.compactnessType)
    const [popEquality, setPopEquality] = React.useState(props.districtingReq.popEquality)
    const [popEqualityType, setPopEqualityType] = React.useState(props.districtingReq.popEqualityType)
    const [majMinDistricts, setMajMinDistricts] = React.useState(props.districtingReq.majMinDistricts)
    const [majMinThreshold, setMajMinThreshold] = React.useState(props.districtingReq.majMinThreshold)
    const [incumbentProtection, setIncumbentProtection] = React.useState(props.districtingReq.incumbentProtection)
    const [displayedCompactness, setDisplayedCompactness] = React.useState(compactness)
    const [displayedPopEquality, setDisplayedPopEquality] = React.useState(popEquality)
    const [displayedMajMinThreshold, setDisplayedMajMinThreshold] = React.useState(majMinThreshold)
    const [incumbentChecked, setIncumbentChecked] = React.useState(incumbentProtection.length > 0)
    const [incumbentButtonDisabled, setIncumbentButtonDisabled] = React.useState(!incumbentChecked)
    const [openIncumbentDialog, setOpenIncumbentDialog] = React.useState(false)
    const [majMinDistrictsInput, setMajMinDistrictsInput] = React.useState(majMinDistricts)
    const [majMinDistrictsInputError, setMajMinDistrictsInputError] = React.useState(false)
    const [majMinDistrictsHelperText, setMajMinDistrictsHelperText] = React.useState("")
    const [chosenMinority, setChosenMinority] = React.useState(props.districtingReq.chosenMinority)
    const [maximumMajMinDistricts, setMaximumMajMinDistricts] = React.useState(Math.floor((props.districtingReq.stateInfo.blackPop / props.districtingReq.stateInfo.totalPop) * props.districtingReq.stateInfo.districtsTotal))

    let qs = require('qs')

    function getMinorityValue(minorityName) {
        if (minorityName === "African American") return "0"
        else if (minorityName === "Hispanic") return "1"
        else if (minorityName === "Asian") return "2"
        else if (minorityName === "Native American") return "3"
    }

    function handleTabIncrease(event) {
        props.handleDistReq(
            {
                "compactness": compactness,
                "compactnessType": compactnessType,
                "popEquality": popEquality,
                "popEqualityType": popEqualityType,
                "majMinDistricts": majMinDistricts,
                "majMinThreshold": majMinThreshold,
                "incumbentProtection": incumbentProtection,
                "chosenMinority": chosenMinority
            }
        )
        props.handleLoadingConstraintSummary()
        axios.get("/filtersummary", {
            params: {
                popEqualityThreshold: popEquality/100,
                popEqualityType: popEqualityType,
                majMinDistricts: majMinDistricts,
                majMinThreshold: majMinThreshold,
                compactness: compactness,
                incumbents: incumbentProtection,
                boxplotMin: chosenMinority
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            },
        }).then(res => {
            console.log(res.data)
            props.handleDistReq(
                {
                    "constraintSummaryInfo": res.data
                }
            )
            props.handleFinishedLoadingConstraintSummary()
        })
        props.increaseTab(event)
    }

    function handleTabDecrease(event) {
        props.decreaseTab(event)
    }

    function handleCompactnessChange(event, newValue) {
        setCompactness(newValue)
        setDisplayedCompactness(newValue)
    }

    function handlePopEqualityChange(event, newValue) {
        setPopEquality(newValue)
        setDisplayedPopEquality(newValue)
    }

    function handleMajMinThresholdChange(event, newValue) {
        setMajMinThreshold(newValue)
        setDisplayedMajMinThreshold(newValue)
    }


    function handleMinorityChange(event) {
        setChosenMinority(event.target.value)
        if (event.target.value === "0") {
            setMaximumMajMinDistricts(Math.floor((props.districtingReq.stateInfo.blackPop / props.districtingReq.stateInfo.totalPop) * props.districtingReq.stateInfo.districtsTotal))
        }
        else if (event.target.value === "1") {
            setMaximumMajMinDistricts(Math.floor((props.districtingReq.stateInfo.hispanicPop / props.districtingReq.stateInfo.totalPop) * props.districtingReq.stateInfo.districtsTotal))
        }
        else if (event.target.value === "2") {
            setMaximumMajMinDistricts(Math.floor((props.districtingReq.stateInfo.asianPop / props.districtingReq.stateInfo.totalPop) * props.districtingReq.stateInfo.districtsTotal))
        }
        else if (event.target.value === "3") {
            setMaximumMajMinDistricts(1) // implement once we have arizona data and the prop name for it
        }
    }

    function handleMajMinDistrictsChange(event) {
        setMajMinDistrictsInput(event.target.value)
        setMajMinDistricts(event.target.value)
        let maxDistNum = props.districtingReq.stateInfo.districtsTotal


        if (event.target.value > maxDistNum || event.target.value < 0) {
            setMajMinDistrictsInputError(true)
            setMajMinDistrictsHelperText("Number must be between 0 and " + maxDistNum)
        }
        else {
            setMajMinDistrictsInputError(false)
            setMajMinDistrictsHelperText("")
        }
    }

    const handleIncumbentCheckbox = (event) => {
        setIncumbentChecked(event.target.checked)
        setIncumbentButtonDisabled(!event.target.checked)
        if (!event.target.checked) {
            setIncumbentProtection([])
        }
    }

    const handleIncumbentButtonClick = () => {
        setOpenIncumbentDialog(true)
    }

    const handleClose = (updatedIncumbentProtection) => {
        setIncumbentProtection(updatedIncumbentProtection)
        setOpenIncumbentDialog(false)
    }

    const handlePopTypeChange = (event) => {
        setPopEqualityType(event.target.value)
    }

    const handleCompactnessTypeChange = (event) => {
        setCompactnessType(event.target.value)
    }

    const compactnessMarks = [
        {
            value: 0.0,
            label: '0.0',
        },
        {
            value: 0.25,
        },
        {
            value: 0.50,
        },
        {
            value: 0.75,
        },
        {
            value: 1.0,
            label: '1.0',
        },
    ]

    const popEqualityMarks = [
        {
            value: 0,
            label: '0.0%',
        },
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: 3
        },
        {
            value: 4
        },
        {
            value: 5,
            label: '5.0%',
        },
    ]
    function resetCurrentProgress() {
        props.resetProgress()
    }

    console.log(props.districtingReq)

    return (<div>
        <Container>
            <Grid container direction="row">
                <Grid item>
                    <Button onClick={resetCurrentProgress} variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }}>
                        Reset Progress
                        </Button>
                </Grid>
            </Grid>
            <Grid container direction="column" alignItems="flex-start">
                <Typography>
                    Compactness Type:
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="compactnessType" name="compactnessType" value={compactnessType} onChange={handleCompactnessTypeChange}>
                        <FormControlLabel value="POLPOP" control={<Radio color="primary" />} label="Polsby-Popper" />
                        <FormControlLabel value="GEO" disabled control={<Radio color="primary" />} label="Graph" />
                        <FormControlLabel value="POPFAT" disabled control={<Radio color="primary" />} label="Population Fatness" />
                    </RadioGroup>
                </FormControl>
                <Typography>
                    Compactness: {displayedCompactness}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.compactness}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={compactnessMarks}
                    valueLabelDisplay="auto"
                    onChange={handleCompactnessChange}
                />
                <Typography>
                    Population Type:
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="popType" name="popType" value={popEqualityType} onChange={handlePopTypeChange}>
                        <FormControlLabel value="TPOP" control={<Radio color="primary" />} label="Total Population" />
                        <FormControlLabel value="TVAP" control={<Radio color="primary" />} label="Total Voting Age Population" />
                        <FormControlLabel value="CVAP" disabled control={<Radio color="primary" />} label="Citizen Voting Age Population" />
                    </RadioGroup>
                </FormControl>
                <Typography>
                    Population Equality: {displayedPopEquality}%
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.popEquality}
                    min={0}
                    max={5}
                    step={0.1}
                    marks={popEqualityMarks}
                    valueLabelDisplay="auto"
                    onChange={handlePopEqualityChange}
                />
                <Typography>
                    Chosen Minority for Majority-Minority Districts
                </Typography>
                <FormControl >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chosenMinority}
                        onChange={handleMinorityChange}
                    >
                        {props.districtingReq.stateMinorities.map((minorityName) => (
                            <MenuItem value={getMinorityValue(minorityName)}> {minorityName} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography>
                    Minimum Number of Majority-Minority Districts
                </Typography>
                <TextField
                    label={"# from 0 to " + maximumMajMinDistricts}
                    defaultValue={majMinDistricts}
                    value={majMinDistrictsInput}
                    onChange={handleMajMinDistrictsChange}
                    error={majMinDistrictsInputError}
                    helperText={majMinDistrictsHelperText}
                />
                <Typography>
                    Majority Minority District Threshold: {displayedMajMinThreshold}
                </Typography>
                <Slider
                    defaultValue={majMinThreshold}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={compactnessMarks}
                    valueLabelDisplay="auto"
                    onChange={handleMajMinThresholdChange}
                />
                <Typography>
                    Incumbent Protection
                    <Checkbox
                        checked={incumbentChecked}
                        onChange={handleIncumbentCheckbox}
                        color="primary"
                    />
                </Typography>
                <Button variant="contained" disabled={incumbentButtonDisabled} onClick={handleIncumbentButtonClick}>
                    Select Incumbents
                </Button>
                <IncumbentProtectionDialog open={openIncumbentDialog} onClose={handleClose} incumbentsProtected={incumbentProtection} stateReps={props.districtingReq.stateReps} />
                <br />
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={handleTabDecrease}>Back</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={handleTabIncrease}>Submit</Button>
                </Grid>
            </Grid>
        </Container>
    </div>)
}