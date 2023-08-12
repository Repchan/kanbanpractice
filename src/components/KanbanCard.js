import React from 'react'
class KanbanCard extends React.Component{
    render(){
        return(
            <div className={'kanbanCard'}>
                <h2>{this.props.name}</h2>
                {this.props.children}
            </div>
        )
    }
}
export default KanbanCard