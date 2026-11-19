const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const topLinks = document.getElementById('topLinks');

menuButton.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  topLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

const accountDialog = document.getElementById('accountDialog');
document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const signup = link.dataset.modal === 'signup';
    document.getElementById('modalTitle').textContent = signup ? 'Create your account' : 'Welcome back';
    document.getElementById('modalDescription').textContent = signup
      ? 'Sign up and start your wellbeing journey.'
      : 'Log in to access your membership.';
    accountDialog.showModal();
  });
});

document.getElementById('accountButton').addEventListener('click', () => accountDialog.showModal());
document.getElementById('accountForm').addEventListener('submit', event => {
  event.preventDefault();
  alert('This is a demo form. Connect a secure authentication service to enable real accounts.');
  accountDialog.close();
  event.target.reset();
});

document.getElementById('chatButton').addEventListener('click', () => {
  document.getElementById('chatDialog').showModal();
});

document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const term = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!term) return;
  const candidates = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a')];
  const result = candidates.find(node => node.textContent.toLowerCase().includes(term));
  if (result) {
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    result.focus?.({ preventScroll: true });
  } else {
    alert('No matching content found. Try a different search.');
  }
});

let displayedDate = new Date();
const monthYear = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function drawCalendar() {
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  monthYear.textContent = displayedDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  calendarDays.replaceChildren();

  weekDays.forEach(name => {
    const label = document.createElement('span');
    label.className = 'day-name';
    label.textContent = name;
    calendarDays.appendChild(label);
  });

  const offset = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < offset; i++) calendarDays.appendChild(document.createElement('span'));

  const now = new Date();
  for (let date = 1; date <= count; date++) {
    const cell = document.createElement('span');
    cell.textContent = date;
    if (date === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
      cell.className = 'today';
      cell.setAttribute('aria-current', 'date');
    }
    calendarDays.appendChild(cell);
  }
}
document.getElementById('previousMonth').addEventListener('click', () => {
  displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1);
  drawCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1);
  drawCalendar();
});

document.getElementById('year').textContent = new Date().getFullYear();
drawCalendar();
