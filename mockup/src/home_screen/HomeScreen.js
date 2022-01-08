import { Grid, Typography, Button, Table, TableCell, TableRow, Card, CardContent, CardActions, Select, MenuItem, FormControl, Container, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function HomeScreen(props) {
    const classes = useStyles()

    const [state, setState] = React.useState(props.districtingReq.state)
    const [jobID, setJobID] = React.useState(props.districtingReq.jobID)
    const [originalDistrictingsTotal, setOriginalDistrictingsTotal] = React.useState(props.districtingReq.originalDistrictingsTotal)
    const [statePop, setStatePop] = React.useState(0)
    const [stateArea, setStateArea] = React.useState(0)
    const [minorityPop, setMinorityPop] = React.useState(0)
    const [minorityPercent, setMinorityPercent] = React.useState(0)
    const [stateDistricts, setStateDistricts] = React.useState(0)
    const [stateVotingHistory, setStateVotingHistory] = React.useState({})
    const [largestMinorityGroups, setLargestMinorityGroups] = React.useState([])
    const [jobSummaries, setJobSummaries] = React.useState([])
    const [stateReps, setStateReps] = React.useState(props.districtingReq.stateReps)
    const [jobsReceived, setJobsReceived] = React.useState(false)
    const [stateInfo, setStateInfo] = React.useState(props.districtingReq.stateInfo)

    const setCardJob = (event) => {
        let buttonSelectedHTML = event.target.innerHTML.split(" ")
        let jobSelectedID = parseInt(buttonSelectedHTML[buttonSelectedHTML.length - 1])
        setJobID(jobSelectedID)
        for (let i = 0; i < jobSummaries.length; i++) {
            console.log(jobSummaries[i].id)
            if (jobSummaries[i].id === jobSelectedID) {
                setOriginalDistrictingsTotal(jobSummaries[i].numDistrictings)
                break
            }
        }
    }

    function handleTabChange(event) {
        props.handleLoadingGeo(true)

        axios.get("/setstate", {
            params: {
                stateName: state
            }
        }).then(res => {
            console.log(res)
            axios.get("/setjob", {
                params: {
                    jobId: jobID
                }
            }).then(res => {
                console.log(res)
            })
        })

        axios.get("/statePrecinctsGeo", {
            params: {
                stateName: state
            }
        }).then(precinctRes => {
            props.fillPrecinctGeo(precinctRes.data)
            axios.get("/stateCountiesGeo", {
                params: {
                    stateName: state
                }
            }).then(countyRes => {
                props.fillCountyGeo(countyRes.data)
                axios.get("/enactedDistrictingGeo", {
                    params: {
                        stateName: state
                    }
                }).then(enactedRes => {
                    props.fillEnactedDistrictingGeo(enactedRes.data)
                    props.handleStateChanged(true)
                    props.handleFinishedLoadingGeo(true)
                })
            })
        })

        props.handleDistReq({
            "state": state,
            "jobID": jobID,
            "originalDistrictingsTotal": originalDistrictingsTotal,
            "stateMinorities": largestMinorityGroups,
            "stateReps": stateReps,
            "stateInfo": stateInfo
        })

        props.enableTabs(true)
        props.increaseTab(event)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    async function getStateData(event) {
        setJobsReceived(false)
        axios.get("/statedetails", {
            params: {
                stateName: event.target.value
            }
        }).then(res => {
            let reqData = res.data
            setStatePop(reqData.totalPop)
            setStateArea(reqData.totalArea)
            setMinorityPop(reqData.minorityPopTotal)
            setMinorityPercent(reqData.percentMinority)
            setStateDistricts(reqData.districtsTotal)
            setLargestMinorityGroups(reqData.topMinorities)
            setStateVotingHistory(reqData.historicalVoting)
            setStateInfo(reqData)
            setState(event.target.value)
        })
        axios.get("/getIncumbentsByState", {
            params: {
                stateName: event.target.value
            }
        }).then(res => {
            setStateReps(res.data)
        })
        axios.get("/getJobsByState", {
            params: {
                stateName: event.target.value
            }
        }).then(res => {
            let reqData = res.data
            setJobSummaries(reqData)
            setJobsReceived(true)
        })
    }

    useEffect(() => {
        if (state !== "") {
            reloadStateData(state)
        }
    }, [])

    function reloadStateData(nameOfState) {
        axios.get("/statedetails", {
            params: {
                stateName: nameOfState
            }
        }).then(res => {
            let reqData = res.data
            setStatePop(reqData.totalPop)
            setStateArea(reqData.totalArea)
            setMinorityPop(reqData.minorityPopTotal)
            setMinorityPercent(reqData.percentMinority)
            setStateDistricts(reqData.districtsTotal)
            setLargestMinorityGroups(reqData.topMinorities)
            setStateVotingHistory(reqData.historicalVoting)
        })
        axios.get("/getJobsByState", {
            params: {
                stateName: nameOfState
            }
        }).then(res => {
            let reqData = res.data
            setJobSummaries(reqData)
            setJobsReceived(true)
        })
    }

    function resetCurrentProgress() {
        props.resetProgress()
    }

    return (<div>
        <Container>
            <Container>
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
                            Select a state:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                onChange={getStateData}
                            >
                                <MenuItem value={"Maryland"}>Maryland</MenuItem>
                                <MenuItem value={"Virginia"}>Virginia</MenuItem>
                                <MenuItem value={"Arizona"}>Arizona</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
            {state && <Container id="stateinfo">
                <Table size="small">
                    <TableRow>
                        <TableCell>{state} population</TableCell>
                        <TableCell>{numberWithCommas(statePop)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} area</TableCell>
                        <TableCell>{numberWithCommas(stateArea)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} minority population</TableCell>
                        <TableCell>{numberWithCommas(minorityPop)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} minority percent</TableCell>
                        <TableCell>{minorityPercent} %</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} district total</TableCell>
                        <TableCell>{stateDistricts}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} voting history</TableCell>
                        <TableCell>2012: {stateVotingHistory[2012]}, 2016: {stateVotingHistory[2016]}, 2020: {stateVotingHistory[2020]} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{state} largest minority groups</TableCell>
                        <TableCell>1.) {largestMinorityGroups[0]} 2.) {largestMinorityGroups[1]} {'\n'} 3.) {largestMinorityGroups[2]}</TableCell>
                    </TableRow>
                </Table>
                {jobsReceived &&
                    <Typography variant="h5" style={{ paddingTop: "2.5%", paddingBottom: "2.5%" }}>
                        Available Job(s)
                        </Typography>
                }
                {jobsReceived && jobSummaries.map((job, index) => (
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardContent style={{ paddingBottom: "0px" }}>
                                <Typography>Districtings: {job.numDistrictings}</Typography>
                                <Typography>Population diff: {job.mgggParams.population_difference || "NONE"}</Typography>
                                <Typography>Rounds: {job.mgggParams.rounds || "NONE"}</Typography>
                                <Typography>Cooling Period: {job.mgggParams.cooling_period || "NONE"}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={setCardJob} style={{ backgroundColor: "#3942A9", color: "white" }} >
                                    Use Job {job.id}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {jobID < 1 &&
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button variant="outlined" disabled style={{ backgroundColor: "#808080", color: "white" }}>Start</Button>
                        </Grid>
                    </Grid>
                }
                {jobID >= 1 &&
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button variant="outlined" onClick={handleTabChange} style={{ backgroundColor: "#3942A9", color: "white" }}>Start</Button>
                        </Grid>
                    </Grid>
                }

            </Container>
            }
        </Container>
    </div>)
}