// Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
//  Create an express app and set the port number.
const app = express();
const port=3000;

//  Use the public folder for static files.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// main page access
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

//declaring variables
let result1='';
let result2='';
let locationvalues={};
// --------------------------------------------------functions -------------------------------------------->
//for ipaddress function
async function ipaddress (){
try {
        const response= await axios.get("https://api.ipify.org");
         result1 =response.data;
        console.log(result1+" from ipaddress function");
        return result1;
        
    } catch (error) {
        console.log(error.message);
        result1 = error.message;
        return result1;
    }
}
//for location function

async function location(result1){
    // ipaddress();
   try {
        const response= await axios.get(`http://ip-api.com/json/${result1}`);
         result2 = response.data;
         locationvalues={
            country:result2.country,
            province:result2.regionName,
            city:result2.city,
            zip:result2.zip,
            latitude:result2.lat,
            longitude:result2.lon,
            timezone:result2.timezone
        }
        console.log(locationvalues.country+" from location function");
        return locationvalues;
       
    } catch (error) {
        console.log(error.message);
        locationvalues= error.message;
        return locationvalues;
    }
}

// --------------------------------------------------requests -------------------------------------------->

//request for ipaddress
app.get("/ipaddress",async(req,res)=>{
    ipaddress();
    res.render("ipaddress.ejs",{
            ipaddress:result1
        })
    
})

//request for location
app.get("/location",async(req,res)=>{
ipaddress();
 location(result1);
res.render("location.ejs",{locationvalues: locationvalues})
})


app.get("/customLocation",(req,res)=>{
    const customip=req.body.customIp;
    console.log("from customlocation");
    location(customip);
    res.render("location.ejs",{
        locationvalues2 : locationvalues
    })
})

app.get("/home",(req,res)=>{
    res.render("index.ejs")
})


//Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  