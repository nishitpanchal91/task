const subjects = [
  { code: 'PM', name: 'Project Management', totals: { assignment: 5, ppt: 1, report: 1, pbl: 3, practical: 0 } },
  { code: 'CN', name: 'Computer Networks', totals: { assignment: 0, ppt: 0, report: 0, pbl: 3, practical: 10 } },
  { code: 'PDS', name: 'Problem Data Structures', totals: { assignment: 0, ppt: 0, report: 0, pbl: 2, practical: 11 } },
  { code: 'SS', name: 'Soft Skills', totals: { assignment: 5, ppt: 1, report: 1, pbl: 1, practical: 10 } },
  { code: 'MI', name: 'Microprocessor Interface', totals: { assignment: 5, ppt: 1, report: 1, pbl: 3, practical: 10 } },
  { code: 'WAD', name: 'Web App Development', totals: { assignment: 0, ppt: 0, report: 0, pbl: 0, practical: 10 } }
];

const contentColumns = ['assignment', 'ppt', 'report', 'pbl', 'practical'];
const storageKey = 'semester-taskboard-progress-v1';
let progress = loadProgress();

function xeroxTotal(subject) {
  return subject.totals.assignment + subject.totals.ppt + subject.totals.report + subject.totals.pbl;
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function getCompleted(subjectIndex, column) {
  const saved = progress[`${subjectIndex}-${column}`];
  return Number.isInteger(saved) ? saved : 0;
}

function totalFor(subject, column) {
  return column === 'xerox' ? xeroxTotal(subject) : subject.totals[column];
}

function taskCell(subject, subjectIndex, column) {
  const total = totalFor(subject, column);
  const completed = Math.min(getCompleted(subjectIndex, column), total);
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const label = total === 0
    ? 'Not needed'
    : completed === total
      ? 'Complete'
      : completed === 0
        ? 'Not started'
        : `${percent}% done`;
  const dots = total > 0
    ? `<span class="task-dots" aria-hidden="true">${Array.from({ length: Math.min(total, 15) }, (_, index) => `<span class="task-dot ${index < completed ? 'done' : ''}"></span>`).join('')}</span>`
    : '';
  const disabled = total === 0 ? ' disabled' : '';
  const disabledText = total === 0 ? 'No items planned' : `${completed} of ${total} complete. Click to ${completed === total ? 'reset' : 'complete the next'} item.`;
  return `<button class="task-cell ${column === 'xerox' ? 'xerox-cell' : ''} ${completed > 0 && completed < total ? 'is-started' : ''} ${total > 0 && completed === total ? 'is-complete' : ''}" data-subject="${subjectIndex}" data-column="${column}" type="button" aria-label="${subject.code} ${column}: ${disabledText}"${disabled}> <span class="task-count">${total ? `${completed} / ${total}` : '—'}</span>${dots}<span class="task-status">${label}</span></button>`;
}

function render() {
  const rows = document.querySelector('#taskRows');
  rows.innerHTML = subjects.map((subject, subjectIndex) => `
    <tr>
      <th scope="row"><span class="subject-code">${subject.code}</span><span class="subject-name">${subject.name}</span></th>
      ${contentColumns.map((column) => `<td>${taskCell(subject, subjectIndex, column)}</td>`).join('')}
      <td>${taskCell(subject, subjectIndex, 'xerox')}</td>
    </tr>
  `).join('');

  document.querySelectorAll('.task-cell:not(:disabled)').forEach((button) => button.addEventListener('click', advanceTask));
  updateSummary();
}

function advanceTask(event) {
  const button = event.currentTarget;
  const subjectIndex = Number(button.dataset.subject);
  const column = button.dataset.column;
  const total = totalFor(subjects[subjectIndex], column);
  const current = getCompleted(subjectIndex, column);
  progress[`${subjectIndex}-${column}`] = current >= total ? 0 : current + 1;
  localStorage.setItem(storageKey, JSON.stringify(progress));
  render();
}

function updateSummary() {
  let totalItems = 0;
  let completedItems = 0;
  subjects.forEach((subject, subjectIndex) => {
    [...contentColumns, 'xerox'].forEach((column) => {
      const total = totalFor(subject, column);
      totalItems += total;
      completedItems += Math.min(getCompleted(subjectIndex, column), total);
    });
  });
  const percent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;
  document.querySelector('#overallPercent').textContent = `${percent}%`;
  document.querySelector('#overallBar').style.width = `${percent}%`;
  document.querySelector('#overallLabel').textContent = `${completedItems} of ${totalItems} items complete`;
  document.querySelector('#subjectCount').textContent = subjects.length;
  document.querySelector('#doneCount').textContent = completedItems;
  document.querySelector('#remainingCount').textContent = totalItems - completedItems;
  document.querySelector('#lastUpdated').textContent = completedItems ? 'Progress saved just now' : 'Ready to begin';
}

document.querySelector('#resetButton').addEventListener('click', () => {
  if (!Object.keys(progress).length || window.confirm('Reset all completion progress?')) {
    progress = {};
    localStorage.removeItem(storageKey);
    render();
  }
});

render();
