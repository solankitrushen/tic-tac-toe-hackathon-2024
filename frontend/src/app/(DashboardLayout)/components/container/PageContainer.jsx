'use client';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageContainer = ({ title, description, children }) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{title} library</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
