export default function(){
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