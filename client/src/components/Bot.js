import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    bot:{
        textAlign:'center',
        width:'100%',
    },
  }));


function Bot() {
    const classes = useStyles();
    return (
        <div>
            <h1>Soy un Bot</h1>
            <iframe className={classes.bot} height="800" width="800" src="https://bot.dialogflow.com/1b4010a7-48f0-4845-ba2d-00c397181441"></iframe>

        </div>
    )
}

export default Bot;
