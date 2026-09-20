/**
 * Semester Taskboard - Core Application Logic
 * Supports itemized sub-tasks, 1-click completion, modal checklists, deadlines, and JSON backup.
 */

const subjects = [
  {
    code: 'CN',
    name: 'Computer Networks',
    deliverables: {
      assignment: [],
      ppt: [],
      report: [],
      pbl: [
        {
          id: 'cn-pbl-1',
          title: 'PBL Activity & Suggested Solution / Report',
          shortDesc: 'Choose 1 Activity: Micro Project, Complex Problem-Solving, Technical Writing, or Case Study',
          badge: 'Printed Report + Practical File Submission',
          instructions: 'Prepare a well-structured suggested solution/report. Submit printed copy along with Practical File to respective Lab Faculty. Topic approval required before beginning.'
        }
      ],
      practical: Array.from({ length: 10 }, (_, i) => ({
        id: `cn-prac-${i + 1}`,
        title: `Practical ${i + 1}`,
        shortDesc: [
          'Study of networking devices and LAN setup',
          'IP addressing and subnetting implementation',
          'Configuration of static and dynamic routing',
          'Simulation of TCP/UDP protocols using Packet Tracer/NS2',
          'Wireshark packet capture and protocol analysis',
          'Implementation of VLAN and switch configuration',
          'Wireless network configuration and security testing',
          'Socket programming using TCP and UDP',
          'Simulation of SDN using Mininet/OpenFlow',
          'Mini Project on Cloud or IoT based networking application'
        ][i]
      }))
    }
  },
  {
    code: 'PM',
    name: 'Project Management',
    deliverables: {
      assignment: Array.from({ length: 5 }, (_, i) => ({
        id: `pm-asg-${i + 1}`,
        title: `Assignment ${i + 1}`,
        shortDesc: `Unit ${i + 1} project management concepts & case studies`
      })),
      ppt: [
        {
          id: 'pm-ppt-1',
          title: 'Final Project Presentation (PPT)',
          shortDesc: 'Project presentation covering proposal, planning, execution, teamwork & outcomes',
          badge: 'Deadline: 10/10/2026',
          dueDate: '2026-10-10'
        }
      ],
      report: [
        {
          id: 'pm-rep-1',
          title: 'Final Project Documentation / Report',
          shortDesc: 'Comprehensive Word document of project planning, execution, risks & results',
          badge: 'Deadline: 10/10/2026',
          dueDate: '2026-10-10'
        }
      ],
      pbl: [
        {
          id: 'pm-pbl-1',
          title: 'Phase 1: Project Proposal and Planning',
          shortDesc: 'Form group, select idea, define title, scope, objective & tools. 10–15 page Word doc + Google Sheet entry.',
          badge: 'Deadline: 17/08/2026',
          dueDate: '2026-08-17'
        },
        {
          id: 'pm-pbl-2',
          title: 'Phase 2: Project Execution and Progress Monitoring',
          shortDesc: 'Implement proposed project, milestone tracking, documentation, resource allocation & risk management. 10–15 page Word doc.',
          badge: 'Deadline: 17/09/2026',
          dueDate: '2026-09-17'
        },
        {
          id: 'pm-pbl-3',
          title: 'Phase 3: Final Submission and Project Presentation',
          shortDesc: 'Complete project, final report doc, prototype demonstration & faculty presentation.',
          badge: 'Deadline: 10/10/2026',
          dueDate: '2026-10-10'
        }
      ],
      practical: []
    }
  },
  {
    code: 'SS',
    name: 'System Software',
    deliverables: {
      assignment: Array.from({ length: 5 }, (_, i) => ({
        id: `ss-asg-${i + 1}`,
        title: `Assignment ${i + 1}`,
        shortDesc: `Unit ${i + 1} lexical analysis, parsing & compilers assignment`
      })),
      ppt: [
        {
          id: 'ss-ppt-1',
          title: 'PPT Presentation',
          shortDesc: 'System Software topic presentation and slide deck'
        }
      ],
      report: [
        {
          id: 'ss-rep-1',
          title: 'Coursework Report',
          shortDesc: 'System Software theory & implementation report'
        }
      ],
      practical: Array.from({ length: 10 }, (_, i) => ({
        id: `ss-prac-${i + 1}`,
        title: `Practical ${i + 1}`,
        shortDesc: [
          'Lexical analyzer program',
          'Lexical Analyzer using lex utility for UNIX',
          'Left factor given grammar program',
          'Remove Left Recursion from grammar program',
          'Recursive Descendent Parsing implementation',
          'Predictive Parser implementation',
          'SAL program text file to generate SYMTAB and LITTAB',
          'Macro features of C language',
          'Quadruple Table generation for postfix String',
          'Predictive parsing of given grammar'
        ][i]
      })),
      pbl: []
    }
  },
  {
    code: 'MI',
    name: 'Microprocessor Interface',
    deliverables: {
      assignment: Array.from({ length: 2 }, (_, i) => ({
        id: `mi-asg-${i + 1}`,
        title: `Assignment ${i + 1}`,
        shortDesc: `Unit ${i + 1} microprocessor architecture & interface problems`
      })),
      ppt: [
        {
          id: 'mi-ppt-1',
          title: 'PPT Presentation',
          shortDesc: 'Microprocessor Interface topic presentation'
        }
      ],
      report: [
        {
          id: 'mi-rep-1',
          title: 'Lab / Subject Report',
          shortDesc: 'Microprocessor interface experiments and writeup'
        }
      ],
      practical: Array.from({ length: 12 }, (_, i) => ({
        id: `mi-prac-${i + 1}`,
        title: `Practical ${i + 1}`,
        shortDesc: `Experiment ${i + 1} assembly & peripheral interfacing`
      })),
      pbl: []
    }
  },
  {
    code: 'WAD',
    name: 'Web App Development',
    deliverables: {
      assignment: [],
      ppt: [],
      report: [],
      pbl: [],
      practical: Array.from({ length: 2 }, (_, i) => ({
        id: `wad-prac-${i + 1}`,
        title: `Practical ${i + 1}`,
        shortDesc: `Web application lab practical ${i + 1}`
      }))
    }
  },
  {
    code: 'PDS',
    name: 'Problem Data Structures',
    deliverables: {
      assignment: [],
      ppt: [],
      report: [
        {
          id: 'pds-rep-1',
          title: 'Project / Lab Report',
          shortDesc: 'Data structure problem-solving documentation and report'
        }
      ],
      pbl: [
        {
          id: 'pds-pbl-1',
          title: 'Mini Project',
          shortDesc: 'Data structures mini project implementation and source code'
        }
      ],
      practical: [
        ...Array.from({ length: 10 }, (_, i) => ({
          id: `pds-prac-${i + 1}`,
          title: `Practical ${i + 1}`,
          shortDesc: `Core experiment ${i + 1}`
        })),
        {
          id: 'pds-prac-11',
          title: 'Practical 11 (Extra)',
          shortDesc: 'Supplementary practical exercise 1'
        },
        {
          id: 'pds-prac-12',
          title: 'Practical 12 (Extra)',
          shortDesc: 'Supplementary practical exercise 2'
        }
      ]
    }
  }
];

