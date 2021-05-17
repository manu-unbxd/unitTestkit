const COMPLETED_TODO="done";
const CONTINUED_TODO ="progress";
const FINISH_TODO = "Finish";
const UNDO_TODO = "Undo";
const FINISH_TODO_CSS = "finished";
const UNDO_TODO_CSS = "undo";

const TOGGLE_TODO_ACTION = "TOGGLE_TODO";
const TOGGLE_DELETE_ACTION = "DELETE_TODO";

class TodoApp {
    constructor(props) {
        this.options = {
            todoWrapper:props.todoWrapper,
            input:props.input,
            createButton:props.createButton,
            storeId:props.storeId
        };
        this.state = {};
        this.initialize.bind(this);
    }
    initialize() {
        return new Promise((resolve)=>{
            return this.getTodosFromLocal().then((todos)=>{
                this.state.todoList = todos;
                return this.render().then(status => {
                    this.bindEvents();
                    resolve(true);
                })
            });
        });
    }
    bindEvents(){
        const {
            todoWrapper,
            createButton,
            input
        } = this.options;
        todoWrapper.addEventListener("click", this.checkTodoAction.bind(this));
        createButton.addEventListener("click", this.addTodo.bind(this));
    }
    checkTodoAction(e) {
        const {
            dataset
        } = e.target;
        const {
            id,
            action
        } = dataset;

        return new Promise((resolve)=>{
            if(action === TOGGLE_TODO_ACTION) {
                return this.completeTodo(id).then(status => resolve(true))
            }
            if(action === TOGGLE_DELETE_ACTION) {
                return this.deleteTodo(id).then(status => resolve(true))
            }
        })

    }
    deleteTodo(id) {
        let todos = this.state.todoList.filter(todo => todo.id !== id);
        this.state.todoList = todos;
        return Promise.resolve().then(()=>{
            const todoItem = document.getElementById(id);
            todoItem.parentNode.removeChild(todoItem);
            return this.updateLocalStorage().then(function() {
                return true
            })
        });

    }
    htmlParser(htmlTxt) {
        var d = document.createElement('div');
        d.innerHTML = htmlTxt;
        return d.firstChild;
    }
    completeTodo(id) {
        let checkedTodo = this.state.todoList.find(todo => todo.id === id);
        checkedTodo.isCompleted = !checkedTodo.isCompleted;
        return Promise.resolve().then(()=>{
            const todoItem = document.getElementById(id);
            const newTodoUi = this.htmlParser(this.generateATodo(checkedTodo));
            todoItem.parentNode.replaceChild(newTodoUi, todoItem);
            return this.updateLocalStorage().then(function() {
                return true
            })
        });
    }
    
    getTodosState() {
        const {
            todoList
        } = this.state;
        return todoList;
    }

    getTodosFromLocal() {
        const {
            storeId
        } = this.options;
        return Promise.resolve().then(function () {
            return (typeof window.localStorage !== "undefined" && window.localStorage.getItem(storeId)) ? JSON.parse(window.localStorage.getItem(storeId)) : [];
        });
    }
    updateLocalStorage () {
        const {
            storeId
        } = this.options;
        const {
            todoList
        } = this.state;
        const stateTodo = this.getTodosState();
        return Promise.resolve().then(function () {
            if(typeof window.localStorage !== "undefined"){
                window.localStorage.setItem(storeId, JSON.stringify(todoList));
            }
            return stateTodo;
        });
    }

    addTodo() {
        const {
            input
        } = this.options;
        return new Promise((resolve, reject)=>{
            const ipValue =input.value;
            if (ipValue.length > 2){
                const item = {
                    id: `todo-${Date.now()}`,
                    title: ipValue,
                    isCompleted: false
                  };
                this.state.todoList.push(item);
                this.updateLocalStorage();
                input.value = '';
                this.render().then(status => resolve(true));
              } else {
                reject(false);
              }
        })
    }
    generateATodo(todo) {
        const {
            id,
            isCompleted,
            title
        } = todo;
        const todoCss = (isCompleted) ? COMPLETED_TODO : CONTINUED_TODO;
        let ui = ``;
        ui += `<div id="${id}" class="todo-item ${todoCss}">${title}<div class="buttons">`;
        let finishTxt = FINISH_TODO;
        let finishBtnCss = FINISH_TODO_CSS;
        if(isCompleted) {
            finishTxt = UNDO_TODO;
            finishBtnCss = UNDO_TODO_CSS;
        }
        ui += `<button data-id="${id}" data-action="${TOGGLE_TODO_ACTION}" class="finish-btn ${finishBtnCss}">${finishTxt}</button>`;
        ui += `<button data-id="${id}" data-action="${TOGGLE_DELETE_ACTION}" class="btn-delete" >x</button></div></div>`;
        return ui;
    }
    render() {
        return new Promise((resolve) =>{
            const {
                todoList
            } = this.state;
            todoList.sort((a, b) => a.status > b.status ? -1 : 1 );
            let todosListUI = `<div class="todos">`;
            todosListUI += todoList.map((todo) => {
                return this.generateATodo(todo);
            }).join("");
            todosListUI += `</div>`;
            this.options.todoWrapper.innerHTML = todosListUI;
            resolve(true);
        })
    }
}
export default TodoApp;