import React from 'react';

import { userService } from '../_services/user-service';
import ServerItem from '../_components/ServerItem';
import Header from '../_components/Header';
import Body from '../_components/Body';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            servers: [],
            loading: false
        };
    }

    async componentDidMount() {
        
         this.updateState();
    }

    updateState(){
        this.setState({ 
            servers: [],
            loading: true
        });
        userService.getServers()
            .then(response => {return response.serverIds})
            .then(serverIds => serverIds.map(id => userService.getServerInfo(id)))
            .then(result => ( async () => {
                    for(const promise of result) {
                        const server = await promise
                        this.setState(prevState => {
                            servers: prevState.servers.push(server)
                        })
                    }
                    this.setState({
                        loading: false
                    })
                }) ()
            )
    }

    updateServer = async (serverId) => {
        await userService.updateServer(serverId)
        this.updateState()
    }

    createServer = async (serverName) => {
        await userService.createServer(serverName)
        this.updateState()
    }

    deleteServer = async (serverId) => {
        await userService.deleteServer(serverId)
        this.updateState()
    }

    renderServers() {
        const handlers = {
            updateServer: this.updateServer, 
            deleteServer: this.deleteServer,
            createServer: this.createServer
        }
        return (
            
            <div>
                <Header />
                <Body content={this.state} handlers={handlers}/>
                
            </div>
        );
    }

    render() {
        return this.renderServers()
        
    }
}

export { HomePage };