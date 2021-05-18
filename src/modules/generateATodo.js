const COMPLETED_TODO="done";
const CONTINUED_TODO ="progress";
const FINISH_TODO = "Finish";
const UNDO_TODO = "Undo";
const FINISH_TODO_CSS = "finished";
const UNDO_TODO_CSS = "undo";
const TOGGLE_TODO_ACTION = "TOGGLE_TODO";
const TOGGLE_DELETE_ACTION = "DELETE_TODO";

export default function(todo){
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
};
