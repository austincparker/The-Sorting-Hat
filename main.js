

const renderToDom = (divId, textToPrint) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = textToPrint;
  };

const showSortingForm = () => { // Displays the sorting form.
    const sortingForm = `
        <form class="sorting-form">
            <div class="mb-3">
                <label for="studentName" class="form-label">Student's Name:</label>
                <input type="text" class="form-control" id="studentName" aria-describedby="sortingHelp">
                <div id="sortingHelp" class="form-text">The sorting hat takes your choice into account.</div>
            </div>
            <button type="submit" class="btn btn-primary">Sort</button>
        </form>
        `
    renderToDom('#formContainer', sortingForm);
}

const buttonEvents = () => {
    document.querySelector('#showFormBtn').addEventListener('click', showSortingForm) // Connects the 'Begin' button to the function that shows the form.

}

const init = () => {
    console.log('Welcome to Hogwarts');
    buttonEvents();
};

init();