const STORAGE_KEY = "syncscribe_state_v1";

let state = {
  folders: [],
  notes: [],
  activeFolderId: null,
  period: "today",
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
    return;
  }

  const now = new Date();
  const baseId = Date.now();

  state.folders = [
    { id: baseId, name: "Bucket List", code: "BL", createdAt: now, updatedAt: now },
    { id: baseId + 1, name: "Finances", code: "Fi", createdAt: now, updatedAt: now },
    { id: baseId + 2, name: "Travel Plans", code: "TP", createdAt: now, updatedAt: now },
  ];

  state.activeFolderId = baseId;

  state.notes = [
    {
      id: baseId + 100,
      title: "Reminders",
      lines: [
        "Dentist appointment on Tuesday",
        "Submit report by end of the day",
      ],
      folderId: baseId,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const sidebarFolderList = document.getElementById("sidebarFolderList");
const notesRow = document.getElementById("notesRow");
const recentFoldersRow = document.getElementById("recentFoldersRow");

function renderFolders() {
  sidebarFolderList.innerHTML = "";
  state.folders.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f.name;
    li.className = "folder-item" + (f.id === state.activeFolderId ? " active" : "");
    li.onclick = () => {
      state.activeFolderId = f.id;
      saveState();
      renderNotes();
      renderFolders();
    };
    sidebarFolderList.appendChild(li);
  });
}

function renderNotes() {
  notesRow.innerHTML = "";
  const notes = state.notes.filter(n => n.folderId === state.activeFolderId);

  notes.forEach((note, i) => {
    const card = document.createElement("div");
    card.className = `note-card color-${(i % 4) + 1}`;
    card.innerHTML = `
      <h4>${note.title}</h4>
      <ul>${note.lines.map(l => `<li>${l}</li>`).join("")}</ul>
    `;
    notesRow.appendChild(card);
  });
}

document.getElementById("createNoteBtn").onclick = () => {
  const title = prompt("Note title?");
  if (!title) return;

  state.notes.push({
    id: Date.now(),
    title,
    lines: [],
    folderId: state.activeFolderId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  saveState();
  renderNotes();
};

loadState();
renderFolders();
renderNotes();
