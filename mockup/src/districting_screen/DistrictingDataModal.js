import { Grid, Button, Dialog, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Typography, withStyles } from '@material-ui/core'
import React, { useEffect } from 'react'

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

export default function DistrictingDataModal(props) {
    const { onClose, open, currentDist, districtingReq } = props
    const [activeDist, setActiveDist] = React.useState({})

    const handleButtonClick = (event) => {
        onClose()
    }

    function getOverallPop(index) {
        if (districtingReq.popEqualityType === "TPOP") {
            return activeDist.districtDetails[index].demographicPopulation.totalPop
        } else {
            return activeDist.districtDetails[index].demographicPopulation.totalVap
        }
    }

    function getMinorityPop(index) {
        if (districtingReq.popEqualityType === "TPOP") {
            if (districtingReq.chosenMinority === "0") {
                return activeDist.districtDetails[index].demographicPopulation.blackPop
            } else if (districtingReq.chosenMinority === "1") {
                return activeDist.districtDetails[index].demographicPopulation.hispanicPop
            } else if (districtingReq.chosenMinority === "2") {
                return activeDist.districtDetails[index].demographicPopulation.asianPop
            }
        } else {
            if (districtingReq.chosenMinority === "0") {
                return activeDist.districtDetails[index].demographicPopulation.blackVap
            } else if (districtingReq.chosenMinority === "1") {
                return activeDist.districtDetails[index].demographicPopulation.hispanicVap
            } else if (districtingReq.chosenMinority === "2") {
                return activeDist.districtDetails[index].demographicPopulation.asianVap
            }
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    useEffect(() => {
        setActiveDist(currentDist)
        console.log(currentDist)
    }, [currentDist])

    return (<div>
        {activeDist !== {} &&
            <Dialog open={open} maxWidth="xl">
                <Grid container alignItems="flex-start" justify="flex-start" direction="column" spacing={1}>
                    <Grid item>
                        <Toolbar>
                            <Typography>
                                Districting Information Normalized
                            </Typography>
                        </Toolbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>OF Score</TableCell>
                                    <TableCell>Polsby-Popper</TableCell>
                                    <TableCell>Polsby-Popper Weight</TableCell>
                                    <TableCell>Population Equality</TableCell>
                                    <TableCell>Population Equality Weight</TableCell>
                                    <TableCell>Political Fairness</TableCell>
                                    <TableCell>Political Fairness Weight</TableCell>
                                    <TableCell>Deviation Enacted Area</TableCell>
                                    <TableCell>Deviation Enacted Area Weight</TableCell>
                                    <TableCell>Deviation Enacted Pop</TableCell>
                                    <TableCell>Deviation Enacted Pop Weight</TableCell>
                                    <TableCell>Deviation from Average Pop</TableCell>
                                    <TableCell>Deviation from Average Pop Weight</TableCell>
                                    <TableCell>Deviation from Maj Min</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {activeDist.ofScore !== undefined && 
                                    <>
                                    <TableCell>{activeDist.ofScore.toFixed(5)}</TableCell>
                                    <TableCell>{activeDist.compactnessScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.polsbyPopperWeight}</TableCell>
                                    <TableCell>{activeDist.popEqualityScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.popEqualityWeight}</TableCell>
                                    <TableCell>{activeDist.polFairnessScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.politicalFairnessWeight}</TableCell>
                                    <TableCell>{activeDist.deviationFromEnactedAreaScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.devFromEnactedDistAreaWeight}</TableCell>
                                    <TableCell>{activeDist.deviationFromEnactedPopScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.devFromEnactedDistPopWeight}</TableCell>
                                    <TableCell>{activeDist.deviationFromAvgScore.toFixed(5)}</TableCell>
                                    <TableCell>{districtingReq.devFromAvgDistWeight}</TableCell>
                                    <TableCell>{activeDist.deviationFromMajMin.toFixed(5)}</TableCell>
                                    </>
                                }

                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item>
                        <Toolbar>
                            <Typography>
                                Districting Information Non-Normalized
                            </Typography>
                        </Toolbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Polsby-Popper</TableCell>
                                    <TableCell>Population Equality</TableCell>
                                    <TableCell>Political Fairness</TableCell>
                                    <TableCell>Deviation Enacted Area</TableCell>
                                    <TableCell>Deviation Enacted Pop</TableCell>
                                    <TableCell>Deviation from Average Pop</TableCell>
                                    <TableCell>Majority Minority Districts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {activeDist.ofScore !== undefined && 
                                    <>
                                    <TableCell>{activeDist.compactness}</TableCell>
                                    <TableCell>{activeDist.popEquality}</TableCell>
                                    <TableCell>{activeDist.polFairness}</TableCell>
                                    <TableCell>{activeDist.deviationFromEnactedArea}</TableCell>
                                    <TableCell>{activeDist.deviationFromEnactedPop}</TableCell>
                                    <TableCell>{activeDist.deviationFromAvg}</TableCell>
                                    <TableCell>{activeDist.numMajMinDistricts}</TableCell>
                                    </>
                                }

                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    
                    <Grid item>
                        <Toolbar>
                            <Typography>District Info Non-Normalized</Typography>
                        </Toolbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>District Number</TableCell>
                                    <TableCell>Total Population</TableCell>
                                    <TableCell>Chosen Minority Population</TableCell>
                                    <TableCell>Compactness</TableCell>
                                    <TableCell>Population Dev from Ideal</TableCell>
                                    <TableCell>Deviation from Enacted Area</TableCell>
                                    <TableCell>Deviation from Enacted Pop</TableCell>
                                    <TableCell>Deviation from Average Pop</TableCell>
                                    <TableCell>Incumbent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeDist.districtDetails!== undefined && activeDist.districtDetails.map((district, index) => (
                                    <StyledTableRow key={index + 1}>
                                        {district.demographicPopulation.asianVap !== undefined && 
                                        <>
                                        <TableCell >District {index + 1} </TableCell>
                                        <TableCell >{numberWithCommas(getOverallPop(index))}</TableCell>
                                        <TableCell >{numberWithCommas(getMinorityPop(index))}</TableCell>
                                        <TableCell >{district.compactness.toFixed(5)}</TableCell>
                                        <TableCell >{district.deviationFromIdealPop}</TableCell>
                                        <TableCell >{district.deviationFromEnactedArea}</TableCell> 
                                        <TableCell >{district.deviationFromEnactedPop}</TableCell>
                                        <TableCell >{district.deviationFromAverage}</TableCell>
                                        <TableCell >{district.incumbent.incumbentName || "None"} </TableCell>
                                        </>
                                        }
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center">
                    <Grid item>
                        <Button variant="outlined" onClick={handleButtonClick}>Close</Button>
                    </Grid>
                </Grid>
            </Dialog>
        }
    </div>
    )
}