import { Grid, Button, Dialog} from '@material-ui/core'
import React, { useEffect } from 'react'
import Plot from 'react-plotly.js'

export default function DistrictingBoxPlotModal(props) {
    const { onClose, open, bpJobPoints, bpDistrictingPoints, bpEnactedPoints } = props
    const [boxplotData, setBoxplotData] = React.useState([])

    const handleButtonClick = (event) => {
        onClose()
    }

    useEffect(() => {
        let bpData = []
        for (let i = 0; i < bpJobPoints.length; i++) {
            let q1Index = Math.floor(bpJobPoints[i].length / 4)
            let medianIndex = Math.floor(bpJobPoints[i].length / 2)
            let q3Index = Math.floor(bpJobPoints[i].length * (3 / 4))
            let numberArray = []
            numberArray.push(bpJobPoints[i][0])
            numberArray.push(bpJobPoints[i][0])
            numberArray.push(bpJobPoints[i][q1Index])
            numberArray.push(bpJobPoints[i][q1Index])
            numberArray.push(bpJobPoints[i][medianIndex])
            numberArray.push(bpJobPoints[i][medianIndex])
            numberArray.push(bpJobPoints[i][medianIndex])
            numberArray.push(bpJobPoints[i][medianIndex])
            numberArray.push(bpJobPoints[i][q3Index])
            numberArray.push(bpJobPoints[i][q3Index])
            numberArray.push(bpJobPoints[i][bpJobPoints[i].length - 1])
            numberArray.push(bpJobPoints[i][bpJobPoints[i].length - 1])
            numberArray.push(bpJobPoints[i][bpJobPoints[i].length - 1])

            bpData.push({
                x: i + 1,
                y: numberArray,
                type: 'box',
                boxpoints: false,
                showlegend: false,
                name: i + 1,
                marker: {
                    color: 'rgb(0,0,0)'
                },
            })
        }
        for (let i = 0; i < bpDistrictingPoints.length; i++) {
            bpData.push({
                x: [i + 1],
                y: [bpDistrictingPoints[i]],
                name: 'Current',
                marker: {
                    size: 8,
                    color: '#66ff00'
                },
                showlegend: i === 0,
            })
        }
        for (let i = 0; i < bpEnactedPoints.length; i++) {
            bpData.push({
                x: [i + 1.25],
                y: [bpEnactedPoints[i]],
                name: 'Enacted',
                marker: {
                    size: 8,
                    color: '#ff0000'
                },
                showlegend: i === 0,
            })
        }
        setBoxplotData(bpData)
    }, [bpEnactedPoints])



    return (<div>
        {!props.loadingBPValues &&
            <Dialog open={open} maxWidth='xl'>
                <Grid container alignItems="center" direction="column" spacing={1}>
                    <Grid item>
                        <Plot data={boxplotData} layout={{ title: 'Minority District Plot', yaxis: {title: 'Percent Minority', },  xaxis: {title: 'District Number', range: [0, bpDistrictingPoints.length + 1]} }} />
                    </Grid>
                </Grid>
                <Button variant="outlined" onClick={handleButtonClick}>Close</Button>
            </Dialog>
        }
    </div>
    )
}