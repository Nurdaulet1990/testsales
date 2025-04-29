const allowedUsers = ["admin", "student1", "student2"];

function generateCaptcha() {
  const canvas = document.getElementById('captchaCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(captcha, 10, 30);
  canvas.dataset.captcha = captcha;
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const captchaInput = document.getElementById('captcha').value;
  const captcha = document.getElementById('captchaCanvas').dataset.captcha;

  if (!allowedUsers.includes(username)) {
    document.getElementById('error').innerText = "用户名不存在";
    return;
  }

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const expectedPassword = username + day;

  if (password !== expectedPassword) {
    document.getElementById('error').innerText = "密码错误";
    return;
  }

  if (captchaInput.toUpperCase() !== captcha) {
    document.getElementById('error').innerText = "验证码错误";
    generateCaptcha();
    return;
  }

  localStorage.setItem("loggedInToday", "true");
  window.location.href = "course.html";
}

window.onload = generateCaptcha;