const contentColumns = ['assignment', 'ppt', 'report', 'pbl', 'practical'];
const storageKey = 'semester-taskboard-v2';
const legacyKey = 'semester-taskboard-progress-v1';

// Active state: set of checked task IDs (e.g. Set of "cn-prac-1", "pm-pbl-1", etc.)
let checkedTaskIds = loadCheckedTasks();
let currentFilter = 'all'; // 'all', 'pending', 'complete'

/**
 * Generate Xerox print items for a subject
 */
function getXeroxItems(subject) {
  const items = [];
  ['assignment', 'ppt', 'report', 'pbl'].forEach((col) => {
    (subject.deliverables[col] || []).forEach((task) => {
      items.push({
        id: `xerox-${task.id}`,
        title: `Print: ${task.title}`,
        shortDesc: `Photocopy / print copy of ${subject.code} ${task.title}`
      });
    });
  });
  return items;
}

/**
 * Get all items for a given subject & column
 */
function getItems(subject, column) {
  if (column === 'xerox') {
    return getXeroxItems(subject);
  }
  return subject.deliverables[column] || [];
}

/**
 * Load progress from localStorage with migration from legacy format
 */
function loadCheckedTasks() {
  try {
    const savedV2 = localStorage.getItem(storageKey);
    if (savedV2) {
      const parsed = JSON.parse(savedV2);
      return new Set(Array.isArray(parsed) ? parsed : []);
    }

    // Try legacy migration if v2 doesn't exist
    const savedLegacy = localStorage.getItem(legacyKey);
    if (savedLegacy) {
      const legacyObj = JSON.parse(savedLegacy);
      const migrated = new Set();
      // Legacy was formatted as `${subjectIndex}-${column}`: count
      subjects.forEach((subject, sIdx) => {
        contentColumns.forEach((col) => {
          const count = legacyObj[`${sIdx}-${col}`];
          if (Number.isInteger(count) && count > 0) {
            const items = getItems(subject, col);
            for (let i = 0; i < Math.min(count, items.length); i++) {
              migrated.add(items[i].id);
            }
          }
        });
      });
      return migrated;
    }
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
  }
  return new Set();
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedTaskIds)));
  } catch (err) {
    console.error('Failed to save progress', err);
  }
}

