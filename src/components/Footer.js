import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='p-5 text-muted bg-dark text-center position-relative'>
      <Container>
        <p className='h6'>Copyright &copy; 2021 Find Your Roomie</p>
        {/* <a href='' className='position-absolute bottom-0 end-0 p-5'>
            <ArrowUpCircle size={28} style={{ color: '#4D61FC' }} />
          </a> */}
      </Container>
    </footer>
  )
}

export default Footer
