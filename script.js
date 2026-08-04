// ==============================
// SS CYBER ZONE
// Smart Token System
// ==============================

// ---------- API URL ----------
const API_URL =
"https://script.google.com/macros/s/AKfycbx61qJKVrR7ZsdGeqxVb90CDEgGjKWuCwiw4dlKW3X9ipXKnQg2g0vM7v6RoRmGl-2ZAg/exec";

// ---------- Live Date & Time ----------

function updateClock(){

const now=new Date();

const optionsDate={
weekday:"short",
day:"2-digit",
month:"short",
year:"numeric"
};

document.getElementById("date").innerHTML=
"📅 "+now.toLocaleDateString("en-GB",optionsDate);

document.getElementById("time").innerHTML=
"🕒 "+now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);

// ---------- Load Google Sheet Data ----------

async function loadData(){

try{

const response=await fetch(API_URL);

const data=await response.json();

const table=document.getElementById("tableBody");

table.innerHTML="";

if(data.length===0){

table.innerHTML=
`
<tr>

<td colspan="3">

No Data Found

</td>

</tr>
`;

return;

}

data.forEach(row=>{

let status=row["Our Status"]||"";

let color="#ffffff";

if(status.toLowerCase().includes("waiting"))
color="#00bfff";

if(status.toLowerCase().includes("processing"))
color="#ff9800";

if(status.toLowerCase().includes("all pass"))
color="#00ff66";

if(status.toLowerCase().includes("completed"))
color="#00ff66";

if(status.toLowerCase().includes("pending"))
color="#ff3b3b";

table.innerHTML+=`

<tr>

<td>${row.Token||""}</td>

<td>${row.Name||""}</td>

<td style="color:${color};font-weight:bold;">

${status}

</td>

</tr>

`;

});

}catch(e){

document.getElementById("tableBody").innerHTML=

`

<tr>

<td colspan="3">

Failed to Connect Google Sheet

</td>

</tr>

`;

console.log(e);

}

}

loadData();

setInterval(loadData,5000);

// ---------- QR Popup ----------

const modal=document.getElementById("qrModal");

document.getElementById("showQR").onclick=function(){

modal.style.display="flex";

}

document.getElementById("closeQR").onclick=function(){

modal.style.display="none";

}

window.onclick=function(event){

if(event.target==modal){

modal.style.display="none";

}

}