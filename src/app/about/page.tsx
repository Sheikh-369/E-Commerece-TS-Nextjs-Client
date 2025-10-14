// app/about/page.tsx

import React from 'react';

const AboutPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to <strong>YourStoreName</strong> – your go-to destination for quality products and a seamless shopping experience.
      </p>
      <p className="text-lg mb-4">
        Founded in [Year], our mission is to bring you carefully curated items that combine quality, affordability, and style. Whether you’re looking for the latest in fashion, tech, home goods, or lifestyle products, we’ve got something for everyone.
      </p>
      <p className="text-lg mb-4">
        Our team is passionate about eCommerce and committed to providing outstanding customer service. From product discovery to checkout and delivery, we’re here to make every step smooth and enjoyable.
      </p>
      <p className="text-lg">
        Thank you for shopping with us. We’re excited to be part of your journey and can’t wait to serve you better every day.
      </p>
    </main>
  );
};

export default AboutPage;
