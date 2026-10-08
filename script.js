const defaultMenu = [
  {category:"Buoy Buns",name:"Bacon, Egg & Cheese Buoy Bun",price:"$—",description:"A house favorite mentioned in local coverage; check today's menu for the current version."},
  {category:"Buoy Buns",name:"Sweet or Savory Buoy Bun",price:"$—",description:"Rotating sweet and savory filled buns. Availability changes daily."},
  {category:"Bakery",name:"Fresh Pastry",price:"$—",description:"Rotating pastries, including danish, scones and other house-made treats."},
  {category:"Bakery",name:"Giant Cookie",price:"$—",description:"Large bakery cookies with rotating flavors."},
  {category:"Bakery",name:"Muffin",price:"$—",description:"Fresh muffins with flavors that change with the menu."},
  {category:"Breakfast & Lunch",name:"Breakfast Sandwich",price:"$—",description:"House-made breakfast sandwiches; check the current menu for today's choices."},
  {category:"Breakfast & Lunch",name:"Soup",price:"$—",description:"Rotating soups such as roasted tomato, potato ham and other seasonal recipes."},
  {category:"Take & Bake",name:"Heat & Eat",price:"$—",description:"Prepared take-home foods that can be heated and served later."},
  {category:"Special Orders",name:"Custom / Catering Request",price:"Ask",description:"Special orders and catering are available; contact the bakery for current options."},
  {category:"Gluten-Free",name:"Gluten-Free Treat",price:"$—",description:"Little Buoy is known for offering gluten-free baked goods; ask about current selections."}
];

let menu = JSON.parse(localStorage.getItem("littleBuoyMenu") || "null") || defaultMenu;
let activeCategory = "All";

const categories = () => ["All", ...new Set(menu.map(x=>x.category))];

function renderTabs(){
  const wrap=document.querySelector("#categoryTabs");
  wrap.innerHTML=categories().map(c=>`<button class="tab ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
  wrap.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderTabs();renderMenu()});
}
function renderMenu(){
  const grid=document.querySelector("#menuGrid");
  const items=activeCategory==="All"?menu:menu.filter(x=>x.category===activeCategory);
  grid.innerHTML=items.map((x,i)=>`<article class="menu-card">
    <div class="menu-card-top"><h3>${escapeHtml(x.name)}</h3><span class="price">${escapeHtml(x.price)}</span></div>
    <p>${escapeHtml(x.description)}</p>
    <button class="add" onclick="href="tel:+19062071000"">Call Us for Availability! ↗</button>
  </article>`).join("");
}
function renderEditor(){
  document.querySelector("#editor").innerHTML=menu.map((x,i)=>`<div class="editor-row">
    <input data-i="${i}" data-k="name" value="${attr(x.name)}">
    <input data-i="${i}" data-k="price" value="${attr(x.price)}">
    <input data-i="${i}" data-k="category" value="${attr(x.category)}">
    <input data-i="${i}" data-k="description" value="${attr(x.description)}">
    <small>Item ${i+1} — description</small>
  </div>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function attr(s){return escapeHtml(s)}
document.querySelector("#editMenuBtn").onclick=()=>{renderEditor();document.querySelector("#menuModal").classList.add("open")};
document.querySelector("#closeModal").onclick=()=>document.querySelector("#menuModal").classList.remove("open");
document.querySelector("#saveMenu").onclick=()=>{
  document.querySelectorAll("#editor input").forEach(input=>menu[+input.dataset.i][input.dataset.k]=input.value);
  localStorage.setItem("littleBuoyMenu",JSON.stringify(menu));
  activeCategory="All";renderTabs();renderMenu();document.querySelector("#menuModal").classList.remove("open");
};
renderTabs();renderMenu();
