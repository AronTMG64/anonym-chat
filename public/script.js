
fetchMessages();

async function fetchMessages() {
  const parent = document.querySelector('#parent');

  const res = await fetch('/api/messages');
  const data = await res.json();

  console.log(data);

  parent.innerHTML = data.map(item => `
    <div class="message ${item.location ? `flex-right` : `flex-left`}">
      <h1>${item.message}<h1>
      <h2>${item.time}</h2>
    </div>
  `).join('');
};

const form = document.querySelector('form');
const message = document.querySelector('input');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (message.value != '') {
    const a = new Date().getTime();
    const time = new Date(a);
    const data = { message: message.value, time };

    window.location.host === 'localhost:3000' ? data.location = 'localhost:3000' : null;

    fetch('/api/messages', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  message.value = '';
  fetchMessages();
});

setInterval(() => {
  fetchMessages();
}, 5000);
