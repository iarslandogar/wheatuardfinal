import { Component ,ViewChild} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import {IonSlides } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Platform} from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  //weather stuff
  bgImage: string;
  weatherobj:any=null;
  temperatureobj:any=null;
  place:string="";
  type:string="";
  icon:string="";
  temperature:string="";
  //slider stuff
  @ViewChild('slideWithNav') slideWithNav: IonSlides;
  @ViewChild('slideWithNav2') slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3') slideWithNav3: IonSlides;
  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
//Configuration for each Slider
slideOptsOne = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay:true
};


  //camera stuff
  image:any=''
  file:any=''
  constructor(public http:HTTP ,private camera: Camera,private transfer: FileTransfer,
    public loadingController: LoadingController,public plt:Platform,public httpClient:HttpClient, public geoLocation:Geolocation){
     
     
      //Location activation

      this.plt.ready().then(()=>{
        this.GetCurrentLocation();
      });


      //Item object for Diseases slider
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1,
          image: '../../assets/Slider/1.jpg',
          text:'Yellow Rust'
        },
        {
          id: 2,
          image: '../../assets/Slider/2.jpg'
        },
        {
          id: 3,
          image: '../../assets/Slider/3.jpg'
        },
        {
          id: 4,
          image: '../../assets/Slider/4.jpg'
        },
        {
          id: 5,
          image: '../../assets/Slider/5.jpg'
        }, {
          id: 6,
          image: '../../assets/Slider/6.jpg'
        },{
          id:7 ,
          image: '../../assets/Slider/7.jpg'
        },{
          id:8 ,
          image: '../../assets/Slider/8.jpg'
          
        },{
          id:9 ,
          image: '../../assets/Slider/9.jpg'
        },{
          id:10 ,
          image: '../../assets/Slider/10.jpg'
        },{
          id:11 ,
          image: '../../assets/Slider/11.jpg'
        },{
          id:12 ,
          image: '../../assets/Slider/12.jpg'
        },
        
      ]
    };
//end here
  }
//constructor end


