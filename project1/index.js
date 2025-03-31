const notebook = document.getElementById("notebook");
const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

const undoStack = [];
const redoStack = [];

const addInput = (input) => {
  undoStack.push(input);
  redoStack = [];
};

notebook.addEventListener("input", () => {
  addInput(notebook.innerHTML);
});
undo.addEventListener("click", () => {
  if (undoStack.length > 0) {
    redoStack.push(undoStack.pop());
    notebook.innerHTML = undoStack[undoStack.length - 1];
  }
});

redo.addEventListener("click", () => {
    if(redoStack.length > 0){
        let nextState = redoStack.pop();
        undoStack.push(nextState);
        notebook.innerHTML = nextState;
    }
});
