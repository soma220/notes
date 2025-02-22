let notes = JSON.parse(localStorage.getItem('notes')) || [];

// set up
renderNotes();

function renderNotes() {
  let notesHTML = '';

  notes.forEach((note, index) => {
    notesHTML += `
      <div>
        <div class="note-container">
          <textarea id="comment" class="note-textarea js-note-textarea" data-id=${index}>${note}</textarea>
          <div class="delete-container">
            <button class="delete-button js-delete-button" data-id=${index}>
              <span class="delete-icon"></span>
            </button>
          </div>
        </div>
      </div>
    `;
  })

  document.querySelector('.js-note-preview').innerHTML = notesHTML;
  
  document.querySelectorAll('.js-note-textarea').forEach((textarea) => {
    // adjusts height
    renderTextarea(textarea);
    

    // while editting
    textarea.addEventListener("input", () => {
      renderTextarea(textarea);
      const edittedContent = textarea.value;
      const id = textarea.dataset.id;
      editNote(edittedContent, id);
    })
  
  
    // when ends editting
    textarea.addEventListener("focusout", () => {
      saveNotes();
      renderNotes();
    });
  });
  
  // delete-button
  document.querySelectorAll('.js-delete-button').forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.dataset.id;
      deleteNote(id);
    })
  })

  const inputElement = document.querySelector('.js-input-note');
  inputElement.addEventListener("input", () => {
    renderTextarea(inputElement);
  });
  renderTextarea(inputElement);
  
}

function addNote() {
  const content = document.querySelector('.js-input-note').value;
  document.querySelector('.js-input-note').value = '';
  if (content === '') {
    alert(`
      Invalid content
      Please input something
    `)
    return;
  }

  notes.unshift(content);
  renderNotes();
  saveNotes();
}

function deleteNote(id) {
  notes.splice(id, 1);
  renderNotes();
  saveNotes();
}

function saveNotes() {
  notes = notes.filter((note) => {
    if (note !== '') {
      return true;
    };
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function editNote(content, id) {
  notes[id] = content;
}

function renderTextarea(textarea) {
  textarea.style.height = "auto"; // 高さをリセット
  textarea.style.height = (textarea.scrollHeight) + "px"; // 内容に応じて高さを設定
}

document.querySelector('.js-create-button').addEventListener('click', () => {
  addNote();
  saveNotes();
  renderNotes();
})

document.querySelector('.js-input-note').addEventListener('keydown', (event) => {
  if (event.key === 'Control') {
    addNote();
    saveNotes();
    renderNotes();
  }
})