const draggable_list=document.getElementById("draggable-list");
const check= document.getElementById("check");

const richestpeople= [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jensen Huang",
  "Bernard Arnault",
  "Rob Walton",
  "Warren Buffett",
  "Rob Walton & family",
];

const listItems=[]
    let dragStarIndex;

    createList();
    function createList() 
    {
        [...richestpeople]
        .map((a) => ({ value:a, sort:Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((person, index) => {
            const listItem=document.createElement("li");
            listItem.classList.add("over");

            listItem.setAttribute("data-index", index );
            listItem.innerHTML= `
            <span class="number">${index +1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name" >${person}</p>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
            `;

            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
        addEventListener();

    }
    function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
    this.classList.add("over");
        

    }
function dragover(e) {
    e.preventDefault();
        }


    function dragleave() {
     this.classList.remove("over"); 
    }
    function dragdrop() {
        const dragEndIndex= +this.getAttribute("data-index");
        swapItems(dragStartIndex, dragEndIndex);
        this.classList.remove("over");
        

    }
    function swapItems(fromIndex,toIndex){
        const itemOne =listItems[fromIndex].querySelector(".draggable");
        const itemTwo =listItems[toIndex].querySelector(".draggable");
        listItems[fromIndex].appendChild(itemTwo);
        listItems[toIndex].appendChild(itemOne);
    }
    //function checkorder() {

    listItems.forEach((listItem, index) => {

        const personName = listItem
        .querySelector(".draggable")
        .innerText
        .trim();

        if (personName !== richestpeople[index]) {
            listItem.classList.add("wrong");
        } else { 
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }

    });

//
function checkorder() {

    listItems.forEach((listItem, index) => {

        const personName = listItem
            .querySelector(".draggable")
            .innerText
            .trim();

        listItem.classList.remove("right", "wrong");

        if (personName !== richestpeople[index]) {
            listItem.classList.add("wrong");
        } else {
            listItem.classList.add("right");
        }

    });

}
        
  
//
function addEventListener() {

    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll("#draggable-list li");

    draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener("dragover", dragover);
        item.addEventListener("drop", dragdrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragleave);
    });
}

check.addEventListener("click", checkorder);