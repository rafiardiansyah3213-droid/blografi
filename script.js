// Simple script untuk mengisi posts, nav aktif, dan modal post
document.getElementById('year').textContent = new Date().getFullYear();

// contoh data post (kamu bisa ganti/isi sendiri)
const posts = [
  {
    id: 'post-1',
    title: 'Membuat Robot Avoider Sederhana',
    date: '2025-09-10',
    excerpt: 'Tutorial singkat membuat robot avoider pakai Arduino Uno dan sensor ultrasonik.',
    content: `<p>Ini adalah isi lengkap tutorial robot avoider. Langkah 1: siapkan komponen... </p><p>Langkah 2: coding...</p>`,
    cover: 'avoider.jpeg'
  },
  {
    id: 'post-2',
    title: 'Belajar ESP8266 untuk Smarthome',
    date: '2025-06-04',
    excerpt: 'Dasar koneksi Wi-Fi dan kontrol relay menggunakan ESP8266 (NodeMCU).',
    content: `<p>Konten smarthome: pin, wiring, dan contoh kode untuk mengontrol relay via HTTP.</p>`,
    cover: 'smart.jpeg'
  },
  {
    id: 'post-3',
    title: 'Catatan Belajar: Git & GitHub Untuk Siswa',
    date: '2025-04-12',
    excerpt: 'Panduan singkat Git untuk pemula — commit, branch, dan push ke GitHub.',
    content: `<p>Perintah dasar Git: git init, git add, git commit -m "..."</p>`,
    cover: 'git.png'
  }
];

// render posts
const postsGrid = document.getElementById('postsGrid');
posts.forEach(p => {
  const card = document.createElement('article');
  card.className = 'post-card card';
  card.innerHTML = `
    <img src="${p.cover}" alt="${p.title}">
    <div class="post-body">
      <h3>${p.title}</h3>
      <div class="muted">${p.date}</div>
      <p class="muted">${p.excerpt}</p>
      <div style="margin-top:8px">
        <button class="btn open-post" data-id="${p.id}">Baca</button>
      </div>
    </div>
  `;
  postsGrid.appendChild(card);
});

// modal logic
const modal = document.getElementById('postModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

document.addEventListener('click', (e) => {
  if (e.target.matches('.open-post')) {
    const id = e.target.dataset.id;
    const post = posts.find(x => x.id === id);
    if (post) {
      modalTitle.innerHTML = post.title;
      modalMeta.innerHTML = post.date;
      modalContent.innerHTML = post.content;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
});

// navbar active on scroll & click
const navLinks = document.querySelectorAll('.navlink');
const sections = document.querySelectorAll('main section, main > section');

navLinks.forEach(link => {
  link.addEventListener('click', (ev) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (pageYOffset >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});
