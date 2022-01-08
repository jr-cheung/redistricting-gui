import React, { useEffect } from 'react'
import MapScreen from '../src/map_screen/MapScreen.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import Sidebar from './sidebar.js'

const App = () => {
  const [districtingReq, setDistrictingReq] = React.useState({
    state: "",
    compactness: 0,
    compactnessType: "POLPOP",
    popEquality: 0,
    popEqualityType: "TPOP",
    majMinDistricts: 0,
    majMinThreshold: 0.0,
    incumbentProtection: [],
    devFromEnactedDistAreaWeight: 0,
    devFromEnactedDistPopWeight: 0,
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
    ofResultInfo: []
  })
  const [precinctGeo, setPrecinctGeo] = React.useState({})
  const [countyGeo, setCountyGeo] = React.useState({})
  const [enactedDistrictingGeo, setEnactedDistrictingGeo] = React.useState({})
  const [showFakeMaryland, setShowFakeMaryland] = React.useState(false)
  const [stateChanged, setStateChanged] = React.useState(false)
  const [loadingGeo, setLoadingGeo] = React.useState(false)
  const [loadingConstraintSummary, setLoadingConstraintSummary] = React.useState(false)
  const [loadingOFResults, setLoadingOFResults] = React.useState(false)
  const [loadingBPValues, setLoadingBPValues] = React.useState(false)

  const [newDistrictingGeometry, setNewDistrictingGeometry] = React.useState({})
  const [newDistrictingForMap, setNewDistrictingForMap] = React.useState(false)

  const handleShowDemoMaryland = event => {
    setShowFakeMaryland(true)
  }

  const handleLoadNewDistrictingOnMap = event => {
    setNewDistrictingForMap(true)
  }

  const handleFinishedLoadingNewDistrictingOnMap = event => {
    setNewDistrictingForMap(false)
  }

  const fillNewDistrictingGeo = (geo) => {
    setNewDistrictingGeometry(geo)
  }

  const emptyNewDistrictringGeo = event => {
    setNewDistrictingGeometry({})
  }


  const handleStateChanged = event => {
    setStateChanged(true)
  }

  const handleFinishStateChange = event => {
    setStateChanged(false)
  }


  const handleFinishedLoadingGeo = event => {
    setLoadingGeo(false)
  }

  const handleLoadingGeo = event => {
    setLoadingGeo(true)
  }

  const handleFinishedLoadingConstraintSummary = event => {
    setLoadingConstraintSummary(false)
  }

  const handleLoadingConstraintSummary = event => {
    setLoadingConstraintSummary(true)
  }

  const handleFinishedLoadingOFResults = event => {
    setLoadingOFResults(false)
  }

  const handleLoadingOFResults = event => {
    setLoadingOFResults(true)
  }

  const handleFinishedLoadingBPValues = event => {
    setLoadingBPValues(false)
  }

  const handleLoadingBPValues = event => {
    setLoadingBPValues(true)
  }


  const fillPrecinctGeo = (geo) => {
    setPrecinctGeo(geo)
  }

  const fillCountyGeo = (geo) => {
    setCountyGeo(geo)
  }

  const fillEnactedDistrictingGeo = (geo) => {
    setEnactedDistrictingGeo(geo)
  }

  const handleUpdateDistrictingReq = event => {
    for (const [key, value] of Object.entries(event)) {
      setDistrictingReq((prevState) => ({
        ...prevState,
        [key]: value
      }))
    }
  }

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3942A9' }, //Padre blue
      secondary: { main: '#FEC234' }, //Padre gold
    },
  })

  // hook left in place
  useEffect(() => {
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <div className="side-container">
          <Sidebar districtingReq={districtingReq} handleDistReq={handleUpdateDistrictingReq} handleShowDemoMaryland={handleShowDemoMaryland} handleStateChanged={handleStateChanged} fillPrecinctGeo={fillPrecinctGeo} fillCountyGeo={fillCountyGeo} fillEnactedDistrictingGeo={fillEnactedDistrictingGeo} loadingGeo={loadingGeo} handleFinishedLoadingGeo={handleFinishedLoadingGeo} handleLoadingGeo={handleLoadingGeo} loadingConstraintSummary={loadingConstraintSummary} handleFinishedLoadingConstraintSummary={handleFinishedLoadingConstraintSummary} handleLoadingConstraintSummary={handleLoadingConstraintSummary} loadingOFResults={loadingOFResults} handleFinishedLoadingOFResults={handleFinishedLoadingOFResults} handleLoadingOFResults={handleLoadingOFResults} loadingBPValues={loadingBPValues} handleFinishedLoadingBPValues={handleFinishedLoadingBPValues} handleLoadingBPValues={handleLoadingBPValues} newDistrictingForMap={newDistrictingForMap} newDistrictingGeometry={newDistrictingGeometry} handleFinishedLoadingNewDistrictingOnMap={handleFinishedLoadingNewDistrictingOnMap} emptyNewDistrictringGeo={emptyNewDistrictringGeo} handleLoadNewDistrictingOnMap={handleLoadNewDistrictingOnMap} fillNewDistrictingGeo={fillNewDistrictingGeo} />
        </div>
        <MapScreen currentState={districtingReq.state} showFakeMaryland={showFakeMaryland} handleShowDemoMaryland={handleShowDemoMaryland} stateChanged={stateChanged} handleFinishStateChange={handleFinishStateChange} precinctGeo={precinctGeo} countyGeo={countyGeo} enactedDistrictingGeo={enactedDistrictingGeo} loadingGeo={loadingGeo} newDistrictingForMap={newDistrictingForMap} newDistrictingGeometry={newDistrictingGeometry} handleFinishedLoadingNewDistrictingOnMap={handleFinishedLoadingNewDistrictingOnMap} emptyNewDistrictringGeo={emptyNewDistrictringGeo} />
      </div>
    </MuiThemeProvider>
  )
}

export default App