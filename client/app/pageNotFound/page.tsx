import React from 'react';

const Page: React.FC = () => {
  // Inline styles in TypeScript
  const pageStyles: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyles: React.CSSProperties = {
    color: '#4CAF50', // Green color
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const subtitleStyles: React.CSSProperties = {
    color: '#B0B0B0', // Gray color
    fontSize: '24px',
  };

  return (
    <div style={pageStyles}>
      <div style={titleStyles}>404</div>
      <div style={subtitleStyles}>Page Not Found</div>
    </div>
  );
};

export default Page;