/**
 * Get completion stats for a subject and column
 */
function getColStats(subject, column) {
  const items = getItems(subject, column);
  const total = items.length;
  if (total === 0) return { total: 0, completed: 0, percent: 0, isComplete: false };
  const completed = items.filter((item) => checkedTaskIds.has(item.id)).length;
  const percent = Math.round((completed / total) * 100);
  return {
    total,
    completed,
    percent,
    isComplete: completed === total
  };
}

/**
 * Build HTML for a single task grid cell
 */
function renderTaskCell(subject, subjectIndex, column) {
  const items = getItems(subject, column);
  const total = items.length;

  if (total === 0) {
    return `
      <div class="task-cell is-disabled" aria-disabled="true">
        <span class="task-count">—</span>
        <span class="task-status">Not needed</span>
      </div>
    `;
  }

  const completed = items.filter((item) => checkedTaskIds.has(item.id)).length;
  const isComplete = completed === total;
  const isStarted = completed > 0 && !isComplete;
  const percent = Math.round((completed / total) * 100);

  const statusClass = isComplete ? 'is-complete' : isStarted ? 'is-started' : '';
  const xeroxClass = column === 'xerox' ? 'xerox-cell' : '';

  // Render visual dots (max 12 dots shown)
  const dotsLimit = Math.min(total, 12);
  const dotsHtml = total > 0 ? `
    <span class="task-dots" aria-hidden="true">
      ${Array.from({ length: dotsLimit }, (_, idx) => {
        const isDone = idx < completed;
        return `<span class="task-dot ${isDone ? 'done' : ''}"></span>`;
      }).join('')}
    </span>
  ` : '';

  const label = isComplete ? 'Complete' : completed === 0 ? 'Not started' : `${percent}% done`;

  return `
    <div class="task-cell ${statusClass} ${xeroxClass}" 
         data-subject="${subjectIndex}" 
         data-column="${column}" 
         role="button" 
         tabindex="0"
         title="Click to view &amp; check tasks for ${subject.code} ${column}">
      <div class="cell-main-content">
        <span class="task-count">${completed} / ${total}</span>
        ${dotsHtml}
        <span class="task-status">${label}</span>
      </div>
      <button class="quick-check-btn ${isComplete ? 'is-checked' : ''}" 
              data-subject="${subjectIndex}" 
              data-column="${column}" 
              type="button" 
              title="${isComplete ? 'Click to reset all items in this cell' : 'Click to mark all items in this cell as DONE'}"
              aria-label="Quick toggle all items for ${subject.code} ${column}">
        ${isComplete ? '✓' : '+'}
      </button>
    </div>
  `;
}

