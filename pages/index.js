import { useEffect , useState } from 'react';
import Head from 'next/head'
import tw from 'tailwind-styled-components'
import Map from './Components/Map'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router'
import { auth } from '../firebase'




export default function Home() {

  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {

    return onAuthStateChanged(auth, user =>{
      if(user) {
        setUser({

          name: user.displayName,
          photUrl: user.photoURL,

        })

      } 
      
      else{
        setUser(null)
        router.push('/login');
      }


    } )

  }, []);



  return (


    <Wrapper>

      <Map /> 

      <ActionItems> 

        <Header>

          <UberLogo  src = 'https://seekvectorlogo.net/wp-content/uploads/2019/07/uber-technologies-inc-vector-logo.png' alt = 'uber-logo'/>
        

        <Profile>
          <Name> {user && user.name} </Name>

          <UserImg src = {user && user.photUrl}
                    onClick = {() => signOut(auth)} />

        </Profile>

        </Header> 


        <ActionButtons>
          <Link href = "/search" > 
          <ActionButton>
            <ActionButtonImg  src = 'https://i.ibb.co/cyvcpfF/uberx.png' alt ='img'/>
              Ride 
          </ActionButton>
          </Link>


          <ActionButton> 
            <ActionButtonImg  src = 'https://i.ibb.co/n776JLm/bike.png' alt ='img'/>
            Moto </ActionButton>

          <ActionButton>
            <ActionButtonImg  src = 'https://i.ibb.co/5RjchBg/uberschedule.png' alt ='img'/>
             Reserve </ActionButton>

        </ActionButtons>


        <InputButton>
          Where to?
        </InputButton>
        
      
        {/* Header */}

        {/* Action Button */}

        {/* Input Button */}


      </ActionItems>
      
    </Wrapper>


  )
}


const Wrapper = tw.div`
  flex flex-col h-screen 

  `


const ActionItems = tw.div`
  flex-1  h-1/2 p-4
  
  `

const Header = tw.div`
  flex  justify-between  items-center
  `  



const  UberLogo = tw.img`
  h-28
  `


const Profile = tw.div`
  flex   items-center
  `  

const Name = tw.div`
  mr-4  text-sm
  `
  
const UserImg  = tw.img`

  h-12 w-12 rounded-full  border border-gray-200 p-px cursor-pointer
  `
  
const ActionButtons = tw.div`
  flex 
  `

const ActionButton = tw.div`
   flex  bg-gray-200  flex-1  m-2 h-32  items-center  flex-col justify-center  rounded-lg hover:scale-105 transition text-xl
   font-style: bold
  `

const ActionButtonImg = tw.img `
  h-3/5 
  `  


const InputButton = tw.div `
  h-20 bg-gray-200 text-2xl p-4 items-center

`  
  
