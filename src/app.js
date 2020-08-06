const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public/'))

const app=express()

//Define path for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views(templates) location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directo ry to serve
app.use(express.static(publicDirectory))

//route to root
app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Yash'
    })
})

//route to about.hbs
app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name:'Yash'
    })
})

//route to help.hbs
app.get('/help', (req, res)=>{
    res.render('help',{
        helpText:'help here',
        title:'Help',
        name:'Yash'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    // console.log(req.query.address)
     
        geocode(req.query.address, (error,data)=>{
            if(error){
                return res.send({ error })
            }    
            //    res.send({
            //                 data:{data},
            //                 address:req.query.address
            //             })
                    
                    
                forecast(req.query.address, (error, data) => {
                    if(error){
                        console.log('forecast')
                        return res.send({ error })
                    }
                    res.send({
                        forecast:{data},
                        address:req.query.address
                    })
                    
                })

            })
           
        
            
        })
    
    
    // res.send({  
    //     location:'INDIA',
    //     temp:27,
    //     address:req.query.address
    // })
// })



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must send a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yash',
        errorMessage:'Help article not found'
    })
})


// app.get('/help/*',(req,res)=>{
//     res.send('Help article not found')
// })


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yash',
        errorMessage:'Page not Found',
    })
})


// app.get('*',(req,res)=>{
//     res.send('Error 404')
// })


app.listen(3000,()=>{
    console.log('server is running')
})