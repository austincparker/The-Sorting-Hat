const firstYears = [
    {
        name: "Austin Parker",
        house: "Gryffindor"
    },
    {
        name: "Katie Parker",
        house: "Hufflepuff"
    }
];

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

const studentBuilder = (studentArray) => {
    let domString = "";
    studentArray.forEach(student => {
        domString += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <p class="card-text">${student.house}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                </div>
            </div>
        `
    });

    renderToDom('#firstYears', domString);
};

const handleFormSubmit = (event) => { // Gives submit button functionality.
    event.preventDefault(); // Prevents page from refreshing to default.

    const newStudent = {
        name: document.querySelector('#studentName').value,
        house: "Gryffindor"
    }

    firstYears.unshift(newStudent);
    studentBuilder(firstYears);
}

const sortingFormEvents = () => {
document
    .querySelector('#sortingForm')
    .addEventListener('submit', handleFormSubmit);
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

init();