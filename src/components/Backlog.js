import React from 'react'
import task from "./task";
import KanbanCard from "./KanbanCard";
class Backlog extends React.Component{

    state={
        taskArr:this.props.arr,
        disabled:true,
        description:'',
        descriptionTask:'No description yet',
        id:this.props.id,
        clicked:false,
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
     componentDidMount() {
         const { arr } = this.props;
         this.setState({ taskArr: arr });
     }


    handleSubmitForm = e => {

        e.preventDefault();
        const arr = this.state.taskArr;
        const id = this.state.id + 1;

        if (this.state.editMode) {
            // Обновляем описание задачи
            arr[this.state.clickedTask].description = this.state.descriptionTask;
        } else {
            // Добавляем новую задачу
            arr.push({ name: this.state.description, id: id, description: this.state.descriptionTask });
        }

        this.setState({
            taskArr: arr,
            description: '',
            disabled: true,
            clicked: false,
            id: id,
            editMode: false, // Выключаем режим редактирования после отправки
        }, () => {
            localStorage.setItem('Backlog', JSON.stringify(this.state.taskArr))
            localStorage.setItem('id',JSON.stringify(this.state.id))
            this.props.handleUpdate()
        });

    };

    handleChange = e =>{
        if(e.target.value === ''){
            this.setState({disabled:true})
        }
        else{
            this.setState({
                disabled:false,
                description:e.target.value
            })
        }
    }
    handleEditDescription = e => {
        if (this.state.editMode) {
            this.setState({ descriptionTask: e.target.value });
        }
    };

    render(){

        return(
            <KanbanCard name={'Backlog'}>
                {this.state.taskArr.map((item, index) => (
                    <div className={'taskArea'} key={index}>
                        {this.state.clickedTask === index ? (
                            <div className={'bigTask'}>
                                <p>{item.name}</p>
                                {this.state.editMode ? (
                                    <form onSubmit={this.handleSubmitForm}>
                                        <input
                                            name={'edit'}
                                            type={'text'}
                                            value={this.state.descriptionTask}
                                            onChange={this.handleEditDescription}
                                        />
                                        <button>Edit</button>
                                    </form>
                                ) : (
                                    <p>{item.description}</p>
                                )}
                                {this.state.disabledEdit ? (
                                    <button onClick={() => this.setState({ disabledEdit: false, editMode: true })}>
                                        Редактировать описание
                                    </button>
                                ) : (
                                    <button disabled={this.state.disabledEdit} onClick={() => this.setState({ disabledEdit: true, editMode: false })}>
                                        Отменить
                                    </button>
                                )}

                                <button onClick={() => this.setState({ clickedTask: null })}>
                                    Close
                                </button>
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


                <form className={'form'} onSubmit={this.handleSubmitForm}>

                    {this.state.clicked === false ? <button className={'addTaskButton'} onClick={()=>this.setState({clicked:true})}><span className={'plus'}>+</span> Add Task</button> : <><input
                        name="task"
                        type="text"
                        key={'text'}
                        onChange={this.handleChange}
                        className={'input'}
                    /><button className={this.state.disabled ? 'submitButton submitButtonDisabled':'submitButton'}  disabled={this.state.disabled}>Submit</button></> }

                </form>
            </KanbanCard>
        )
    }
}
export default Backlog