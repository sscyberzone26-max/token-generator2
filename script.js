// ==========================================
// SS CYBER ZONE - Smart Token System
// ==========================================

const API_URL = "https://script.google.com/macros/s/AKfycbx61qJKVrR7ZsdGeqxVb90CDEgGjKWuCwiw4dlKW3X9ipXKnQg2g0vM7v6RoRmGl-2ZAg/exec";

const tableBody = document.getElementById("tableBody");
const totalToken = document.getElementById("totalToken");
const searchBox = document.getElementById("search");

let allData = [];

// ======================
// LIVE DATE & TIME
// ======================

function updateClock() {

    const now = new Date();

    const date = now.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-US");

    document.getElementById("date").innerHTML = "📅 " + date;
    document.getElementById("time").innerHTML = "🕒 " + time;

}

updateClock();
setInterval(updateClock,1000);


// ======================
// STATUS BADGE
// ======================

function badge(status){

    status=(status||"").trim().toLowerCase();

    if(status=="all pass")
        return '<span class="status completed">🟢 All Pass</span>';

    if(status=="processing")
        return '<span class="status processing">🟡 Processing</span>';

    if(status=="pending")
        return '<span class="status pending">🔴 Pending</span>';

    if(status=="waiting")
        return '<span class="status waiting">🔵 Waiting</span>';

    return '<span class="status waiting">⚪ Waiting</span>';

}



// ======================
// SHOW TABLE
// ======================

function showTable(data){

tableBody.innerHTML="";

totalToken.innerHTML=data.length;

if(data.length==0){

tableBody.innerHTML=`

<tr>

<td colspan="3">

No Data Found

</td>

</tr>

`;

return;

}

data.forEach(item=>{

tableBody.innerHTML+=`

<tr>

<td>

${item.Token || ""}

</td>

<td>

${item.Name || ""}

</td>

<td>

${badge(item["Our Status"])}

</td>

</tr>

`;

});

}



// ======================
// LOAD DATA
// ======================

async function loadData(){

try{

const response=await fetch(API_URL);

const json=await response.json();

allData=json;

showTable(allData);

}catch(e){

console.log(e);

tableBody.innerHTML=`

<tr>

<td colspan="3">

❌ Google Sheet Connection Failed

</td>

</tr>

`;

}

}

loadData();

setInterval(loadData,3000);


// ======================
// SEARCH
// ======================

searchBox.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const filtered=allData.filter(row=>{

return(

String(row.Token).toLowerCase().includes(value)

||

String(row.Name).toLowerCase().includes(value)

||

String(row["Our Status"]).toLowerCase().includes(value)

);

});

showTable(filtered);

});



// ======================
// QR POPUP
// ======================

const modal=document.getElementById("qrModal");

document.getElementById("showQR").onclick=function(){

modal.style.display="flex";

}

document.getElementById("closeQR").onclick=function(){

modal.style.display="none";

}

window.onclick=function(e){

if(e.target==modal){

modal.style.display="none";

}

}