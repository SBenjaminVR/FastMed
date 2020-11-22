import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    bot:{
        display: 'flex',
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
  }));

const UserId = localStorage.getItem('id');

function Bot() {
    const classes = useStyles();
    //console.log(UserId);
    return (
        <div>
            <h1>{`Su id es ${UserId}`}</h1>
            <div className={classes.bot}>
            <iframe  width="350" height="500" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/1b4010a7-48f0-4845-ba2d-00c397181441"></iframe>
            </div>
        </div>
    )
}

export default Bot;
