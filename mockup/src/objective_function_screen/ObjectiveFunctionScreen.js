import { Grid, Button, Typography, Slider, Container } from '@material-ui/core'
import React from 'react'
import axios from 'axios'


export default function ObjectiveFunctionScreen(props) {
    const [devFromEnactedDistAreaWeight, setDevFromEnactedDistAreaWeight] = React.useState(props.districtingReq.devFromEnactedDistAreaWeight)
    const [devFromEnactedDistPopWeight, setDevFromEnactedDistPopWeight] = React.useState(props.districtingReq.devFromEnactedDistAreaWeight)
    const [devFromAvgDistWeight, setDevFromAvgDistWeight] = React.useState(props.districtingReq.devFromAvgDistWeight)
    const [graphCompactnessWeight, setGraphCompactnessWeight] = React.useState(props.districtingReq.graphCompactnessWeight)
    const [populationFatnessWeight, setPopulationFatnessWeight] = React.useState(props.districtingReq.populationFatnessWeight)
    const [polsbyPopperWeight, setPolsbyPopperWeight] = React.useState(props.districtingReq.polsbyPopperWeight)
    const [popEqualityWeight, setPopEqualityWeight] = React.useState(props.districtingReq.popEqualityWeight)
    const [splitCountiesWeight, setSplitCountiesWeight] = React.useState(props.districtingReq.splitCountiesWeight)
    const [politicalFairnessWeight, setPoliticalFairnessWeight] = React.useState(props.districtingReq.politicalFairnessWeight)
    const [displayedDevPopFromEnacted, setDisplayedDevPopFromEnacted] = React.useState(devFromEnactedDistPopWeight)
    const [displayedDevAreaFromEnacted, setDisplayedDevAreaFromEnacted] = React.useState(devFromEnactedDistAreaWeight)
    const [displayedDevFromAvg, setDisplayedDevFromAvg] = React.useState(devFromAvgDistWeight)
    const [displayedGraphCompactness, setDisplayedGraphCompactness] = React.useState(graphCompactnessWeight)
    const [displayedPopulationFatness, setDisplayedPopulationFatness] = React.useState(populationFatnessWeight)
    const [displayedPolsbyPopper, setDisplayedPolsbyPopper] = React.useState(polsbyPopperWeight)
    const [displayedPopEquality, setDisplayedPopEquality] = React.useState(popEqualityWeight)
    const [displayedSplitCounties, setDisplayedSplitCounties] = React.useState(splitCountiesWeight)
    const [displayedPoliticalFairness, setDisplayedPoliticalFairness] = React.useState(politicalFairnessWeight)

    function handleTabIncrease(event) {

        props.handleDistReq(
            {
                "devFromEnactedDistAreaWeight": devFromEnactedDistAreaWeight,
                "devFromEnactedDistPopWeight": devFromEnactedDistPopWeight,
                "devFromAvgDistWeight": devFromAvgDistWeight,
                "graphCompactnessWeight": graphCompactnessWeight,
                "populationFatnessWeight": populationFatnessWeight,
                "polsbyPopperWeight": polsbyPopperWeight,
                "popEqualityWeight": popEqualityWeight,
                "splitCountiesWeight": splitCountiesWeight,
                "politicalFairnessWeight": politicalFairnessWeight
            }
        )
        props.handleLoadingOFResults()
        axios.get("/ofsummary", {
            params: {
                polsPopComp: polsbyPopperWeight,
                popEqual: popEqualityWeight,
                splitCounty: splitCountiesWeight,
                devEnactedpop: devFromEnactedDistPopWeight,
                devEnactedArea: devFromEnactedDistAreaWeight,
                devAverage: devFromAvgDistWeight,
                polFair: politicalFairnessWeight,

            },
        }).then(res => {
            console.log(res.data)
            props.handleDistReq(
                {
                    "ofResultInfo": res.data
                }
            )
            props.handleFinishedLoadingOFResults()
        })
        props.increaseTab(event)
        //TODO ADD AXIOS REQUEST SENDING OF WEIGHTS TO SERVER AND GETTING REQUESTED DISTRICTINGS TO DISPLAY ON NEXT PAGE
    }

    function handleTabDecrease(event) {
        props.decreaseTab(event)
    }

    function handleDevFromEnactedDistAreaWeightChange(event, newValue) {
        setDevFromEnactedDistAreaWeight(newValue)
        setDisplayedDevAreaFromEnacted(newValue)
    }
    
    function handleDevFromEnactedDistPopWeightChange(event, newValue) {
        setDevFromEnactedDistPopWeight(newValue)
        setDisplayedDevPopFromEnacted(newValue)
    }


    function handleDevFromAvgDistWeightChange(event, newValue) {
        setDevFromAvgDistWeight(newValue)
        setDisplayedDevFromAvg(newValue)
    }
    function handleGraphCompactnessWeightChange(event, newValue) {
        setGraphCompactnessWeight(newValue)
        setDisplayedGraphCompactness(newValue)
    }
    function handlePopulationFatnessWeightChange(event, newValue) {
        setPopulationFatnessWeight(newValue)
        setDisplayedPopulationFatness(newValue)
    }
    function handlePolsbyPopperWeightChange(event, newValue) {
        setPolsbyPopperWeight(newValue)
        setDisplayedPolsbyPopper(newValue)
    }
    function handleSetPopEqualityWeightChange(event, newValue) {
        setPopEqualityWeight(newValue)
        setDisplayedPopEquality(newValue)
    }
    function handleSplitCountiesWeightWeightChange(event, newValue) {
        setSplitCountiesWeight(newValue)
        setDisplayedSplitCounties(newValue)
    }
    function handlePoliticalFairnessWeightChange(event, newValue) {
        setPoliticalFairnessWeight(newValue)
        setDisplayedPoliticalFairness(newValue)
    }
    function resetCurrentProgress() {
        props.resetProgress()
    }

    const marks = [
        {
            value: 0.0,
            label: '0.0',
        },
        {
            value: 0.25,
        },
        {
            value: 0.5,
        },
        {
            value: 0.75,
        },
        {
            value: 1.0,
            label: '1.0',
        },
    ]

    return (<div>
        <Container>
            <Grid container direction="row">
                <Grid item>
                    <Button onClick={resetCurrentProgress} variant="outlined" style={{ backgroundColor: "#3942A9", color: "white" }}>
                        Reset Progress
                    </Button>
                </Grid>
            </Grid>
            <Grid container
                direction="column"
                alignItems="flex-start"
            >
                <Typography>
                    Deviation from Enacted Districting Area: {displayedDevAreaFromEnacted}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.devFromEnactedDistAreaWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleDevFromEnactedDistAreaWeightChange}
                />

                <Typography>
                    Deviation from Enacted Districting Population: {displayedDevPopFromEnacted}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.devFromEnactedDistPopWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleDevFromEnactedDistPopWeightChange}
                />

                <Typography>
                    Deviation from Average Districting: {displayedDevFromAvg}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.devFromAvgDistWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleDevFromAvgDistWeightChange}
                />
                <Typography>
                    Graph Compactness: {displayedGraphCompactness}
                </Typography>
                <Slider
                    disabled
                    defaultValue={props.districtingReq.graphCompactnessWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleGraphCompactnessWeightChange}
                />
                <Typography>
                    Population Fatness: {displayedPopulationFatness}
                </Typography>
                <Slider
                    disabled
                    defaultValue={props.districtingReq.populationFatnessWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handlePopulationFatnessWeightChange}
                />
                <Typography>
                    Polsby-Popper: {displayedPolsbyPopper}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.polsbyPopperWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handlePolsbyPopperWeightChange}
                />
                <Typography>
                    Population Equality: {displayedPopEquality}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.popEqualityWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleSetPopEqualityWeightChange}
                />
                <Typography>
                    Split Counties: {displayedSplitCounties}
                </Typography>
                <Slider
                    disabled
                    defaultValue={props.districtingReq.splitCountiesWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handleSplitCountiesWeightWeightChange}
                />
                <Typography>
                    Political Fairness: {displayedPoliticalFairness}
                </Typography>
                <Slider
                    defaultValue={props.districtingReq.politicalFairnessWeight}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={marks}
                    valueLabelDisplay="auto"
                    onChange={handlePoliticalFairnessWeightChange}
                />
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