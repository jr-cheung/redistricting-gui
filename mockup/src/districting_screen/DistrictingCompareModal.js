import { Grid, Button, Dialog, Toolbar, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import fakeDistrictingData from '../fakeDistrictings.json'

let fakeDistrictings = JSON.parse(JSON.stringify(fakeDistrictingData))


export default function DistrictingCompareModal(props) {
    const { onClose, open, districtingNumber } = props

    const handleButtonClick = (event) => {
        onClose()
    } 
    const generateRandomNumber = () => {
        return Math.ceil(Math.random() * 50000) * (Math.round(Math.random()) ? 1 : -1)
    }

    const generateRandomDecimal = () => {
        return ((Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1)).toFixed(2)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (<div>
        <Dialog open={open} maxWidth="xl">
            <Grid container alignItems="center" direction="column" spacing={1}>
                <Grid item>
                    <Toolbar>
                        <Typography>
                            Districting {districtingNumber} Change from Enacted Districting
                        </Typography>
                    </Toolbar>
                </Grid>
                <Grid item>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>District Number</TableCell>
                                <TableCell>Total Population</TableCell>
                                <TableCell>Minority Population</TableCell>
                                <TableCell>Population Density</TableCell>
                                <TableCell>Population Equality</TableCell>
                                <TableCell>Political Fairness</TableCell>
                                <TableCell>Deviation from Enacted</TableCell>
                                <TableCell>Deviation from Average</TableCell>
                                <TableCell>Area (mi)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fakeDistrictings.districtings[districtingNumber - 1].districts.map((district, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell >District {index + 1} </TableCell>
                                    <TableCell >{numberWithCommas(generateRandomNumber())}</TableCell>
                                    <TableCell >{numberWithCommas(generateRandomNumber())}</TableCell>
                                    <TableCell >{generateRandomDecimal()}</TableCell>
                                    <TableCell >{generateRandomDecimal()}</TableCell>
                                    <TableCell >{generateRandomDecimal()}</TableCell>
                                    <TableCell >{generateRandomDecimal()}</TableCell>
                                    <TableCell >{generateRandomDecimal()}</TableCell>
                                    <TableCell >{numberWithCommas(generateRandomNumber())}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={handleButtonClick}>Close</Button>
                </Grid>
            </Grid>
        </Dialog>
    </div>
    )
}