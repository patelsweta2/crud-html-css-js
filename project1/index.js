const notebook = document.getElementById("notebook");
const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

const undoStack = [];
const redoStack = [];

let debounceTimer = null;

const debounce = (func,delay) => {
    return function(){
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(), delay);
    }
}

const addInput = () => {
  undoStack.push(notebook.innerHTML);
  redoStack.length = 0;
};
const debouncedSavedTime = debounce(addInput,500);
notebook.addEventListener("input", () => {
    debouncedSavedTime();
});
undo.addEventListener("click", () => {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    notebook.innerHTML = undoStack[undoStack.length-1];
  }
});

redo.addEventListener("click", () => {
    if(redoStack.length > 0){
        let nextState = redoStack.pop();
        undoStack.push(nextState);
        notebook.innerHTML = nextState;
    }
});

undoStack.push(notebook.innerHTML)