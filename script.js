const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
const chatFab=document.getElementById('chatFab');
const chatbox=document.getElementById('chatbox');
const closeChat=document.getElementById('closeChat');
const chatMessages=document.getElementById('chatMessages');
const chatForm=document.getElementById('chatForm');
const chatInput=document.getElementById('chatInput');

menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
chatFab?.addEventListener('click',()=>chatbox.classList.add('open'));
closeChat?.addEventListener('click',()=>chatbox.classList.remove('open'));

document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const answers={
  pricing:'Our plans are: 3 months $60, 6 months $100, and 12 months $180. Tap Plans & Pricing to pay securely.',
  setup:'Go to the Setup Centre and choose your device. If you need help, message StreamlyTV Support on WhatsApp.',
  renew:'To renew, choose your plan again in Pricing, pay securely, then message us your payment confirmation.',
  payment:'Payments are handled through Stripe. After payment, send your details to StreamlyTV Support on WhatsApp.',
  activate:'After payment, send your name, plan, device type and MAC address or device ID to StreamlyTV Support.',
  contact:'You can contact StreamlyTV Support using the WhatsApp button on this website.',
  troubleshooting:'Try restarting your app/device, checking your internet, refreshing the playlist, then message support if it still does not work.'
};

function addMsg(text,type='bot'){
  const div=document.createElement('div');
  div.className=`msg ${type}`;
  div.innerHTML=text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}
function botReply(key){
  const typing=document.createElement('div');
  typing.className='typing';
  typing.textContent='StreamlyTV Support is typing...';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop=chatMessages.scrollHeight;
  setTimeout(()=>{typing.remove();addMsg(answers[key]||'Thanks for your message. For the fastest help, please contact StreamlyTV Support on WhatsApp: <a style="color:#9fe7ff" href="https://wa.me/61410350514" target="_blank">message us here</a>.');},550);
}

document.querySelectorAll('.quick-buttons button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const key=btn.dataset.q;
    addMsg(btn.textContent,'user');
    botReply(key);
  });
});
chatForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const text=chatInput.value.trim();
  if(!text)return;
  addMsg(text,'user');
  chatInput.value='';
  const lower=text.toLowerCase();
  let key='contact';
  if(lower.includes('price')||lower.includes('plan')||lower.includes('cost'))key='pricing';
  if(lower.includes('setup')||lower.includes('install')||lower.includes('firestick')||lower.includes('tv'))key='setup';
  if(lower.includes('renew'))key='renew';
  if(lower.includes('pay')||lower.includes('stripe'))key='payment';
  if(lower.includes('mac')||lower.includes('activate'))key='activate';
  if(lower.includes('not working')||lower.includes('buffer')||lower.includes('problem'))key='troubleshooting';
  botReply(key);
});
