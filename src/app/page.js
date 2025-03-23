"use client";
import Image from "next/image";
import Link from "next/link";
import { Truck, BarChart3, Clock, Shield, Users } from "lucide-react";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      <main className="flex-grow pt-14">
        {/* Hero Section */}
        <section className="bg-indigo-900 text-white py-16 md:py-24" id="home">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Fuelflow: Fuel Delivery Management System
                </h1>
                <p className="text-xl mb-8 text-white">
                  The complete management system for fuel distributors, gas
                  stations, and fleet operators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/login"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md text-center transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-md text-center transition-colors"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/logo/logo.gif"
                  alt="Fuel Delivery Management Dashboard"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Fuel Management Solution
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                FuelFlow provides a complete system for managing fuel delivery
                operations from order to delivery, with real-time tracking and
                reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Truck className="h-10 w-10 text-red-500" />}
                title="Delivery Management"
                description="Optimize routes, track deliveries in real-time, and manage your entire fleet from a single dashboard."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-red-500" />}
                title="Inventory Control"
                description="Monitor fuel levels across all locations, set automatic reorder points, and eliminate stockouts."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-red-500" />}
                title="Order Processing"
                description="Streamline order management with automated workflows, approvals, and customer notifications."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-red-500" />}
                title="Compliance & Safety"
                description="Ensure regulatory compliance with built-in safety checklists and automated documentation."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-red-500" />}
                title="Customer Management"
                description="Manage customer accounts, preferences, and payment terms in one centralized system."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-red-500" />}
                title="Reporting & Analytics"
                description="Gain insights with comprehensive reports on sales, deliveries, inventory, and more."
              />
            </div>
          </div>
        </section>

        {/* Our Fuels Section */}
        <section className="py-16 bg-gray-100" id="our-fuels">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fuels</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We provide high-quality fuels to meet all your energy needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 bg-indigo-900">
                  <Image
                    src="/fuels/premium.png"
                    alt="Premium Fuel"
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium Fuel</h3>
                  <p className="text-gray-600 mb-4">
                    High-octane premium fuel for superior engine performance and
                    efficiency.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Higher octane rating (91-94)
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Enhanced engine protection
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Improved fuel efficiency
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 bg-indigo-900">
                  <Image
                    src="/fuels/regular.png"
                    alt="Regular Fuel"
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Regular Fuel</h3>
                  <p className="text-gray-600 mb-4">
                    Standard fuel for everyday vehicles with reliable
                    performance.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Standard octane rating (87-89)
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Cost-effective option
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Suitable for most vehicles
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 bg-indigo-900">
                  <Image
                    src="/fuels/diesel.png"
                    alt="Diesel Fuel"
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Diesel Fuel</h3>
                  <p className="text-gray-600 mb-4">
                    High-quality diesel for commercial vehicles and heavy
                    machinery.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Higher energy density
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Better fuel economy
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Lower emissions options available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Comprehensive fuel delivery and management services for
                businesses of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-900 p-4 rounded-lg">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Scheduled Deliveries
                  </h3>
                  <p className="text-gray-600">
                    Regular fuel deliveries on a schedule that works for your
                    business. Never worry about running low on fuel again.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-900 p-4 rounded-lg">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Emergency Refueling
                  </h3>
                  <p className="text-gray-600">
                    24/7 emergency fuel delivery service when you need it most.
                    Quick response times and reliable service.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-900 p-4 rounded-lg">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Inventory Monitoring
                  </h3>
                  <p className="text-gray-600">
                    Advanced monitoring systems to track your fuel levels in
                    real-time and predict when you'll need a refill.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-900 p-4 rounded-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Compliance Management
                  </h3>
                  <p className="text-gray-600">
                    Stay compliant with all regulatory requirements with our
                    comprehensive compliance management services.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="#"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md inline-block transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* News & Promos Section */}
        <section className="py-16 bg-gray-100" id="news-promos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                News & Promotions
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest news and special offers from
                FuelFlow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/news/soon.png"
                  alt="News Article"
                  width={400}
                  height={200}
                  className="w-full h-48 object-fill"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    March 10, 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Coming Soon: FuelFlow New Mobile App
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our new mobile app makes it easier than ever to manage your
                    fuel deliveries on the go.
                  </p>
                  <Link
                    href="#"
                    className="text-red-500 font-semibold hover:text-red-600 inline-flex items-center"
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/news/promotion.png"
                  alt="Promotion"
                  width={400}
                  height={200}
                  className="w-full h-48 object-fill"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    February 28, 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Spring Promotion: 10% Off First Delivery
                  </h3>
                  <p className="text-gray-600 mb-4">
                    New customers can enjoy 10% off their first fuel delivery
                    when signing up this spring.
                  </p>
                  <Link
                    href="#"
                    className="text-red-500 font-semibold hover:text-red-600 inline-flex items-center"
                  >
                    Get offer
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/news/insights.png"
                  alt="Industry News"
                  width={400}
                  height={200}
                  className="w-full h-48 object-fill"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    February 15, 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Industry Insights: Future of Fuel Distribution
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore the latest trends and technologies shaping the
                    future of fuel distribution.
                  </p>
                  <Link
                    href="#"
                    className="text-red-500 font-semibold hover:text-red-600 inline-flex items-center"
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="#"
                className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-md inline-block transition-colors"
              >
                View All News & Promotions
              </Link>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-white" id="about-us">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About FuelFlow
                </h2>
                <p className="text-gray-600 mb-6">
                  FuelFlow is a leading provider of fuel delivery management
                  solutions, dedicated to optimizing the fuel supply chain for
                  distributors, gas stations, and fleet operators.
                </p>
                <p className="text-gray-600 mb-6">
                  Founded in 2018, we've grown to serve hundreds of businesses
                  across the country, helping them streamline operations, reduce
                  costs, and improve customer satisfaction.
                </p>
                <p className="text-gray-600 mb-6">
                  Our mission is to transform the fuel delivery industry through
                  innovative technology and exceptional service.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-900">
                      500+
                    </div>
                    <div className="text-gray-600">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-900">
                      35M+
                    </div>
                    <div className="text-gray-600">Gallons Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-900">
                      98%
                    </div>
                    <div className="text-gray-600">Client Retention</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-900">
                      24/7
                    </div>
                    <div className="text-gray-600">Support</div>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-red-500 font-semibold hover:text-red-600 inline-flex items-center"
                >
                  Learn more about our story
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-900 rounded-lg"></div>
                <Image
                  src="/logo/logo.svg"
                  alt="About FuelFlow"
                  width={600}
                  height={500}
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-16 bg-gray-100" id="contact-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Have questions or ready to get started? Reach out to our team
                today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-900 focus:border-indigo-900"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-900 focus:border-indigo-900"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-900 focus:border-indigo-900"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-900 focus:border-indigo-900"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-indigo-900 p-3 rounded-lg mr-4">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-gray-600">Mon-Fri, 8am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-900 p-3 rounded-lg mr-4">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600">support@fuelflow.com</p>
                        <p className="text-gray-600">sales@fuelflow.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-900 p-3 rounded-lg mr-4">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-gray-600">123 Fuel Street</p>
                        <p className="text-gray-600">Houston, TX 77001</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span className="text-gray-600">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span className="text-gray-600">Closed</span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        24/7 Emergency Delivery Service Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How FuelFlow Works
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform connects all stakeholders in the fuel delivery
                process for seamless operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StepCard
                number="1"
                title="Order Placement"
                description="Gas stations place orders through the platform or via automated reorder points."
                isFirst={true}
              />
              <StepCard
                number="2"
                title="Order Processing"
                description="Office staff review and approve orders, scheduling them for delivery."
              />
              <StepCard
                number="3"
                title="Dispatch"
                description="Depot staff prepare deliveries and assign them to drivers based on optimal routes."
              />
              <StepCard
                number="4"
                title="Delivery"
                description="Drivers complete deliveries with real-time updates and digital proof of delivery."
              />
              <StepCard
                number="5"
                title="Completion"
                description="Inventory is updated automatically and invoices are generated for seamless billing."
                isLast={true}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                See what our customers say about how FuelFlow has transformed
                their operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="FuelFlow has reduced our delivery scheduling time by 75% and virtually eliminated delivery errors."
                name="Sarah Johnson"
                title="Operations Manager, PetroMax"
              />
              <TestimonialCard
                quote="The real-time tracking and inventory management has been a game-changer for our network of 35 stations."
                name="Michael Chen"
                title="CEO, FuelExpress"
              />
              <TestimonialCard
                quote="We've seen a 30% reduction in administrative costs since implementing FuelFlow across our operations."
                name="David Rodriguez"
                title="Director, GasNow Distribution"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Optimize Your Fuel Delivery Operations?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of fuel distributors and gas stations already using
              FuelFlow to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md text-center transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="#"
                className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-8 rounded-md text-center transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  isFirst = false,
  isLast = false,
}) {
  return (
    <div className="relative">
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-900 text-white font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-indigo-900"></div>
      )}
    </div>
  );
}

function TestimonialCard({ quote, name, title }) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <div className="text-4xl text-indigo-900 mb-4">&quot;</div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
}
