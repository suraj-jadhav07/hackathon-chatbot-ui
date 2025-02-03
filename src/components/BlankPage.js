import React, { useEffect } from 'react';

// CSS styles defined as a constant
const styles = {
  pageStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: '0',
    width: '100%', // Make sure it takes full width
  },
  headingStyle: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
  },
};

const BlankPage = () => {
  useEffect(() => {
    // Ensure that html and body take up full height
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
  }, []);

  return (
    <div style={styles.pageStyle}>
      <h1 style={styles.headingStyle}>Logged Out</h1>
    </div>
  );
};

export default BlankPage;
