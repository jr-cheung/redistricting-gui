import { Grid, Button, Checkbox, Dialog, DialogTitle, Container, FormControlLabel } from '@material-ui/core'
import React from 'react'

export default function IncumbentProtectionDialog(props) {
    const { onClose, open, incumbentsProtected } = props
    const [incumbents, setIncumbents] = React.useState(incumbentsProtected)

    const handleButtonClick = (event) => {
        console.log(incumbents)
        onClose(incumbents)
    }

    const handleCheckboxChange = (event) => {
        var incumbent = event.target.name
        let listedEncum = JSON.parse(JSON.stringify(incumbents))
        if (listedEncum.includes(incumbent)) {
            let preElements = listedEncum.slice(0, listedEncum.indexOf(incumbent))
            let postElements = listedEncum.slice(listedEncum.indexOf(incumbent) + 1)
            listedEncum = preElements.concat(postElements)
        } else {
            listedEncum.push(incumbent)
            event.target.checked = true
        }
        setIncumbents(listedEncum)
    }

    const incumbentProtected = (rep) => {
        var currentEncumbents = JSON.parse(JSON.stringify(incumbents))
        return currentEncumbents.includes(rep)
    }

    const returnParty = party => {
        return (party === 0 ? "R" : "D")
    }

    return (<div>
        <Container>
            <Dialog open={open}>
                <DialogTitle>Select Incumbents</DialogTitle>
                <Grid container direction="row" alignItems="center" justify="flex-start" style={{ padding: "16px 24px" }}>
                    {props.stateReps.map((rep) => (
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                label={rep.congressDistrict + " - " + rep.incumbentName + "(" + returnParty(rep.party) + ")"}
                                control={
                                    <Checkbox
                                        checked={incumbentProtected(rep.incumbentName)}
                                        onChange={handleCheckboxChange}
                                        name={rep.incumbentName}
                                        color="primary"
                                    />
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container alignItems="center" justify="space-around">
                    <Button variant="outlined" onClick={handleButtonClick}>Save</Button>
                </Grid>
                <br />
            </Dialog>
        </Container>
    </div>
    )
}