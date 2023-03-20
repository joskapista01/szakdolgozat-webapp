import React from 'react';

export default function ServerItem(props){
    const {id, serverName, playerCount, serverStatus, serverState, serverUrl} = props.serverInfo
    const {deleteServer, updateServer} = props.handlers
    const serverItemStyle = {
        style: {    
            minHeight: '50px',
            borderRadius: '10px',
            alignItems: 'center',
            backgroundColor: 'rgb(102, 140, 255)',
            color: 'beige'
        },
        classes:"d-flex flex-row flex-wrap"
    }
    const serverFieldStyle = {
        style: {},
        classes: "p-2 flex-fill"
    }

    const serverUpdateButtonStyle = {
        style: {
            borderRadius: '5px',
            marginLeft: '8px'
        },
        classes: 'btn ' + (serverStatus==="ON" ? 'btn-warning' : 'btn-success')
    }
    const serverStopButtonStyle = {
        style: {
            borderRadius: '5px',
            marginLeft: '8px'
        },
        classes: 'btn btn-danger'
    }

    return(
        <div style={serverItemStyle.style} className={serverItemStyle.classes}>
            <div className={serverFieldStyle.classes}>
                {serverName}
            </div>
            <div className={serverFieldStyle.classes}>
                {serverStatus}
            </div>
            <div className={serverFieldStyle.classes}>
                {serverState}
            </div>
            <div className={serverFieldStyle.classes}>
                {playerCount}
            </div>
            <div className={serverFieldStyle.classes}>
                {serverUrl}
            </div>
            <div className={serverFieldStyle.classes}>
                <button type="button" style={serverUpdateButtonStyle.style} className={serverUpdateButtonStyle.classes} onClick={() => updateServer(id)}>{serverStatus==='ON'?'Stop':'Start'}</button>
                <button type="button" style={serverStopButtonStyle.style} className={serverStopButtonStyle.classes} onClick={() => deleteServer(id)}>Delete</button>
            </div>
        </div>
    )
}