/**
 * Filter evaluation for subjects
 */
function isSubjectVisible(subject) {
  if (currentFilter === 'all') return true;

  // Check coursework deliverables (excluding xerox)
  let totalWork = 0;
  let doneWork = 0;
  contentColumns.forEach((col) => {
    const stats = getColStats(subject, col);
    totalWork += stats.total;
    doneWork += stats.completed;
  });

  if (totalWork === 0) return true;
  const isAllComplete = doneWork === totalWork;

  if (currentFilter === 'complete') return isAllComplete;
  if (currentFilter === 'pending') return !isAllComplete;
  return true;
}

/**
 * Render the main grid
 */
function renderGrid() {
  const tbody = document.querySelector('#taskRows');
  if (!tbody) return;

  tbody.innerHTML = subjects.map((subject, subjectIndex) => {
    if (!isSubjectVisible(subject)) return '';

    // Calculate subject-level completion for row badge
    let sTotal = 0;
    let sDone = 0;
    contentColumns.forEach((col) => {
      const stats = getColStats(subject, col);
      sTotal += stats.total;
      sDone += stats.completed;
    });
    const sPercent = sTotal ? Math.round((sDone / sTotal) * 100) : 100;

    return `
      <tr class="${sPercent === 100 ? 'row-complete' : ''}">
        <th scope="row">
          <div class="subject-col-content">
            <span class="subject-code">${subject.code}</span>
            <span class="subject-name">${subject.name}</span>
            <div class="subject-progress-mini">
              <span class="mini-bar-fill" style="width: ${sPercent}%;"></span>
            </div>
          </div>
        </th>
        ${contentColumns.map((col) => `<td>${renderTaskCell(subject, subjectIndex, col)}</td>`).join('')}
        <td>${renderTaskCell(subject, subjectIndex, 'xerox')}</td>
      </tr>
    `;
  }).join('');

  attachCellEvents();
  updateSummary();
}

/**
 * Attach event listeners to cells and quick action buttons
 */
function attachCellEvents() {
  // Cell click opens checklist modal
  document.querySelectorAll('.task-cell:not(.is-disabled)').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      // If quick-check button was clicked, don't open modal
      if (e.target.closest('.quick-check-btn')) return;
      const sIdx = Number(cell.dataset.subject);
      const col = cell.dataset.column;
      openTaskModal(sIdx, col);
    });

    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sIdx = Number(cell.dataset.subject);
        const col = cell.dataset.column;
        openTaskModal(sIdx, col);
      }
    });
  });

  // Quick check button (1-click mark all done / clear)
  document.querySelectorAll('.quick-check-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sIdx = Number(btn.dataset.subject);
      const col = btn.dataset.column;
      toggleAllItemsInCell(sIdx, col);
    });
  });
}

/**
 * 1-click toggle all items in a cell
 */
function toggleAllItemsInCell(subjectIndex, column) {
  const subject = subjects[subjectIndex];
  const items = getItems(subject, column);
  if (!items.length) return;

  const allDone = items.every((item) => checkedTaskIds.has(item.id));

  if (allDone) {
    // Clear all
    items.forEach((item) => checkedTaskIds.delete(item.id));
  } else {
    // Mark all
    items.forEach((item) => checkedTaskIds.add(item.id));
  }

  saveProgress();
  renderGrid();
}

/**
 * Update the top progress bar and summary stats
 */
