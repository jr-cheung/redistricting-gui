import { Grid, Button, Typography, Accordion, AccordionSummary, AccordionDetails, makeStyles, FormControl, MenuItem, Select, Container, CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
//import fakeDistrictingData from '../fakeDistrictings.json'
import DistrictingDataModal from './DistrictingDataModal.js'
import DistrictingBoxPlotModal from './DistrictingBoxPlotModal.js'
import DistrictingCompareModal from './DistrictingCompareModal.js'
import axios from 'axios'



//let fakeDistrictings = JSON.parse(JSON.stringify(fakeDistrictingData))


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function DistrictingScreen(props) {
    const classes = useStyles()
    const [sortCriteria, setSortCriteria] = React.useState("ofScore")
    const [data, setData] = React.useState([])
    const [activeDistricting, setActiveDistricting] = React.useState(1)
    const [openDistrictingDisplay, setOpenDistrictingDisplay] = React.useState(false)
    const [openBoxPlot, setOpenBoxPlot] = React.useState(false)
    const [currentDist, setCurrentDist] = React.useState({})
    const [bpJobPoints, setbpJobPoints] = React.useState([])
    const [bpDistrictingPoints, setbpDistrictingPoints] = React.useState([])
    const [bpEnactedPoints, setbpEnactedPoints] = React.useState([])

    useEffect(() => {
        const sortArray = type => {
            let ofDistrictings = []
            let closeToEnactedDistrictings = []
            let areaPairDistrictings =[]
            let closeToAverageDistrictings = []
            let districtingsToSort = props.districtingReq.ofResultInfo

            for (let i = 0; i < 10; i++) {
                ofDistrictings.push(districtingsToSort[i])
            }
            for (let i = 10; i < 20; i++) {
                closeToEnactedDistrictings.push(districtingsToSort[i])
            }
            for (let i = 20; i < 27; i++) {
                areaPairDistrictings.push(districtingsToSort[i])
            }
            for (let i = 27; i < 32; i++) {
                closeToAverageDistrictings.push(districtingsToSort[i])
            }
            
            let resultDistrictings = []
            if (type === "ofScore") {
                resultDistrictings = ofDistrictings
            } else if (type === "closestToEnacted") {
                resultDistrictings = closeToEnactedDistrictings
            } else if (type === "areaPairDeviations") {
                resultDistrictings = areaPairDistrictings
            } else if (type === "closestToAverage") {
                resultDistrictings = closeToAverageDistrictings
            }

            const sorted = [...resultDistrictings].sort((a, b) => b["ofScore"] - a["ofScore"])
            console.log(sorted)
            setData(sorted)
        }
        sortArray(sortCriteria)
    }, [sortCriteria, props.districtingReq.ofResultInfo])

    const getCurrentDist = id => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                setCurrentDist(data[i])
            }
        }
    }

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value)
    }

    function handleTabDecrease(event) {
        props.decreaseTab(event)
    }

    const handleDetailDisplay = (districtingID) => {
        getCurrentDist(districtingID)
        setActiveDistricting(districtingID)
        setOpenDistrictingDisplay(true)
    }
    const handleCloseDetail = () => {
        setOpenDistrictingDisplay(false)
    }

    const handleDisplayDistrictingOnMap = (districtingID) => {
        axios.get("/districtingdisplay", {
            params: {
                districtingID: districtingID
            }
        }).then(res2 => {
            console.log(res2.data)
            props.fillNewDistrictingGeo(res2.data)
            props.handleLoadNewDistrictingOnMap()
            console.log("Map screen should know")
        })
    }

    const handleBoxPlotDisplay = (districtingID) => {
        props.handleLoadingBPValues()
        axios.get("/bpPointsForJob").then(res => {
            console.log(res.data)
            setbpJobPoints(res.data.boxCreationValues)
            axios.get("/bpPointsForDistricting", {
                params: {
                    districtingID: districtingID
                }
            }).then(res2 => {
                console.log(res2.data)
                setbpDistrictingPoints(res2.data)
                axios.get("/bpPointsForEnacted", {
                }).then(res3 => {
                    console.log(res3)
                    let minorityPercents = []
                    let minorityType = ""
                    let totalType = ""
                    if (props.districtingReq.popEqualityType === "TPOP") {
                        totalType = "totalPop"
                        if (props.districtingReq.chosenMinority === "0") {
                            minorityType = "blackPop"
                        } else if (props.districtingReq.chosenMinority === "1") {
                            minorityType = "hispanicPop"
                        } else if (props.districtingReq.chosenMinority === "2") {
                            minorityType = "asianPop"
                        }
                    } else {
                        totalType = "totalVap"
                        if (props.districtingReq.chosenMinority === "0") {
                            minorityType = "blackVap"
                        } else if (props.districtingReq.chosenMinority === "1") {
                            minorityType = "hispanicVap"
                        } else if (props.districtingReq.chosenMinority === "2") {
                            minorityType = "asianVap"
                        }
                    }
                    for (let i = 0; i < res3.data.length; i++) {
                        minorityPercents.push(res3.data[i][minorityType] / res3.data[i][totalType])
                    }
                    minorityPercents.sort(function (a, b) {
                        return a - b;
                    })
                    setbpEnactedPoints(minorityPercents)
                    props.handleFinishedLoadingBPValues()
                    getCurrentDist(districtingID)
                    setActiveDistricting(districtingID)
                    setOpenBoxPlot(true)

                })
            })
        })
    }

    const handleCloseBoxPlot = () => {
        setOpenBoxPlot(false)
    }

    function resetCurrentProgress() {
        props.resetProgress()
    }

    return (<div>
        {props.loadingOFResults &&
            <Container>
                <Grid container direction="column" justify="space-between" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h4">Applying Objective Function</Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgress size={200} />
                    </Grid>
                </Grid>
            </Container>
        }
        {!props.loadingOFResults &&
            <Container>
                <DistrictingDataModal open={openDistrictingDisplay} onClose={handleCloseDetail} currentDist={currentDist} districtingReq={props.districtingReq} />
                <DistrictingBoxPlotModal open={openBoxPlot} onClose={handleCloseBoxPlot} bpJobPoints={bpJobPoints} bpDistrictingPoints={bpDistrictingPoints} bpEnactedPoints={bpEnactedPoints} loadingBPValues={props.loadingBPValues} />
                <Grid container direction="row">
                    <Grid item>
                        <Button onClick={resetCurrentProgress} variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }}>
                            Reset Progress
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography>
                            Select a sort:
                    </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortCriteria}
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"ofScore"}>Objective Function Score</MenuItem>
                                <MenuItem value={"closestToEnacted"}>Closest to Enacted</MenuItem>
                                <MenuItem value={"areaPairDeviations"}>Area Pair Deviations</MenuItem>
                                <MenuItem value={"closestToAverage"}>Closest to Average</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="column" spacing={2}>
                    {data.map(districtingInArray => (
                        <Grid item>
                            <Accordion style={{ backgroundColor: "lightgray" }}>
                                <AccordionSummary>
                                    <Typography>
                                        Districting: {districtingInArray.id}, Objective Function Score: {districtingInArray.ofScore}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column" justify="space-between" spacing={2}>
                                        <Grid item>
                                            <Grid container direction="row" justify="space-between" spacing={2}>
                                                <Grid item>
                                                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={() => handleDisplayDistrictingOnMap(districtingInArray.id)}>Display on Map</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={() => handleBoxPlotDisplay(districtingInArray.id)}>Display Box plot</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" justify="space-between" spacing={2}>
                                                <Grid item>
                                                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={() => handleDetailDisplay(districtingInArray.id)} >Display Details</Button>
                                                </Grid>
                                                {/*}
                                                <Grid item>
                                                    <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={() => handleCompareDisplay(districtingInArray.id)}>Compare Enacted</Button>
                                                </Grid>
                                                */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justify="space-between" spacing={2}>
                    <Grid item>
                        <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={handleTabDecrease}>Back</Button>
                    </Grid>
                </Grid>
            </Container>
        }
    </div>)
}