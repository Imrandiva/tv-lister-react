import { filledInputClasses } from '@mui/material';
import React, { useState, useEffect } from 'react'
import XMLParser from 'react-xml-parser';
import Moment from 'react-moment'
import xml_data from './xml-data';
import FavouritesCard from './card';


function Api() {
 
  const [data, setData] = useState(null)
  const [skyMain, setskyMain] = useState(null)
  const [skyLogo, setSkyLogo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [xmlData, setXmlData] = useState(null);
  var skyMainEvent = [];
  var channelLogo = [];
  
  
   useEffect(() => {

    // const xml = new XMLParser().parseFromString(xml_data);

    // Parse data from url
    fetch('https://iptv-org.github.io/epg/guides/en/sky.com.xml')
      .then(response => response.text())
      .then(text => {

        const xml = new XMLParser().parseFromString(text, 'application/xml');
    setData(xml);

    console.log(xml)
    const dataLength = xml.children.length
    const today = new Date();
    const currentTime = today.getHours() + ":" + today.getMinutes()
    var currentMonth = today.getMonth() + 1
    if (currentMonth < 10) {
      currentMonth = '0' + currentMonth 
    }
    const currentDate = today.getFullYear() + "-" + currentMonth + "-" + today.getDate()
    
    for (let i = 0; i < 261; i++) {

        if (xml.children[i].attributes.id == "SkySportsMainEvent.uk") {
         

            channelLogo.push(xml.children[i].children[1].attributes.src)
            //  console.log(xml.children[i].children[1].attributes.src)
             console.log(channelLogo)
        }
    }

    for (let i=261; i < dataLength; i++) {
      if (xml.children[i].attributes.channel == "SkySportsMainEvent.uk") {
        // console.log(xml.children[i].attributes.channel)  
        var show_time = xml.children[i].attributes.start.substr(8,2) + ":" + xml.children[i].attributes.start.substr(10,2)
        var show_date = xml.children[i].attributes.start.substr(0,4) + "-" + xml.children[i].attributes.start.substr(4,2) + "-" + xml.children[i].attributes.start.substr(6,2)
        // console.log(show_date)
        if ( show_date > currentDate) {
          skyMainEvent.push(xml.children[i]);
          continue;
        }


        if (show_time >= currentTime) {
          if (xml.children[i-1] != null) {
            skyMainEvent.push(xml.children[i-1]);
          }
          skyMainEvent.push(xml.children[i]);
        }
        // console.log(xml.children[i].attributes.start.substr(8,2) + xml.children[i].attributes.start.substr(10,2))
       
        // if (xml.children[i].children.length == 3) {
        //   console.log(xml.children[i].children[2].attributes.src)
        // }
      }
      setLoading(false)
    }

    setData(xml)
    setSkyLogo(channelLogo)
    setskyMain(skyMainEvent)
  })

  }, [])

    if (loading) return "Loading...";

    if (error) return "Error!";

    return (
      <div className="users">
       <h1>TV Tablå</h1>
       <img  src={skyLogo[0]} alt="fireSpot"/>
      {skyMain.map((user) => (
        <div className="user">
          <FavouritesCard info={user} ></FavouritesCard>
        </div>
        
      ))}

    </div>
   
    )
}

export default Api