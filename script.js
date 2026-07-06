const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));

const chatFab=document.getElementById('chatFab');
const chatbox=document.getElementById('chatbox');
const closeChat=document.getElementById('closeChat');
const chatMessages=document.getElementById('chatMessages');
const chatForm=document.getElementById('chatForm');
const chatInput=document.getElementById('chatInput');

chatFab.addEventListener('click',()=>chatbox.classList.add('open'));
closeChat.addEventListener('click',()=>chatbox.classList.remove('open'));

document.querySelectorAll('.quick-buttons button').forEach(btn=>{
  btn.addEventListener('click',()=>reply(btn.dataset.q));
});
chatForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=chatInput.value.trim();
  if(!text)return;
  addMsg(text,'user');
  chatInput.value='';
  reply(text);
});
function addMsg(text,type='bot'){
  const div=document.createElement('div');
  div.className=`msg ${type}`;
  div.innerHTML=text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}
function reply(q){
  const t=String(q).toLowerCase();
  let answer='Thanks for your message. For the fastest help, tap WhatsApp and our support team will assist you.';
  if(t.includes('price')||t.includes('pricing')) answer='Our plans are:<br>• 3 Months: $60<br>• 6 Months: $100<br>• 12 Months: $180<br><br>You can pay securely in the pricing section.';
  else if(t.includes('setup')) answer='Setup is easy. After payment, message us your device type on WhatsApp and we will guide you step by step.';
  else if(t.includes('renew')) answer='To renew, choose your plan again or message us on WhatsApp and say “renew my subscription”.';
  else if(t.includes('payment')) answer='Payments are done securely using the Stripe buttons on this website. After payment, please message us on WhatsApp.';
  else if(t.includes('support')||t.includes('contact')||t.includes('whatsapp')) answer='You can contact StreamlyTV Support on WhatsApp here:<br><a style="color:#14c8ff" href="https://wa.me/61410350514" target="_blank">Chat on WhatsApp</a>';
  setTimeout(()=>addMsg(answer,'bot'),450);
}
