import { AppBar, Container, Typography, Box, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import HomeScreen from './home_screen/HomeScreen.js'
import ConstraintScreen from './constraint_screen/ConstraintScreen.js'
import FilterScreen from './filter_screen/FilterScreen.js'
import ObjectiveFunctionScreen from './objective_function_screen/ObjectiveFunctionScreen.js'
import DistrictingScreen from './districting_screen/DistrictingScreen.js'


function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
    }
}

export default function Sidebar(props) {
    const [activeTab, setActiveTab] = React.useState(0)
    const [tabsDisabled, setTabsDisabled] = React.useState(true)

    const increaseTab = event => {
        setActiveTab(activeTab + 1)
    }

    const decreaseTab = () => {
        setActiveTab(activeTab - 1)
    }

    const resetTabs = () => {
        setActiveTab(0)
    }

    const changeTab = (event, newValue) => {
        setActiveTab(newValue)
    }

    const enableTabs = (event, newValue) => {
        setTabsDisabled(false)
    }

    const disableTabs = (event, newValue) => {
        setTabsDisabled(true)
    }

    const resetProgress = () => {
        props.handleDistReq({
            state: "",
            compactness: 0,
            compactnessType: "POLPOP",
            popEquality: 0,
            popEqualityType: "TPOP",
            majMinDistricts: 0,
            majMinThreshold: 0.0,
            incumbentProtection: [],
            devFromEnactedDistWeight: 0,
            devFromAvgDistWeight: 0,
            graphCompactnessWeight: 0,
            populationFatnessWeight: 0,
            polsbyPopperWeight: 0,
            popEqualityWeight: 0,
            splitCountiesWeight: 0,
            politicalFairnessWeight: 0,
            jobID: 0,
            originalDistrictingsTotal: -1,
            stateSummary: {},
            chosenMinority: "0",
            stateReps: [],
            stateInfo: {},
            constraintSummaryInfo: [],
            ofResultInfo: [],
        })
        disableTabs(true)
        resetTabs()
    }

    return (<div>
        <Container disableGutters>
            <AppBar position="static">
                <Tabs value={activeTab} onChange={changeTab} variant="scrollable" scrollButtons="auto">
                    <Tab label="State Job selection" {...a11yProps(0)} />
                    <Tab label="Constraints" disabled={tabsDisabled} {...a11yProps(1)} />
                    <Tab label="Filtering Summary" disabled={tabsDisabled} {...a11yProps(2)} />
                    <Tab label="Objective Function" disabled={tabsDisabled} {...a11yProps(3)} />
                    <Tab label="Districting Info" disabled={tabsDisabled} {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <TabPanel value={activeTab} index={0}>
                <HomeScreen increaseTab={increaseTab} enableTabs={enableTabs} resetTabs={resetTabs} disableTabs={disableTabs} resetProgress={resetProgress} districtingReq={props.districtingReq} handleDistReq={props.handleDistReq} handleStateChanged={props.handleStateChanged} fillPrecinctGeo={props.fillPrecinctGeo} fillCountyGeo={props.fillCountyGeo} fillEnactedDistrictingGeo={props.fillEnactedDistrictingGeo} loadingGeo={props.loadingGeo} handleFinishedLoadingGeo={props.handleFinishedLoadingGeo} handleLoadingGeo={props.handleLoadingGeo} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <ConstraintScreen decreaseTab={decreaseTab} increaseTab={increaseTab} resetTabs={resetTabs} disableTabs={disableTabs} resetProgress={resetProgress} districtingReq={props.districtingReq} handleDistReq={props.handleDistReq} loadingConstraintSummary={props.loadingConstraintSummary} handleFinishedLoadingConstraintSummary={props.handleFinishedLoadingConstraintSummary} handleLoadingConstraintSummary={props.handleLoadingConstraintSummary} />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <FilterScreen decreaseTab={decreaseTab} increaseTab={increaseTab} resetTabs={resetTabs} disableTabs={disableTabs} resetProgress={resetProgress} districtingReq={props.districtingReq} handleDistReq={props.handleDistReq} loadingConstraintSummary={props.loadingConstraintSummary} />
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
                <ObjectiveFunctionScreen decreaseTab={decreaseTab} increaseTab={increaseTab} resetTabs={resetTabs} disableTabs={disableTabs} resetProgress={resetProgress} districtingReq={props.districtingReq} handleDistReq={props.handleDistReq} loadingOFResults={props.loadingOFResults} handleFinishedLoadingOFResults={props.handleFinishedLoadingOFResults} handleLoadingOFResults={props.handleLoadingOFResults} />
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
                <DistrictingScreen decreaseTab={decreaseTab} resetTabs={resetTabs} disableTabs={disableTabs} districtingReq={props.districtingReq} resetProgress={resetProgress} handleDistReq={props.handleDistReq} handleShowDemoMaryland={props.handleShowDemoMaryland} loadingOFResults={props.loadingOFResults}  loadingBPValues={props.loadingBPValues} handleFinishedLoadingBPValues={props.handleFinishedLoadingBPValues} handleLoadingBPValues={props.handleLoadingBPValues} newDistrictingForMap={props.newDistrictingForMap} newDistrictingGeometry={props.newDistrictingGeometry} handleFinishedLoadingNewDistrictingOnMap={props.handleFinishedLoadingNewDistrictingOnMap} emptyNewDistrictringGeo={props.emptyNewDistrictringGeo} handleLoadNewDistrictingOnMap={props.handleLoadNewDistrictingOnMap} fillNewDistrictingGeo={props.fillNewDistrictingGeo} />
            </TabPanel>
        </Container>
    </div>)
}