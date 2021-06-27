import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Image, CardDeck, Card } from 'react-bootstrap'
import { ArrowRight, ArrowUpCircle } from 'react-bootstrap-icons'
import Footer from '../components/Footer'
// import axios from 'axios'

// import Autocomplete from '../components/AutoComplete'

// const IndexScreen = () => {
//   // const [version, setVersion] = useState('')
//   const [latitude, setLatitude] = useState('')
//   const [longitude, setLongitude] = useState('')
//   const [search, setSearch] = useState('')
//   const [data, setData] = useState('')
//   const [error, setError] = useState('')

//   // function geoFindme() {
//   //   async function success(position) {
//   //     setError('')
//   //     setLatitude(position.coords.latitude)
//   //     setLongitude(position.coords.longitude)

//   //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoidmV3YW1hbTI5MSIsImEiOiJja3E0MG81c3kwaWxyMnZvNjFtbnFjNjY0In0.4eO5797VhghTYmHa1MPG8w`

//   //     console.log(url)

//   //     // const res = await axios.get(url)
//   //     // setData(res)
//   //     // console.log(data)
//   //   }

//   //   function errorFunc() {
//   //     setError('Unable to retrieve your location')
//   //   }

//   //   if (!navigator.geolocation) {
//   //     setError('Geolocation is not supported by your browser')
//   //   } else {
//   //     setError('Locating…')
//   //     navigator.geolocation.getCurrentPosition(success, errorFunc)
//   //   }
//   // }

//   async function submitHandler(e) {
//     setSearch(e.target.value)

//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=IN&autocomplete=true&access_token=pk.eyJ1IjoidmV3YW1hbTI5MSIsImEiOiJja3E0MG81c3kwaWxyMnZvNjFtbnFjNjY0In0.4eO5797VhghTYmHa1MPG8w`

//     // console.log(url)

//     const res = await axios.get(url)
//     setData(res)
//     console.log(data)
//   }

//   useEffect(() => {
//     // geoFindme()

//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser')
//     } else {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setError('')
//           setLatitude(position.coords.latitude)
//           setLongitude(position.coords.longitude)
//         },
//         (err) => {
//           setError('Error Occurred')
//         }
//       )
//     }
//   }, [])

//   return (
//     <Container>
//       <Row>
//         <Col>
//           {/* <h1>Hello World</h1> */}
//           <h3>{latitude}</h3>
//           <h3>{longitude}</h3>
//         </Col>
//         {error && <Col>{<h1>{error}</h1>}</Col>}
//       </Row>
//       <Row>
//         <Col>
//           <input type='text' value={search} onChange={submitHandler}></input>
//         </Col>
//       </Row>
//       {/* <Users /> */}
//     </Container>
//   )
// }

// export default IndexScreen

// import React from 'react'
// import AutoComplete from '../components/AutoComplete'

const IndexScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.replace('/home')
    }
  }, [history, userInfo])

  return (
    <>
      <section
        className='p-5 text-white mt-5'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <div className='d-sm-flex align-items-center justify-content-between'>
            <div>
              <h1 style={{ fontWeight: '700' }}>Roommates That Don't Annoy!</h1>
              <p className='lead my-4'>
                Find a <strong> Sluggish Bear </strong> or a{' '}
                <strong>Hustler </strong>
                to share your room with.
              </p>
              <button
                className='btn btn-lg text-white'
                style={{ backgroundColor: '#4D61FC' }}
              >
                Sign Up
                <ArrowRight style={{ marginLeft: '10' }} />
              </button>
            </div>
            <Image
              src='/images/find-roommate.svg'
              alt=''
              className='w-50 d-none d-sm-block'
              fluid
            />
          </div>
        </Container>
      </section>

      <section
        className='p-md-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col md className='p-md-5'>
              <Image src='/images/nearby.svg' fluid />
            </Col>
            <Col md className='p-5'>
              <h1>Find nearby roommates</h1>
              <p className='lead'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corrupti iste velit ea ex sapiente mollitia.
              </p>
              <p style={{ color: 'rgb(156,163,175)' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                eligendi eaque ex, numquam ipsum rem inventore consectetur
                totam, enim similique dolore. Praesentium ad placeat non
                reprehenderit aliquam quos ipsa quasi?
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        className='p-md-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col md className='p-5'>
              <h1>Personalised Recommendations</h1>
              <p className='lead'>
                Get the best roommate that matches your profile.
              </p>
              <p style={{ color: 'rgb(156,163,175)' }}>
                We give your recommendations for the roommates that best matches
                your Bio, Budget, Hobbies, etc. Our algorithm will serve you
                with the best results.
              </p>
            </Col>
            <Col md>
              <Image src='/images/personalised.svg' fluid />
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section
        className='p-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <h1 className='text-center mb-4'>How Does This Work?</h1>
          <Row>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/find.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/chat.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/meet.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/fun.svg' fluid roundedCircle />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}
      <Footer />
    </>
  )
}

export default IndexScreen