function updateSummary() {
  let totalItems = 0;
  let completedItems = 0;
  let totalXerox = 0;
  let completedXerox = 0;

  subjects.forEach((subject) => {
    contentColumns.forEach((col) => {
      const stats = getColStats(subject, col);
      totalItems += stats.total;
      completedItems += stats.completed;
    });

    const xStats = getColStats(subject, 'xerox');
    totalXerox += xStats.total;
    completedXerox += xStats.completed;
  });

  const percent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  const percentEl = document.querySelector('#overallPercent');
  const barEl = document.querySelector('#overallBar');
  const labelEl = document.querySelector('#overallLabel');
  const subjectCountEl = document.querySelector('#subjectCount');
  const doneCountEl = document.querySelector('#doneCount');
  const remainingCountEl = document.querySelector('#remainingCount');
  const xeroxDoneCountEl = document.querySelector('#xeroxDoneCount');
  const lastUpdatedEl = document.querySelector('#lastUpdated');

  if (percentEl) percentEl.textContent = `${percent}%`;
  if (barEl) barEl.style.width = `${percent}%`;
  if (labelEl) labelEl.textContent = `${completedItems} of ${totalItems} coursework items complete`;
  if (subjectCountEl) subjectCountEl.textContent = subjects.length;
  if (doneCountEl) doneCountEl.textContent = completedItems;
  if (remainingCountEl) remainingCountEl.textContent = Math.max(0, totalItems - completedItems);
  if (xeroxDoneCountEl) xeroxDoneCountEl.textContent = `${completedXerox} / ${totalXerox}`;

  if (lastUpdatedEl) {
    lastUpdatedEl.textContent = completedItems > 0 
      ? `Progress saved (${completedItems} done)` 
      : 'Ready to begin';
  }
}

// ============================================================================
// TASK CHECKLIST MODAL LOGIC
// ============================================================================

let currentModalContext = {
  subjectIndex: 0,
  column: ''
};

function openTaskModal(subjectIndex, column) {
  const subject = subjects[subjectIndex];
  const items = getItems(subject, column);
  if (!items.length) return;

  currentModalContext = { subjectIndex, column };

  const modal = document.querySelector('#taskModal');
  const codeEl = document.querySelector('#modalSubjectCode');
  const catEl = document.querySelector('#modalCategory');
  const nameEl = document.querySelector('#modalSubjectName');
  const guidelinesEl = document.querySelector('#modalGuidelines');
  const guidelinesBadge = document.querySelector('#modalGuidelinesBadge');
  const guidelinesText = document.querySelector('#modalGuidelinesText');

  codeEl.textContent = subject.code;
  catEl.textContent = column === 'xerox' ? 'Xerox / Prints' : column.toUpperCase();
  nameEl.textContent = subject.name;

  // Guidelines Banner for special subjects/deliverables
  let guidelineMessage = '';
  let guidelineBadgeText = 'Guideline';

  if (subject.code === 'CN' && column === 'pbl') {
    guidelineBadgeText = 'PBL Instructions';
    guidelineMessage = 'Select 1 topic from Activity 1 (Micro Project), Activity 2 (Smart City/Healthcare Design), Activity 3 (5G/Cybersecurity Research), or Activity 4 (Case Study). Obtain topic approval, then submit a printed report with your Practical File to Lab Faculty.';
  } else if (subject.code === 'PM' && column === 'pbl') {
    guidelineBadgeText = 'Project Deadlines';
    guidelineMessage = 'Phase 1 Proposal (10–15 pgs, Due 17/08/2026) • Phase 2 Execution (10–15 pgs, Due 17/09/2026) • Phase 3 Final Report & PPT (Due 10/10/2026).';
  } else if (subject.code === 'PDS' && column === 'pbl') {
    guidelineBadgeText = 'Mini Project';
    guidelineMessage = 'Complete implementation of data structures mini project and submit documentation report.';
  }

  if (guidelineMessage) {
    guidelinesBadge.textContent = guidelineBadgeText;
    guidelinesText.textContent = guidelineMessage;
    guidelinesEl.style.display = 'block';
  } else {
    guidelinesEl.style.display = 'none';
  }

  renderModalChecklist();

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeTaskModal() {
  const modal = document.querySelector('#taskModal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  renderGrid();
}

function renderModalChecklist() {
  const { subjectIndex, column } = currentModalContext;
  const subject = subjects[subjectIndex];
  const items = getItems(subject, column);
  const checklistContainer = document.querySelector('#modalChecklist');
  const countEl = document.querySelector('#modalProgressCount');
  const percentEl = document.querySelector('#modalProgressPercent');
  const fillEl = document.querySelector('#modalProgressFill');

  const total = items.length;
  const completed = items.filter((item) => checkedTaskIds.has(item.id)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  countEl.textContent = `${completed} of ${total} completed`;
  percentEl.textContent = `${percent}%`;
  fillEl.style.width = `${percent}%`;

  checklistContainer.innerHTML = items.map((item, idx) => {
    const isChecked = checkedTaskIds.has(item.id);
    const badgeHtml = item.badge ? `<span class="item-badge">${item.badge}</span>` : '';
    const descHtml = item.shortDesc ? `<p class="item-desc">${item.shortDesc}</p>` : '';
    const instHtml = item.instructions ? `<p class="item-instructions">📝 ${item.instructions}</p>` : '';

    return `
      <label class="checklist-item ${isChecked ? 'is-checked' : ''}" for="check-${item.id}">
        <input type="checkbox" id="check-${item.id}" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
        <div class="custom-checkbox" aria-hidden="true"></div>
        <div class="item-info">
          <div class="item-header-line">
            <span class="item-title">${item.title}</span>
            ${badgeHtml}
          </div>
          ${descHtml}
          ${instHtml}
        </div>
      </label>
    `;
  }).join('');

  // Attach change listeners to each checkbox
  checklistContainer.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const taskId = e.target.dataset.id;
      if (e.target.checked) {
        checkedTaskIds.add(taskId);
      } else {
        checkedTaskIds.delete(taskId);
      }
      saveProgress();
      renderModalChecklist();
      renderGrid();
    });
  });
}

