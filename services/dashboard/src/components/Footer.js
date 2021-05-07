import React from 'react';
import './Footer.css';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <Container fluid>
    <div>
      <footer
        style={{
          position: 'relative',
          paddingTop: '15px',
          bottom: '0',
        }}
      >
        © 2021 Movie.AI
      </footer>
    </div>
  </Container>
);

export default Footer;
