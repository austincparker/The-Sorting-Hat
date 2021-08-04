const firstYears = [];

// Form to be rendered to DOM when 'Begin' button is clicked.
const sortingForm = `
        <form class="sorting-form" id="sortingForm">
            <div class="mb-3">
                <label for="studentName" class="form-label">Student's Name:</label>
                <input type="text" class="form-control" id="studentName" name="studentName"aria-describedby="sortingHelp">
                <div id="sortingHelp" class="form-text">The sorting hat takes your choice into account.</div>
            </div>
            <button type="submit" class="btn btn-primary" id="sortBtn">Sort</button>
        </form>
        `

const renderToDom = (divId, textToPrint) => { // This saves us some typing when we are rendering things to the DOM.
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = textToPrint;
  };

const showSortingForm = () => { // Displays the sorting form.
    renderToDom('#formContainer', sortingForm);
}

const studentBuilder = (studentArray) => { // Renders cards to the DOM when the form submits.
    let domString = "";
    studentArray.forEach(student => {
        domString += `
            <div class="card my-2" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <p class="card-text">${student.house}</p>
                    </div>
                </div>
                </div>
            </div>
        `
    });

    renderToDom('#firstYears', domString);
};

const randomNum = () => { // Rolls a random number from 0 to 4.
    return Math.floor(Math.random() * 4);
}

const assignHouse = () => { // Uses the rolled number to select an index of the houses array.
    const housesArray = ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"];
    let sortHouses = housesArray[randomNum()];
    return sortHouses;
}

console.log(randomNum());

const handleFormSubmit = (event) => { // Gives sort button functionality.
    
    if(event.target.type === "submit"){ // Targets the sort button after it renders to the DOM.
        event.preventDefault(); // Prevents page from refreshing to default.

    const newStudent = {
        name: document.querySelector('#studentName').value,
        house: assignHouse()
    }

    if(newStudent.name.length < 1){
        alert('You cannot sort an empty chair!');
    } else {
        firstYears.unshift(newStudent);
    studentBuilder(firstYears);
    document.querySelector("#sortingForm").reset();
    }
    }
};
    

const sortingFormEvents = () => { // Tells the studentBuilder function where to put the student cards.
document
    .querySelector('#formContainer')
    .addEventListener('click', handleFormSubmit);
}

const buttonEvents = () => { // Controls what happens when buttons are clicked.
    document
        .querySelector('#showFormBtn')
        .addEventListener('click', showSortingForm) // Connects the 'Begin' button to the function that shows the form.

};

const init = () => {
    console.log('Welcome to Hogwarts');
    buttonEvents();
    sortingFormEvents();
};

init(); // This makes the magic happen.