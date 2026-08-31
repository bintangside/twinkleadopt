const prayerTimes = [
  ["Subuh","04:52"],["Dzuhur","12:08"],["Ashar","15:22"],["Maghrib","18:08"],["Isya","19:18"]
];

function updateClock(){
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("id-ID",{hour12:false});
  document.getElementById("gregorianDate").textContent = now.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  let next = prayerTimes.find(p => {
    const [h,m] = p[1].split(":").map(Number);
    return h*60+m > now.getHours()*60+now.getMinutes();
  });
  if(!next) next = prayerTimes[0];
  let [h,m] = next[1].split(":").map(Number);
  let target = new Date(now); target.setHours(h,m,0,0);
  if(target <= now) target.setDate(target.getDate()+1);
  const diff = target-now;
  const hh = String(Math.floor(diff/3600000)).padStart(2,"0");
  const mm = String(Math.floor(diff%3600000/60000)).padStart(2,"0");
  const ss = String(Math.floor(diff%60000/1000)).padStart(2,"0");
  document.getElementById("nextPrayer").innerHTML = `Menuju ${next[0]} • <b>${hh}:${mm}:${ss}</b>`;
}
setInterval(updateClock,1000); updateClock();

function showPanel(type){
  const panel=document.getElementById("panel"), title=document.getElementById("panelTitle"), content=document.getElementById("panelContent");
  panel.classList.add("show");
  if(type==="jadwal"){
    title.textContent="Jadwal Shalat Hari Ini";
    content.innerHTML=prayerTimes.map(p=>`<div class="panel-row"><span>${p[0]}</span><strong>${p[1]} WIB</strong></div>`).join("");
  } else {
    title.textContent="Pengumuman Masjid";
    content.innerHTML=`
      <div class="panel-row"><span>Kajian rutin</span><strong>Ahad • ba'da Maghrib</strong></div>
      <div class="panel-row"><span>Kajian Remaja</span><strong>5 September • 19.30</strong></div>
      <div class="panel-row"><span>Kerja bakti</span><strong>7 September • 07.00</strong></div>
      <p style="color:#71837d;font-size:12px;line-height:1.7;margin-top:18px">Terima kasih telah ikut menjaga kebersihan, ketenangan, dan kenyamanan masjid.</p>`;
  }
}
function closePanel(){document.getElementById("panel").classList.remove("show")}
document.getElementById("panel").addEventListener("click",e=>{if(e.target.id==="panel")closePanel()});
