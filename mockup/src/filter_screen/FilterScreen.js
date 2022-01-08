import { Grid, Button, Typography, Container, CircularProgress } from '@material-ui/core'
import React from 'react'


export default function FilterScreen(props) {

    function handleTabIncrease(event) {
        props.increaseTab(event)
    }

    function handleTabDecrease(event) {
        props.decreaseTab(event)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function resetCurrentProgress() {
        props.resetProgress()
    }

    function numberToPercent(x) {
        let realNum = parseFloat(x) * 100
        return (realNum.toFixed(3)).toString()
    }

    return (<div>
        {props.loadingConstraintSummary &&
            <Container>
                <Grid container direction="column" justify="space-between" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h4">Loading Constraint Results</Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgress size={200} />
                    </Grid>

                </Grid>
            </Container>
        }
        {!props.loadingConstraintSummary &&
            <Container>
                <Grid container direction="row">
                    <Grid item>
                        <Button onClick={resetCurrentProgress} variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }}>
                            Reset Progress
                    </Button>
                    </Grid>
                </Grid>
                <Grid container direction="column" spacing={4}>
                    <Grid item>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="h5">Summary of Random Districtings</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justify="flex-start" spacing={2}>
                            <Grid item>
                                <Typography>
                                    State selected: {props.districtingReq.state}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Original number of Districtings: {numberWithCommas(props.districtingReq.originalDistrictingsTotal)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Number of Districtings Remaining: {numberWithCommas(props.districtingReq.constraintSummaryInfo[5])}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Number of Districtings Filtered by Compactness: {numberWithCommas(parseInt(props.districtingReq.constraintSummaryInfo[0]) + parseInt(props.districtingReq.originalDistrictingsTotal) - parseInt(props.districtingReq.constraintSummaryInfo[4]) )}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Number of Districtings Filtered by Population Equality: {numberWithCommas(props.districtingReq.constraintSummaryInfo[1])}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Number of Districtings Filtered by Majority Minority Districts: {numberWithCommas(props.districtingReq.constraintSummaryInfo[2])}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Number of Districtings Filtered by Incumbent Protection: {numberWithCommas(props.districtingReq.constraintSummaryInfo[3])}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Median number of majority-minority districts: {props.districtingReq.constraintSummaryInfo[6]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Median population per district: {numberWithCommas(props.districtingReq.constraintSummaryInfo[7])}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Median compactness: {numberToPercent(props.districtingReq.constraintSummaryInfo[8]) + " %"}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Median population equality: {numberToPercent(props.districtingReq.constraintSummaryInfo[9]) + " %"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" spacing={5}>
                    <Grid item>
                        <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={handleTabDecrease}>Back</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }} onClick={handleTabIncrease}>Next</Button>
                    </Grid>
                </Grid>
            </Container>
        }
    </div>)
}