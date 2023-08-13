import React from 'react'

import KanbanCard from "./KanbanCard";
import task from "./task";
class Ready extends React.Component{
    state={
        checked:false,
        backlogTasks:'',
        taskArr:[],
        clickedTask:false,
        disabledEdit:true,
        editMode: false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.arr !== prevState.taskArr) {
            return {
                taskArr: nextProps.arr,
            };

        }
        return null;
    }
    componentDidMount(){
        this.setState({
            backlogTasks:this.props.backlogArr,
            taskArr:this.props.arr
        })
    }

    handleEditDescription = e => {
        if (this.state.editMode) {
            this.setState({ descriptionTask: e.target.value });
        }
    };
    handleClick=()=>{
        const updatedTasks = localStorage.getItem('Backlog')
        this.setState({
            checked:true,
            backlogTasks:JSON.parse(updatedTasks)
        })
    }
    handleSubmitForm = e => {
        e.preventDefault();
        const arr = this.state.taskArr;
        if (this.state.editMode) {
            arr[this.state.clickedTask].description = this.state.descriptionTask;
        }
        this.setState({
            taskArr: arr,
            clicked: false,
            editMode: false,
        }, () => {
            localStorage.setItem('Ready', JSON.stringify(this.state.taskArr))
        });
    };

    handleClickTask = (e) => {
        this.setState({
            checked:false
        })
        const arr = this.state.taskArr
        const backlogArr = this.state.backlogTasks
        let name;
        let id;
        let description;
        for(let i = 0;i<backlogArr.length;i++){
            if(backlogArr[i].id === parseInt(e.target.value)){
                console.log('Rab')
                name = backlogArr[i].name;
                id = backlogArr[i].id;
                description = backlogArr[i].description
                backlogArr.splice(i,1)
            }
        }
        arr.push({name:name,id:id,description:description})//здесь проблема с описанием
        this.setState({
            taskArr:arr
        })
        this.setState({
            backlogTasks: backlogArr
        })
        localStorage.setItem('Backlog', JSON.stringify(this.state.backlogTasks))
        localStorage.setItem('Ready',JSON.stringify(this.state.taskArr))
        this.props.handleUpdate()
    }

    render(){
        return(
            <KanbanCard name={'Ready'}>
                <>
                    {this.state.taskArr.map((item, index) => (
                        <div className={'taskArea'} key={index}>
                            {this.state.clickedTask === index ? (
                                <div className={'bigTask'}>
                                    <div className={'bigTaskContainer'}>
                                        <p className={'bigTaskName'}>{item.name}</p>
                                        {this.state.editMode ? (
                                            <form onSubmit={this.handleSubmitForm}>
                                                <input
                                                    className={'input editInput'}
                                                    name={'edit'}
                                                    type={'text'}
                                                    value={this.state.descriptionTask}
                                                    onChange={this.handleEditDescription}
                                                />
                                                <button className={'submitButton'}>Edit</button>
                                            </form>
                                        ) : (
                                            <p className={'bigTaskDescription'}>{item.description}</p>
                                        )}
                                        {this.state.disabledEdit ? (
                                            <button className={'submitButton modified'} onClick={() => this.setState({ disabledEdit: false, editMode: true })}>
                                                Edit description
                                            </button>
                                        ) : (
                                            <button className={'submitButton'} disabled={this.state.disabledEdit} onClick={() => this.setState({ disabledEdit: true, editMode: false })}>
                                                Cancel
                                            </button>
                                        )}
                                        <button className={'close'} onClick={() => this.setState({ clickedTask: null })}>
                                            <div className={'imgGroup'}>
                                                <img src={'/images/Line 2.svg'}></img>
                                                <img src={'/images/Line 2.svg'}></img>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                <div
                                    className={'task'}
                                    onClick={() => this.setState({ clickedTask: index })}
                                >
                                    {task(item.name)}
                                </div>
                            )}
                        </div>
                    ))}
                </>
                {this.state.checked? <select onChange={this.handleClickTask}>
                    <option value={'0'}>Choose Task</option>
                    {this.state.backlogTasks.map((task,index)=><option key={task.id} value={task.id}>{task.name}</option>)}
                </select>:<button className={'addTaskButton'} onClick={this.handleClick}><span className={'plus'}>+</span> Add Task</button>}
            </KanbanCard>
        )
    }
}
export default Ready