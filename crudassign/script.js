const api = "https://jsonplaceholder.typicode.com/todos";

const btn = document.getElementById("fetch");

btn.addEventListener("click", async () => {
  let isLoading = true;
  let loader ;
  if (isLoading === true) {
    loader = document.createElement("span");
    loader.textContent = "Loading...";
    document.body.appendChild(loader);
  }
  const res = await fetch(api);
  const data = await res.json();
  if (data) {
    isLoading = false;
    loader.style.display = 'none';
    const div1 = document.createElement("div");
    for (let i = 0; i < 10; i++) {
      const list = document.createElement("li");

      const textSpan = document.createElement("span");
      textSpan.textContent = data[i]?.title;

      //input field hidden initially
      const input = document.createElement("input");
      input.type = "text";
      input.value = data[i]?.title;
      input.style.display = 'none';

      //edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";

      //delete btn
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";

      editBtn.addEventListener("click", () => {
        if(editBtn.textContent === 'Edit'){
            textSpan.style.display = "none";
            input.style.display = 'inline';
            editBtn.textContent = 'Update';
        }else {
            textSpan.textContent = input.value;
            textSpan.style.display = 'inline';
            input.style.display = 'none';
            editBtn.textContent = 'Edit'
        }
      });

      delBtn.addEventListener("click", () => {
        list.remove();
      });
      list.appendChild(textSpan);
      list.appendChild(input);
      list.appendChild(editBtn);
      list.appendChild(delBtn);
      div1.appendChild(list);
    }
    document.body.appendChild(div1);
  }
});