// Modal Header / Action Buttons
document.querySelector('#modalCloseBtn').addEventListener('click', closeTaskModal);
document.querySelector('#modalDoneBtn').addEventListener('click', closeTaskModal);

// Close on backdrop click
document.querySelector('#taskModal').addEventListener('click', (e) => {
  if (e.target.id === 'taskModal') {
    closeTaskModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('#taskModal');
    if (modal.classList.contains('is-open')) {
      closeTaskModal();
    }
  }
});

// Modal Mark All Done
document.querySelector('#modalCheckAllBtn').addEventListener('click', () => {
  const { subjectIndex, column } = currentModalContext;
  const items = getItems(subjects[subjectIndex], column);
  items.forEach((item) => checkedTaskIds.add(item.id));
  saveProgress();
  renderModalChecklist();
  renderGrid();
});

// Modal Clear All
document.querySelector('#modalClearAllBtn').addEventListener('click', () => {
  const { subjectIndex, column } = currentModalContext;
  const items = getItems(subjects[subjectIndex], column);
  items.forEach((item) => checkedTaskIds.delete(item.id));
  saveProgress();
  renderModalChecklist();
  renderGrid();
});

// ============================================================================
// FILTER TABS (All / Pending / Complete)
// ============================================================================
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentFilter = btn.dataset.filter;
    renderGrid();
  });
});

// ============================================================================
// EXPORT & IMPORT BACKUP SYSTEM
// ============================================================================
const exportBtn = document.querySelector('#exportBtn');
const importBtn = document.querySelector('#importBtn');
const importFileInput = document.querySelector('#importFileInput');

exportBtn.addEventListener('click', () => {
  const backupData = {
    version: 2,
    exportedAt: new Date().toISOString(),
    completedCount: checkedTaskIds.size,
    checkedTaskIds: Array.from(checkedTaskIds)
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `semester-taskboard-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

importBtn.addEventListener('click', () => {
  importFileInput.click();
});

importFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.checkedTaskIds)) {
        checkedTaskIds = new Set(data.checkedTaskIds);
        saveProgress();
        renderGrid();
        alert(`Successfully restored progress! (${checkedTaskIds.size} items completed)`);
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file.');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // Reset input
});

// ============================================================================
// RESET PROGRESS
// ============================================================================
document.querySelector('#resetButton').addEventListener('click', () => {
  if (checkedTaskIds.size === 0 || window.confirm('Reset all completion progress back to zero?')) {
    checkedTaskIds.clear();
    localStorage.removeItem(storageKey);
    localStorage.removeItem(legacyKey);
    renderGrid();
  }
});

// Initialize
renderGrid();
