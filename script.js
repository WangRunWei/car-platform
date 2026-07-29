/**
 * 驰远汽车官网 - 前端交互脚本
 * 功能：导航栏切换、滚动动画、移动端菜单、表单提交、Toast提示等
 */

// ========== DOM元素 ==========
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const allNavLinks = document.querySelectorAll('.nav-links a, .footer-links a');
const reveals = document.querySelectorAll('.reveal');
const navLogo = document.querySelector('.nav-logo');

// ========== Logo点击回到顶部 ==========
navLogo.addEventListener('click', () => {
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

// ========== 导航栏滚动样式 ==========
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('show', window.scrollY > 600);
  updateActiveNav();
});

// ========== 汉堡菜单 ==========
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// 点击导航链接后关闭移动端菜单
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========== 平滑滚动导航 + 激活状态 ==========
allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const sectionId = link.getAttribute('data-section');
    const target = document.getElementById(sectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 滚动时更新导航激活状态
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = 'hero';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 150) current = sec.id;
  });
  allNavLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    link.classList.toggle('active', sectionId === current);
  });
}

// ========== 滚动入场动画 (IntersectionObserver) ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ========== 返回顶部 ==========
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== 联系我们表单提交 ==========
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // 模拟提交成功
  showToast('提交成功！我们的顾问将在24小时内联系您。');
  contactForm.reset();
});

// ========== Toast提示 ==========
function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ========== 车型卡片点击展开详情（模拟） ==========
document.querySelectorAll('.model-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.btn-primary') && !e.target.closest('.btn-outline')) {
      const name = this.querySelector('.model-name').textContent;
      const price = this.querySelector('.model-price').textContent;
      showToast(`您选择了 ${name}，起售价 ${price}`);
    }
  });
});

// ========== 键盘导航支持 ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ========== 初始化：检查页面加载时的hash ==========
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
  }
}
