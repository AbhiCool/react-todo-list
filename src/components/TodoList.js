import React, { useEffect, useState } from 'react'

function TodoList() {

    const getTodoListArray = () => {
        const lists = localStorage.getItem("todoList");

        if (!lists) {
            return [];
        }

        return JSON.parse(lists);
    };
    const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(false);
    const [todoValue, setTodoValue] = useState('');
    const [todoListArray, setTodoListArray] = useState(getTodoListArray());
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const inputOnChange = (e) => {
        setTodoValue(e.target.value)
    };

    const addEntry = () => {
        if (todoValue === "") {
            setIsInputFieldEmpty(true);
            return;
        }
        setIsInputFieldEmpty(false);

        setTodoListArray([...todoListArray, todoValue]);

        setTodoValue('');
    }

    const deleteEntry = (index) => {
        console.log(index);

        setDeleteIndex(index);
    };


    const deleteEntryYes = () => {
        var copyTodoListArray = [...todoListArray];

        copyTodoListArray.splice(deleteIndex, 1);

        setTodoListArray(copyTodoListArray);

        setDeleteIndex(-1);
    }

    const deleteEntryNo = () => {
        setDeleteIndex(-1);
    }

    const todoList = todoListArray.map((item, index) => {
        return (<li key={index} className="list-group-item">
            {item}
            {/* <i className="fas fa-trash-alt todoItemDelete"  onClick={() => {deleteEntry(index)}}></i> */}
            <i className="fas fa-trash-alt todoItemDelete" onClick={() => {deleteEntry(index)}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </li>)
    });


    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoListArray));
        
        console.log("todoList", localStorage.getItem("todoList"));

    }, [todoListArray]);
    return (
        <div className="container TodoList">
            <div className="row justify-content-center">
                <div className='col-md-5 todoListContainer shadow-lg p-3 mb-5 bg-white rounded'>
                    <h1 className="text-center">React TODO List</h1>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input type="text" className="form-control todoItemInp" value={todoValue} onChange={inputOnChange} />
                        <button type="submit" className="btn btn-success todoItemAddBtn" onClick={addEntry}>Add</button>
                        {isInputFieldEmpty && <small className="errorMsg">Please enter TODO</small>}
                    </form>
                    <div>
                        <ul className=" todoListUl list-group list-group-flush">
                            {todoList}
                        </ul>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 style={{color: 'red'}} className="modal-title" id="exampleModalLabel">ATTENTION</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete TODO entry?
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteEntryYes}>Yes</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteEntryNo}>No</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TodoList