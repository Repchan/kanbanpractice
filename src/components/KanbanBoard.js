import React from 'react'
import Backlog from "./Backlog";
import Finished from "./Finished";
import InProgress from "./InProgress";
import Ready from "./Ready";
import Profile from "./Profile";
class KanbanBoard extends React.Component{
    state = {
        backlogTask:[],
        readyTask:[],
        inProgressTask:[],
        finishedTask:[],
        id:JSON.parse(localStorage.getItem('id')),
        year: new Date().getFullYear(),
        changeDate:new Date()
    }
    componentDidMount() {
        this.handleUpdate()
    }
handleUpdate = () =>{
    const backlogArr = localStorage.getItem('Backlog');
    const readyArr = localStorage.getItem('Ready');
    const inProgressArr = localStorage.getItem('InProgress');
    const finishedArr = localStorage.getItem('Finished');
    const id = localStorage.getItem('id')
    if(backlogArr){
        this.setState({
            backlogTask:JSON.parse(backlogArr)
        })
    }
    if(readyArr){
        this.setState({
            readyTask:JSON.parse(readyArr)
        })
    }
    if(inProgressArr){
        this.setState({
            inProgressTask:JSON.parse(inProgressArr),
        })
    }
    if(finishedArr){
        this.setState({
            finishedTask:JSON.parse(finishedArr)
        })
    }
    if(id){
        this.setState({
            id:JSON.parse(id)
        })
    }
}

    render(){

        return(
            <div className={'kanbanPage'}>

                    <header className={'header'}>
                        <div className={'container'}>
                        <div className={'logo'}><h1>Awesome Kanban Board</h1></div>
                        <Profile/>
                        </div>
                    </header>
                    <div className={'kanbanContainer'}>
                        <div className={'container'}>
                        <Backlog arr={this.state.backlogTask} handleUpdate={this.handleUpdate} id={this.state.id}/>
                        <Ready arr={this.state.readyTask} backlogArr={this.state.backlogTask} handleUpdate={this.handleUpdate}/>
                        <InProgress arr={this.state.inProgressTask} readyArr={this.state.readyTask} handleUpdate={this.handleUpdate}/>
                        <Finished arr={this.state.finishedTask} inProgressArr={this.state.inProgressTask} handleUpdate={this.handleUpdate}/>
                        </div>
                    </div>
                    <footer className={'footer'}>
                        <div className={'container'}>
                        <div className={'optionTaskGroup'}>
                            <p className={'activeTask'}>Active tasks: {this.state.backlogTask.length}</p>
                            <p className={'donedTask'}>Finished tasks: {this.state.finishedTask.length}</p>
                        </div>
                        <p className={'author'}>Kanban board by Misha Repryntsev, {this.state.year}</p>
                        </div>
                    </footer>
            </div>
        )
    }
}
export default KanbanBoard