/**
 * new-entry.js
 * Milestone 2: read the form's values with .value and log them.
 * Milestone 3: build an entry object and push it into the localStorage array.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Show today's date under the page title.
    const today = new Date();
    const todayIso = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
    document.getElementById('today-label').textContent = formatDate(todayIso);
  
    const form = document.querySelector('#entry-form');
    const titleInput = document.querySelector('#entry-title');
    const bodyInput = document.querySelector('#entry-body');
    const saveBtn = document.querySelector('#save-btn');
    const saveConfirm = document.querySelector('#save-confirm');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // stop the browser from reloading the page
  
      const titleValue = titleInput.value.trim();
      const bodyValue = bodyInput.value.trim();
  
      // Milestone 2: prove we can pull the values out.
      console.log('Title:', titleValue);
      console.log('Body:', bodyValue);
  
      if (!titleValue || !bodyValue) return; // required attrs cover this, but double-check
  
      // Milestone 3: build the entry object and save it.
      const newEntry = {
        id: Date.now().toString(),
        title: titleValue,
        body: bodyValue,
        date: todayIso, // e.g. "2026-03-14", used for display + sorting
      };
  
      addEntry(newEntry);
  
      // Reset the form and show a quiet confirmation instead of an alert().
      form.reset();
      saveConfirm.classList.add('show');
      titleInput.focus();
      setTimeout(() => saveConfirm.classList.remove('show'), 2200);
    });
  });
  