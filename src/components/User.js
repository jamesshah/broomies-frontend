import React, { useState } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addFavourite, deleteFavourite } from '../actions/userActions'
import { Link } from 'react-router-dom'

const User = ({ user, id, favourite }) => {
  const [fav, setFav] = useState(favourite)
  const dispatch = useDispatch()

  const onClickHandler = () => {
    // console.log(user)
    // const change = favourite ? 'delete' : 'add'
    if (favourite) {
      dispatch(deleteFavourite(user.id))
    } else {
      dispatch(addFavourite(user.id))
    }
    setFav(!fav)
  }

  return (
    <Col lg={6} md={6}>
      <Card
        key={id}
        className='p-2 m-2'
        style={{ backgroundColor: 'rgb(33,34,36)' }}
      >
        <Card.Body className='text-center'>
          <Link
            to={`/user/${user.username}`}
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <Card.Title className='mb-2'>@{user.username}</Card.Title>
          </Link>
          <Card.Subtitle className='mb-2 text-muted'>
            {user.location.text}
          </Card.Subtitle>
          <Card.Text className='text-truncate'>{user.bio}</Card.Text>
          <Row className='align-items-center mb-2'>
            <Col>
              <Button onClick={() => onClickHandler()}>
                {fav ? 'Remove from favourites' : 'Add to favourites'}
              </Button>
            </Col>
            {/* <Col>
              <Link to={`/user/${user.username}`}>
                <p>View profile</p>
              </Link>
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default User
