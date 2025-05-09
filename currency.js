let amt=document.querySelector(".amount");
let country=document.querySelectorAll(".selection");
const url="https://latest.currency-api.pages.dev/v1/currencies/";

let hasSubmit=false;
for(select of country){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        select.append(newoption);

        if (select.name==="from" && newoption.value==="USD") {
            newoption.selected="selected";
        }
        
        if(select.name==="to" && newoption.value==="INR"){
            newoption.selected="selected";
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
            if (hasSubmit) {
                document.querySelector(".result p").innerText = "Fetching the data...";
                updateResult();
            }
          });

          
     
    }
}




const updateFlag=(element)=>{
currcode=element.value;

countryCode=countryList[currcode];


flag=`https://flagsapi.com/${countryCode}/flat/64.png`;
img=element.parentElement.querySelector("img");
img.src=flag;
}


let res=document.querySelector(".convert");
         
          
res.addEventListener("click",(evt)=>{
  evt.preventDefault();
  hasSubmit = true;
  updateResult();
})


const updateResult= async ()=>{
    let from=document.querySelector(".from .select-container select");
    let to=document.querySelector(".to .select-container select");
    
    let res=document.querySelector(".result p");
    let amt=document.querySelector(".amount");
    if (amt.value==="" || amt.value<0) {
        amt.value=1;
    }
   
    
  
   const URL = `${url}/${from.value.toLowerCase()}.json`;


    let response=await fetch(URL);
   
    const data = await response.json();
    let currency = data[from.value.toLowerCase()];
    
    
    let finalValue=amt.value*currency[to.value.toLowerCase()];
    res.innerText=`${amt.value} ${from.value} :${finalValue} ${to.value}`;
    hasSubmit=true;

}

document.querySelector(".amount").addEventListener("input", () => {
    if (document.querySelector(".amount").value==='' || document.querySelector(".amount").value<0) {
        document.querySelector(".result p").innerText="1 USD : 83.7888 INR";
    }else{
        document.querySelector(".result p").innerText = "Submit to see result...";
    }
    
});


let arrowChnge=document.querySelector(".container i");

          arrowChnge.addEventListener("click",()=>{
            let from=document.querySelector(".from .select-container select");
            let to=document.querySelector(".to .select-container select");

           let a=from.value;
           from.value=to.value;
           to.value=a;
            updateFlag(from);
            updateFlag(to);


           if (hasSubmit) {
          
            document.querySelector(".result p").innerText="Submit to see result...";
            updateResult();
           }
          
          })


         