//Weather Functions
GetCurrentLocation(){
  this.geoLocation.getCurrentPosition().then((position)=>{
    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;
    this.GetCurrentTemperature(latitude,longitude);
  })

}
GetCurrentTemperature(latitude,longitude){
let url ='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+"&lon="+longitude+"&APPID=70a45d8ce9875c7f42b7f9fe4aa124b0";
console.log("1")
this.http.get(url, {}, {})
  .then(weather => {
    this.weatherobj=JSON.parse(weather.data);
this.temperatureobj= ((parseFloat(this.weatherobj.main.temp)-273.15).toFixed(2)).toString()+"°C"

this.icon="http://openweathermap.org/img/w/"+this.weatherobj[0].icon+".png"
    
    console.log(weather); // data sent by Api
   console.log(this.weatherobj.weather[0].main)
  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
}


windDirection = (deg) => {
  if (deg > 11.25 && deg < 33.75){
    return "NNE";
  }else if (deg > 33.75 && deg < 56.25){
    return "ENE";
  }else if (deg > 56.25 && deg < 78.75){
    return "E";
  }else if (deg > 78.75 && deg < 101.25){
    return "ESE";
  }else if (deg > 101.25 && deg < 123.75){
    return "ESE";
  }else if (deg > 123.75 && deg < 146.25){
    return "SE";
  }else if (deg > 146.25 && deg < 168.75){
    return "SSE";
  }else if (deg > 168.75 && deg < 191.25){
    return "S";
  }else if (deg > 191.25 && deg < 213.75){
    return "SSW";
  }else if (deg > 213.75 && deg < 236.25){
    return "SW";
  }else if (deg > 236.25 && deg < 258.75){
    return "WSW";
  }else if (deg > 258.75 && deg < 281.25){
    return "W";
  }else if (deg > 281.25 && deg < 303.75){
    return "WNW";
  }else if (deg > 303.75 && deg < 326.25){
    return "NW";
  }else if (deg > 326.25 && deg < 348.75){
    return "NNW";
  }else{
    return "N"; 
  }
}


BgImage = (val) => {
  //let val = this.navParams.get("weatherInfo")
  if(val == "Rain"){
    return './assets/imgs/rain.jpg';
  } else if(val == "Clear"){
    return './assets/imgs/clear.jpg';
  } else if(val == "Clouds"){
    return './assets/imgs/clouds.jpg';
  } else if(val == "Drizzle"){
    return './assets/imgs/drizzle.jpg';
  } else if(val == "Snow"){
    return './assets/imgs/snow.jpg';
  } else if(val == "ThunderStorm"){
    return './assets/imgs/thunder.jpg';
  } else {
    return './assets/imgs/clear.jpg';
  }
}
GetDay = (time: number) => {
  let day = new Date(time*1000).toISOString();
  let d = new Date(day);
  let weekday = [];
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tues";
  weekday[3] = "Wed";
  weekday[4] = "Thurs";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let n = weekday[d.getDay()];
  return n;
}

//Slider Functions
    //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }//end
 
  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }//end
 
  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }//end
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }//end
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }//end
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }//end

  //Camera Upload Function 
 async openCam(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    
    this.camera.getPicture(options).then(async (file) => {
    //  imageData is either a base64 encoded string or a file URI
    //  If it's base64 (DATA_URL):
    //  alert(imageData)
     this.file=file
     
     this.image=(<any>window).Ionic.WebView.convertFileSrc(file);
     
     const loading = await this.loadingController.create({
      message: 'Uploading...',
      });
    await loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      fileKey: "file",
      fileName: 'name.jpg',
      chunkedMode:false
    
    }

    console.error("terror: 1st");

fileTransfer.upload(this.file, 'http://wheatguard.herokuapp.com', options1)
 .then((data) => {
   // success
   console.error("terror: 2nd"+this.file+" "+options1);
   loading.dismiss()
   console.error("terror: 3rd");

   alert("success");
   alert(data.response);
 }, (err) => {
  loading.dismiss()

  console.error("terror: 4th");

   // error
   alert("error"+JSON.stringify(err));
 });
    }, (err) => {
      
     // Handle error
     alert("error "+JSON.stringify(err))
    });

  }
  //End


  // Gallery Upload Function
async gallery(){
const options: CameraOptions = {
         quality: 100,
         destinationType: this.camera.DestinationType.FILE_URI,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
       }
   
       this.camera.getPicture(options).then(async (file) => {
        //  imageData is either a base64 encoded string or a file URI
        //  If it's base64 (DATA_URL):
        //  alert(imageData)
         this.file=file
         
         this.image=(<any>window).Ionic.WebView.convertFileSrc(file);
         
         const loading = await this.loadingController.create({
          message: 'Uploading...',
          });
        await loading.present();
    
        const fileTransfer: FileTransferObject = this.transfer.create();
    
        let options1: FileUploadOptions = {
          fileKey: "file",
          fileName: 'name.jpg',
          chunkedMode:false
        
        }
    
        console.error("terror: 1st");
    
    fileTransfer.upload(this.file, 'http://wheatguard.herokuapp.com', options1)
     .then((data) => {
       // success
       console.error("terror: 2nd"+this.file+" "+options1);
       loading.dismiss()
       console.error("terror: 3rd");
    
       alert("success");
       alert(data.response);
     }, (err) => {
      loading.dismiss()
    
      console.error("terror: 4th");
    
       // error
       alert("error"+JSON.stringify(err));
     });
        }, (err) => {
          
         // Handle error
         alert("error "+JSON.stringify(err))
        });
    
      }
      //End

  async upload()
  {
    const loading = await this.loadingController.create({
      message: 'Uploading...',
      });
    await loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      fileKey: "file",
      fileName: 'name.jpg',
      chunkedMode:false
    
    }

    console.error("terror: 1st");

fileTransfer.upload(this.file, 'http://wheatguard.herokuapp.com', options1)
 .then((data) => {
   // success
   console.error("terror: 2nd"+this.file+" "+options1);
   loading.dismiss()
   console.error("terror: 3rd");

   alert("success");
   alert(data.response);
 }, (err) => {
  console.error("terror: 4th");

   // error
   alert("error"+JSON.stringify(err));
 });
  }


  

}