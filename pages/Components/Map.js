import React, {useEffect} from 'react'
import tw from 'tailwind-styled-components';
import mapboxgl from '!mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyZXlhbnNocm95IiwiYSI6ImNreWhqY2k3ZzB1YmsycHAwam93emZiczEifQ.vxbJD2Ow7KmIYw7xdlAJDg';


function Map(props) {

    useEffect(() => {
  
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',  // US [-99.29011, 39.39172]
      center: [78.61,  22.49],  //India [78.47668102723722.199166076052], Darbhanga [85.9, 26.16667], Bangalore [77.59796, 12.96991]  // Delhi [77.21667, 28.66667]
      zoom: 3,
    });

    if(props.pickupCoordinates){
        addToMap1(map, props.pickupCoordinates );
    }

    if(props.dropoffCoordinates){
        addToMap2(map, props.dropoffCoordinates);
    }


    if(props.pickupCoordinates && props.dropoffCoordinates ){
        map.fitBounds([
            props.pickupCoordinates,
            props.dropoffCoordinates
        ],{
            padding: 60
        })
    }

}, [props.pickupCoordinates, props.dropoffCoordinates]);


    // Create a default Marker and add it to the map.
    const addToMap1 = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
    }

    // const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    // .setLngLat([12.65147, 55.608166])
    // .addTo(map);

    const addToMap2 = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map);
    }



    return (  <Wrapper id = 'map'>  </Wrapper> )
}

export default Map;

const Wrapper = tw.div`
  flex-1  h-1/2

  `