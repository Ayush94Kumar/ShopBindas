import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-3xl text-center pt-8 border-t'>
        <Title text1={'ShopBindas/'} text2={'About US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.company_logo} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 font-serif'>
        <p>Welcome to ShopBindash, your ultimate destination for seamless online shopping. We are dedicated to providing high-quality products, exceptional customer service, and a shopping experience that is both convenient and secure. ShopBindas team works tirelessly to curate the best collections to meet your everyday needs.</p>
        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. ShopBindas offer an extensive collection sourced from trusted brands and suppliers.</p>
        <b className='text-gray-700'>Our Mission</b>
        <p>Our mission is to empower customers by offering a diverse range of premium products at competitive prices. We strive to continuously innovate our digital storefront, ensuring a fast, reliable, and delightful shopping journey from discovery to delivery.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 font-serif'>
  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Premium Quality</b>
    <p className='text-gray-600'>
      ShopBindas carefully select high-quality fabrics and materials to ensure comfort,
      durability, and style in every product.
    </p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Affordable Prices</b>
    <p className='text-gray-600'>
      Enjoy the latest fashion trends at competitive prices without compromising
      on quality.
    </p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Fast & Secure Delivery</b>
    <p className='text-gray-600'>
      ShopBindas provide reliable shipping and secure packaging to ensure your orders
      arrive safely and on time.
    </p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Customer Satisfaction</b>
    <p className='text-gray-600'>
      Our dedicated support team is always ready to assist you and ensure a
      smooth shopping experience.
    </p>
  </div>
</div>
      </div>
  )
}

export default About