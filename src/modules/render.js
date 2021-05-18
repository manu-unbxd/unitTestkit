export default function() {
    return new Promise((resolve) => {
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
};
