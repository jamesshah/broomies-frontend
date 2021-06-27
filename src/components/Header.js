import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { useMediaQuery } from 'react-responsive'
import styles from '../css/Header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 992px)',
  })

  const isMobile = useMediaQuery({
    query: '(max-width: 576px)',
  })

  console.log(isMobile)

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar
        id='navbar'
        variant='dark'
        className={`${styles.navbar} ${
          isMobile && userInfo ? styles.container : ''
        } px-5 py-3 shadow`}
        fixed='top'
      >
        <Container>
          <LinkContainer to={`${userInfo ? '/home' : '/'}`} exact>
            <Navbar.Brand className={styles.navbar_brand}>
              broomies <span style={{ color: '#4d61fc' }}>.</span>
            </Navbar.Brand>
          </LinkContainer>
          <Nav className='mr-auto'>
            {userInfo && !isMobile ? (
              <>
                <LinkContainer to='/favourites'>
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <NavDropdown title={userInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : userInfo && isMobile ? (
              <>
                <NavDropdown title={userInfo.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to='/' exact>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login' exact>
                  <Nav.Link className={styles.nav_link}>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {isMobile && userInfo && (
        <Navbar
          className='justify-content-center border border-top'
          fixed='bottom'
          variant='dark'
          // bg='dark'
          style={{ backgroundColor: '#111213' }}
        >
          <Nav>
            <Nav.Item>
              <LinkContainer to='/home' exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to='/search' exact>
                <Nav.Link>
                  {/* <Search size={30} /> */}
                  Search
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to='/favourites' exact>
                <Nav.Link>
                  {/* <HeartFill size={30} /> */}
                  Favourites
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Navbar>
      )}
      {/* </Container> */}
      {/* </Navbar> */}
    </header>
  )
}

export default Header
