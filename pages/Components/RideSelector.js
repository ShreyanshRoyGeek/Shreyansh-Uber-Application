import React , { useState, useEffect } from 'react'
import tw from 'tailwind-styled-components'
import { carList } from '../data/carList'

function RideSelector({ pickupCoordinates, dropoffCoordinates }) {

    const [rideDuration, setRideDuration] = useState(0.0);
    const [rideDistance, setRideDistance] = useState(0.0);


    //get rideDration from Mapbox-api
    useEffect(() => {
        fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1Ijoic2hyZXlhbnNocm95IiwiYSI6ImNreWhqY2k3ZzB1YmsycHAwam93emZiczEifQ.vxbJD2Ow7KmIYw7xdlAJDg`
        )
        .then((res) => res.json())
        .then((data) => {

          //setRideDuration(data.routes[0].duration / 100);
          setRideDuration(data.routes[0].duration / 3600) //In hour
          setRideDistance(data.routes[0].distance / 1000) //In km

        })
        
    }, [pickupCoordinates, dropoffCoordinates]);

    console.log(rideDuration + "Hour"); 
    console.log(rideDistance +  "KM");

    //setRideDuration(data.routes[0].duration / 3600) //In hour
    //setRideDistance(data.routes[0].distance / 1000) //In km

    return (
        <Wrapper>
            
            <Title> Choose a ride, or swap up for more    </Title>

            <CarList>  
                {carList.map((car, index) => (

                     <Car  key = {index} >
                         <CarImage src= {car.imgUrl} />
     
                         <CarDetails>
                             <Service> {car.service} </Service>
                             <Time> 5 min away,  Estimated Ride {rideDistance.toFixed(2)} KM</Time>
                         </CarDetails>
     
                         <Price>{ '₹' + (rideDistance*15*car.multiplier).toFixed(2)  } </Price>
                         {/* <Price>{ '₹' + (rideDuration*car.multiplier).toFixed(2)  } </Price> */}
     
                     </Car>

                ))}

            </CarList>

           
        </Wrapper>
    )
}

export default RideSelector;

const Wrapper = tw.div `
    flex-1 overflow-y-scroll flex flex-col   
`

const Title = tw.div `
    text-gray-500 text-center text-xs py-2 border-b 

`

const CarList = tw.div`
 overflow-y-scroll display-none 

`

const Car = tw.div`
  flex p-4 items-center

`

const CarImage = tw.img`
  h-20 mr-4
`

const CarDetails = tw.div `
  flex-1

`

const Service = tw.div `
  font-medium

`


const Time = tw.div`
  text-xs text-blue-500

`
const Price = tw.div`
  text-sm

`







