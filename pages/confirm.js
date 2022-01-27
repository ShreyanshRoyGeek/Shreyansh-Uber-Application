import tw from 'tailwind-styled-components'
import Map from './Components/Map'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import RideSelector from './Components/RideSelector'
import Link from 'next/link'




function confirm() {

    const router = useRouter();
    const { pickup, dropoff }  = router.query


    console.log(pickup);
    console.log(dropoff);


    const [pickupCoordinates, setPicupCoordinates ] = useState([0, 0]);
    const [dropoffCoordinates, setDropoffCoordinates ] = useState([0, 0]);


    const getPickupCoordinates = (pickup) => {

        
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+

            new URLSearchParams({
                access_token: "pk.eyJ1Ijoic2hyZXlhbnNocm95IiwiYSI6ImNreWhqY2k3ZzB1YmsycHAwam93emZiczEifQ.vxbJD2Ow7KmIYw7xdlAJDg",
                limit: 1
            })
        
        ) 
        .then(response => response.json())
        .then(data => {

            // Pickup
            // console.log(data.features[0].center);
            setPicupCoordinates(data.features[0].center);
        })
    }

    const getDropofCoordinates = (dropoff) => {

       
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+

            new URLSearchParams({
                access_token: "pk.eyJ1Ijoic2hyZXlhbnNocm95IiwiYSI6ImNreWhqY2k3ZzB1YmsycHAwam93emZiczEifQ.vxbJD2Ow7KmIYw7xdlAJDg",
                limit: 1
            })
        
        ) 
        .then(response => response.json())
        .then(data => {

            // DropOff
            // console.log(data.features[0].center);
            setDropoffCoordinates(data.features[0].center);
        })
    }



    useEffect(() => {

        getPickupCoordinates(pickup);

        getDropofCoordinates(dropoff);

    }, [pickup, dropoff])




    return (
        <Wrapper>

        <Link  href="/search">
            <ButtonContainer> 
                <BackButton src = "https://img.icons8.com/ios-filled/50/000000/left.png"/>
            </ButtonContainer>
        </Link>


           <Map pickupCoordinates = {pickupCoordinates}
                dropoffCoordinates= {dropoffCoordinates}
           />


           <RideContainer>

                <RideSelector  pickupCoordinates = {pickupCoordinates}
                               dropoffCoordinates = {dropoffCoordinates}
                    
                />
                   
                <ConformButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConformButtonContainer>

           </RideContainer>

        </Wrapper>
    )
}

export default confirm


const Wrapper = tw.div `
    flex h-screen  flex-col   
`


const ButtonContainer = tw.div `
    rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
    `

const BackButton = tw.img `
    h-10 cursor-pointer   
    `

const RideContainer = tw.div `
    flex-1 flex flex-col h-1/2
`

const ConformButtonContainer = tw.div `
   border-t-2

`

const ConfirmButton = tw.div`
   bg-black text-white my-4 mx-4 py-4  text-center text-xl
`
