import React from 'react'
import Apropos from './A propos'
import ReseauxSociaux from './ReseauxSociaux'
import { Grid } from '@mui/material'

function Footer() {
    return (
        <div>
            <Grid container spacing={50}>
                <Grid item md={6}>
                    <Apropos />
                </Grid>
                <Grid item md={6}>
                    <ReseauxSociaux />
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer