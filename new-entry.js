/**
 * new-entry.js
 * Milestone 2: read the form with .value and log it.
 * Milestone 3: build an entry object and save it to localStorage.
 * Extra: pick a date, and edit an existing entry (new-entry.html?edit=<id>).
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#entry-form');
  const dateInput = document.querySelector('#entry-date');
  const titleInput = document.querySelector('#entry-title');
  const bodyInput = document.querySelector('#entry-body');
  const saveBtn = document.querySelector('#save-btn');
  const saveConfirm = document.querySelector('#save-confirm');

  // Entries can't be dated in the future.
  dateInput.max = todayIso();
  dateInput.value = todayIso();

  // Edit mode: ?edit=<id> fills the form with the saved entry.
  const editId = new URLSearchParams(window.location.search).get('edit');
  const existing = editId ? findEntry(editId) : null;

  if (existing) {
    document.querySelector('#form-heading').textContent = 'Edit page';
    document.querySelector('#form-subtitle').textContent = 'Change anything, then save.';
    saveBtn.textContent = 'Save changes';
    saveConfirm.textContent = 'Changes saved ✓';
    dateInput.value = existing.date;
    titleInput.value = existing.title;
    bodyInput.value = existing.body;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the browser reloading the page

    const dateValue = dateInput.value;
    const titleValue = titleInput.value.trim();
    const bodyValue = bodyInput.value.trim();

    // Milestone 2: prove we can pull the values out.
    console.log('Date:', dateValue, '| Title:', titleValue, '| Body:', bodyValue);

    if (!dateValue || !titleValue || !bodyValue) return;

    if (existing) {
      updateEntry(existing.id, { date: dateValue, title: titleValue, body: bodyValue });
      saveConfirm.classList.add('show');
      setTimeout(() => {
        window.location.href = 'entry.html?id=' + existing.id;
      }, 700);
      return;
    }

    // Milestone 3: build the entry object and save it.
    addEntry({
      id: Date.now().toString(),
      date: dateValue,
      title: titleValue,
      body: bodyValue,
    });

    form.reset();
    dateInput.value = todayIso();
    saveConfirm.classList.add('show');
    titleInput.focus();
    setTimeout(() => saveConfirm.classList.remove('show'), 2200);
  });
});
