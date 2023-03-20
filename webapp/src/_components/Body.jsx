import React, { useState } from "react";
import ServerItem from "./ServerItem";
import "./body.css"

export default function Body(props) {
    const {servers, loading} = props.content
    const {createServer} = props.handlers
    const [state, setState] = useState({newServerName: ""})


    function handleChange(e) {
        const { name, value } = e.target;
        setState({[name]: value });
    }
     
    function renderBody(){
        const {newServerName} = state
        return (
        <div  className="bodyWrapper">
            <div className="appBody">
                <div className="form-group new-server-form">
                    <div className="row">
                        <div className="col">
                            <input type='text' className="form-control" name='newServerName' value={newServerName} onChange={handleChange} placeholder='New server name...'/>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={() => createServer(newServerName)}>Create server</button>
                        </div>
                    </div>
                </div>
                {loading && <em>Loading servers...</em>}
                {!loading &&
                    <div>
                        
                        {servers.map(server =>
                            <ServerItem key={server.id} handlers={props.handlers} serverInfo={server}/>
                        )}
                    </div>
                }
            </div>
            </div>
            
        )
    }

    return renderBody()

}