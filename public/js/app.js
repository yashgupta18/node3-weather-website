const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    // console.log(location)
    messageOne.textContent='Loading'
    messageTwo.textContent=''
    

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            messageOne.textContent=`${data.error}`
        }else{
        // console.log(data)
        // console.log(data.address)
        // console.log(data.forecast.data.temp)
        messageOne.textContent=`Location= ${data.address}`
        messageTwo.textContent=`Temp= ${data.forecast.data.temp}`
        }
        
    })
})
    
})

