const contracts = [
  {number:'ЦО-2026-021', org:'МБОУ «Гимназия № 7»', student:'Александра Соколова', direction:'Педагогическое образование', status:'Действует', tone:'active', date:'18 сен 2026'},
  {number:'ЦО-2026-020', org:'Лицей им. В. Даля', student:'Илья Ковалёв', direction:'Начальное образование', status:'На согласовании', tone:'pending', date:'16 сен 2026'},
  {number:'ЦО-2026-019', org:'МБОУ «Школа № 12»', student:'Екатерина Мельник', direction:'Дошкольное образование', status:'Действует', tone:'active', date:'12 сен 2026'},
  {number:'ЦО-2026-018', org:'МБОУ «Гимназия № 7»', student:'Михаил Воронов', direction:'История и обществознание', status:'На согласовании', tone:'pending', date:'09 сен 2026'},
  {number:'ЦО-2026-017', org:'Лицей им. В. Даля', student:'Полина Громова', direction:'Русский язык и литература', status:'Завершён', tone:'gray', date:'01 сен 2026'}
];

const row = (item) => `<tr><td>${item.number}</td><td>${item.org}</td><td>${item.student}</td><td>${item.direction}</td><td><span class="status ${item.tone}-status">${item.status}</span></td><td>${item.date}</td></tr>`;
const compactRow = (item) => `<tr><td>${item.number}</td><td>${item.org}</td><td>${item.student}</td><td><span class="status ${item.tone}-status">${item.status}</span></td><td>›</td></tr>`;
document.querySelector('#all-rows').innerHTML = contracts.map(row).join('');
document.querySelector('#recent-rows').innerHTML = contracts.slice(0,4).map(compactRow).join('');

const views = {dashboard:'Обзор', applications:'Заявки', workflow:'Механизм реализации', contracts:'Договоры', organizations:'Организации', students:'Обучающиеся', monitoring:'Мониторинг', regulations:'Нормативная база'};
function showView(name){
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.querySelector(`#${name}-view`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.view === name));
  document.querySelector('#breadcrumb-current').textContent = views[name];
  window.scrollTo({top:0, behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('[data-view-link]').forEach(button => button.addEventListener('click', () => showView(button.dataset.viewLink)));

const modal = document.querySelector('#modal');
const openModal = () => modal.classList.add('open');
const closeModal = () => modal.classList.remove('open');
document.querySelector('#open-create')?.addEventListener('click', openModal);
document.querySelector('#open-create-2').addEventListener('click', openModal);
document.querySelector('#close-modal').addEventListener('click', closeModal);
document.querySelector('#cancel-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if(event.target === modal) closeModal(); });
document.querySelector('#create-form').addEventListener('submit', (event) => {
  event.preventDefault(); closeModal(); event.target.reset();
  const toast = document.querySelector('#toast'); toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

document.querySelector('#contract-search').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('#all-rows tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(query) ? '' : 'none');
});

const applicationModal = document.querySelector('#application-modal');
const openApplication = () => applicationModal.classList.add('open');
const closeApplication = () => applicationModal.classList.remove('open');
document.querySelector('#open-application').addEventListener('click', openApplication);
document.querySelector('#open-application-2').addEventListener('click', openApplication);
document.querySelectorAll('.close-application').forEach(button => button.addEventListener('click', closeApplication));
applicationModal.addEventListener('click', (event) => { if(event.target === applicationModal) closeApplication(); });
document.querySelector('#application-form').addEventListener('submit', (event) => {
  event.preventDefault();
  closeApplication();
  event.target.reset();
  showToast('Заявка зарегистрирована и направлена на согласование в МОН ЛНР ✓');
});

function showToast(message){
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
}

document.querySelectorAll('.review-button').forEach(button => button.addEventListener('click', () => {
  if(button.classList.contains('publish-action')){
    button.textContent = 'Опубликовано';
    button.disabled = true;
    showToast('Предложение отмечено как опубликованное на ЕЦП «Работа в России» ✓');
    return;
  }
  showToast('Карточка заявки открыта для проверки комплекта документов');
}));

document.querySelector('#export-report').addEventListener('click', () => showToast('Отчёт по форме приложения № 1 подготовлен к выгрузке'));
document.querySelectorAll('[data-reg]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.reg)));
