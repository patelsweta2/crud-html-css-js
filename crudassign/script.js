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
  if(data){
    isLoading = false;
    loader.style.display = 'none';
  }
  console.log(data);
  if (data) {
    const div1 = document.createElement("div");
    for (let i = 0; i < 10; i++) {
      const list = document.createElement("li");
      list.textContent = data[i]?.title;
      div1.appendChild(list);
    }
    document.body.appendChild(div1);
  }
});
