import React from 'react'

import KanbanCard from "./KanbanCard";
import task from "./task";
class InProgress extends React.Component{
    state={
        checked:false,
        readyTasks:'',
        taskArr:[],
        clickedTask:false,
        disabledEdit:true,
        editMode: false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // Выставляем значение из пропса в состояние компонента
        if (nextProps.arr !== prevState.taskArr) {
            return {
                taskArr: nextProps.arr,
            };
        }
        // Возвращаем null, если не требуется обновление состояния
        return null;
    }
    componentDidMount(){
        this.setState({
            readyTasks:this.props.readyArr,
            taskArr:this.props.arr
        })
    }
    handleSubmitForm = e => {
        e.preventDefault();
        const arr = this.state.taskArr;
        if (this.state.editMode) {
            // Обновляем описание задачи
            arr[this.state.clickedTask].description = this.state.descriptionTask;
        }
        this.setState({
            taskArr: arr,
            clicked: false,
            editMode: false, // Выключаем режим редактирования после отправки
        }, () => {
            localStorage.setItem('InProgress', JSON.stringify(this.state.taskArr))
        });
    };
    handleClick=()=>{
        const updatedTasks = localStorage.getItem('Ready')
        this.setState({
            checked:true,
            readyTasks:JSON.parse(updatedTasks)
        })
    }
    handleClickTask = (e) => {
        this.setState({
            checked:false
        })
        const arr = this.state.taskArr
        const readyArr = this.state.readyTasks
        let name;
        let id;
        let description;
        for(let i = 0;i<readyArr.length;i++){
            if(readyArr[i].id === parseInt(e.target.value)){
                console.log('Rab')
                name = readyArr[i].name;
                id = readyArr[i].id;
                description = readyArr[i].description
                readyArr.splice(i,1)
            }
        }
        arr.push({name:name,id:id,description:description})//здесь проблема с описанием
        this.setState({
            taskArr:arr
        })
        this.setState({
            readyTasks: readyArr
        })
        localStorage.setItem('Ready', JSON.stringify(this.state.readyTasks))
        localStorage.setItem('InProgress',JSON.stringify(this.state.taskArr))
        this.props.handleUpdate()
    }
    handleEditDescription = e => {
        if (this.state.editMode) {
            this.setState({ descriptionTask: e.target.value });
        }
    };
    render(){
        return(
            <KanbanCard name={'InProgress'}>
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
                    {this.state.readyTasks.map((task,index)=><option key={index} value={task.id}>{task.name}</option>)}
                </select>:<button className={'addTaskButton'} onClick={this.handleClick}><span className={'plus'}>+</span> Add Task</button>}
            </KanbanCard>
        )
    }
}
export default InProgress