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

const whatsapp='https://wa.me/61410350514';
const answers={
  pricing:'Our plans are <b>3 months $60</b>, <b>6 months $100</b>, and <b>12 months $180</b>. The 6 month plan is popular for value. Tap <b>Plans & Pricing</b> to pay securely through Stripe.',
  setup:'Choose your device in the <b>Setup Centre</b>. We support Firestick, Android TV, Google TV, Samsung, LG, Apple devices, phones, Windows and Mac. After payment, send your device details to StreamlyTV Support.',
  renew:'To renew, choose a plan again in <b>Pricing</b>, pay securely, then message StreamlyTV Support with your name and receipt so we can update your service.',
  payment:'Payments are handled securely through Stripe. After payment, keep your receipt and send your activation details to StreamlyTV Support.',
  activate:'After payment, send your <b>name</b>, <b>plan</b>, <b>device type</b>, and <b>MAC address or device ID</b> if your app requires it.',
  contact:'For fastest help, message StreamlyTV Support on WhatsApp: <a style="color:#9fe7ff" href="'+whatsapp+'" target="_blank">message support</a>.',
  troubleshooting:'Try these steps first: restart the app, restart the device, check internet, refresh the playlist, and make sure your subscription is active. If it still does not work, message WhatsApp support.',
  recommendation:'If you are new, choose <b>3 months</b>. For better value, choose <b>6 months</b>. For the best long-term price, choose <b>12 months</b>.',
  player:'The <b>StreamlyTV Player</b> section helps customers install on Firestick, Android TV, Google TV, mobile, tablets, Windows and Mac. Tap <b>Request Player Setup</b> if you need the right option for your device.',
  mac:'A MAC address or device ID is a unique code from your IPTV player app. Open your player app and look for Device ID, MAC ID, or Activation ID, then send it to support.'
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
  setTimeout(()=>{typing.remove();addMsg(answers[key]||answers.contact);},550);
}
function detectKey(text){
  const lower=text.toLowerCase();
  if(lower.includes('which')&&lower.includes('plan')||lower.includes('best plan')||lower.includes('recommend'))return 'recommendation';
  if(lower.includes('mac')||lower.includes('device id')||lower.includes('activation id'))return 'mac';
  if(lower.includes('price')||lower.includes('plan')||lower.includes('cost')||lower.includes('month'))return 'pricing';
  if(lower.includes('player')||lower.includes('apk')||lower.includes('download'))return 'player';
  if(lower.includes('setup')||lower.includes('install')||lower.includes('firestick')||lower.includes('samsung')||lower.includes('lg')||lower.includes('android')||lower.includes('apple'))return 'setup';
  if(lower.includes('renew')||lower.includes('expire'))return 'renew';
  if(lower.includes('pay')||lower.includes('stripe')||lower.includes('receipt'))return 'payment';
  if(lower.includes('activate')||lower.includes('paid'))return 'activate';
  if(lower.includes('not working')||lower.includes('buffer')||lower.includes('loading')||lower.includes('problem')||lower.includes('login'))return 'troubleshooting';
  return 'contact';
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
  botReply(detectKey(text));
});
