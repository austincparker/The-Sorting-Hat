const firstYears = []; // Goody array.

const deathEaters = []; // Baddy array.

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
    document
    .querySelector('#sortBtn')
    .addEventListener('click', handleFormSubmit);

};

const studentBuilder = (studentArray) => { // Renders cards to the DOM when the form submits.
    let domString = "";
    studentArray.forEach((student, i) => {
        domString += `
            <div class="card my-2" style="max-width: 500px;">
                <div class="row g-0">
                <div class="col-md-4" style="background-color:${student.color};">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <p class="card-text">${student.house}</p>
                    <button type="button" class="btn btn-danger" id="${i}">Expel</button>
                    </div>
                </div>
                </div>
            </div>
        `

    });

    renderToDom('#firstYears', domString);
};

const baddyBuilder = (studentArray) => { // After the expel button is pressed, renders the new baddy card to the DOM.
    let domString = "";
    studentArray.forEach(student => {
        domString += `
        <div class="card my-2" style="max-width: 24rem;">
            <img src="deatheatersimg.jpg" class="card-img-top" alt="image of deatheaters">
            <div class="card-body">
            <p class="card-text">${student.name} has become a <em><strong>Death Eater!</strong></em></p>
        </div>
        </div>
        `
    });
    renderToDom('#voldysArmy', domString);
};

const randomNum = () => { // Rolls a random number from 0 to 4.
    return Math.floor(Math.random() * 4);
};

const assignHouse = () => { // Uses the rolled number to select an index of the houses array.
    const housesArray = ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"];
    let sortHouses = housesArray[randomNum()];
    return sortHouses;
};

const handleFormSubmit = (event) => { // Gives sort button functionality.
    
        event.preventDefault(); // Prevents page from refreshing to default.

    const newStudent = {
        name: document.querySelector('#studentName').value,
        house: assignHouse()
    };

    if(newStudent.house === "Gryffindor"){ // Applies the house colors to each card.
        newStudent.color = "#AE0001";
        newStudent.houseNum = 1;
    }
    if(newStudent.house === "Slytherin"){
        newStudent.color = "#2A623D";
        newStudent.houseNum = 2;
    }
    if(newStudent.house === "Hufflepuff"){
        newStudent.color = "#FFDB00";
        newStudent.houseNum = 3;
    }
    if(newStudent.house === "Ravenclaw"){
        newStudent.color = "#222F5B";
        newStudent.houseNum = 4;
    };

    if(newStudent.name.length < 1){
        alert('You cannot sort an empty chair!');
    } else {
        firstYears.unshift(newStudent);
        const orderedFYs = firstYears.sort((a, b) => a.houseNum - b.houseNum);

        studentBuilder(orderedFYs);
        document.querySelector("#sortingForm").reset();
    };
};

const expelStudent = (event) => { // Gives the expel button functionality.
    const targetId = event.target.id;
    const targetType = event.target.type;

    if (targetType === "button") {
        const dropOut = firstYears.splice(targetId, 1);

        deathEaters.unshift(dropOut[0]);
        baddyBuilder(deathEaters);
        studentBuilder(firstYears);
    };
};

const buttonEvents = () => { // Controls what happens when buttons are clicked.
    document
        .querySelector('#showFormBtn')
        .addEventListener('click', showSortingForm) // Connects the 'Begin' button to the function that shows the form.
        document.querySelector('#firstYears').addEventListener('click', expelStudent);

};

const init = () => {
    console.log('Welcome to Hogwarts!');
    buttonEvents();
};

init(); // This makes the magic happen.