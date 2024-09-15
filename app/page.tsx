'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Check, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Link from 'next/link'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted with email:', email)
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-5xl ">
      {/* Hero Section */}
      <section className="">
        <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
            <h1 className="font-bold text-4xl my-4">Discover Our Amazing Produc</h1>
            <p className="leading-normal mb-4">Choose what you want to See</p>
            <Button className=" rounded sition-all duration-300 ease-in-out transform hover:scale-105">
              <Link href="/login"className='flex gaap-2 items-center'>
              Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2 lg:py-6 text-center">
            <img src="https://img.freepik.com/premium-photo/beautiful-cool-boy-with-headphones-music-colorful-paints-image-ai-generated-art_1113121-263.jpg?w=826" alt="Product" className="rounded-lg shadow-2xl " />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center  mb-8">Features</h2>
          <div className="flex flex-wrap gap-4 justify-center  items-center ">
            {[
              { icon: Check, title: "Easy to Use", description: "Intuitive interface for seamless experience" },
              { icon: Star, title: "Powerful Analytics", description: "Gain insights with advanced data analysis" },
              { icon: ArrowRight, title: "Fast Performance", description: "Lightning-quick response times than before" }
            ].map((feature, index) => (
              <div key={index} className=" px-4 py-4 border border-white  mt-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md ">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-xl font-semibold py-4">{feature.title}</h3>
                <p className="text-md py-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center  mb-8">Testimonials</h2>
          <div className="flex flex-wrap">
            {[
              { name: "John Doe", role: "CEO, TechCorp", quote: "This product has revolutionized our workflow!" },
              { name: "Jane Smith", role: "Designer, CreativeCo", quote: "I can't imagine working without it now." },
              { name: "Mike Johnson", role: "Freelancer", quote: "The best investment I've made for my business." }
            ].map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/3 px-2 mb-4">
                <div className="rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <p className=" mb-4">{testimonial.quote}</p>
                  <p className="font-semibold ">{testimonial.name}</p>
                  <p className="">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center  mb-8">Contact Us</h2>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 px-4">
              <form onSubmit={handleSubmit} className=" rounded-lg shadow-xl p-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="mb-4"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
                <Textarea
                  placeholder="Your Message"
                  className="mb-4"
                />
                <Button type="submit" className="w-full ">Send Message</Button>
              </form>
            </div>
            <div className="w-full lg:w-1/2 px-4 mt-6 lg:mt-0">
              <div className="rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-semibold  mb-4">Get in Touch</h3>
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6  mr-2" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6  mr-2" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6  mr-2" />
                  <span>123 Product Street, City, Country</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline">About Us</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline">Careers</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline">Terms of Use</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline flex items-center justify-center md:justify-start">
                    <Facebook className="h-5 w-5 mr-2" /> Facebook
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline flex items-center justify-center md:justify-start">
                    <Twitter className="h-5 w-5 mr-2" /> Twitter
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline flex items-center justify-center md:justify-start">
                    <Instagram className="h-5 w-5 mr-2" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Newsletter</h5>
              <p className="mb-4">Subscribe to our newsletter for updates</p>
              <form className="flex flex-col sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-2 sm:mb-0 sm:mr-2"
                />
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}