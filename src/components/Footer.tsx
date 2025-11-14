import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#0047BA] font-bold text-xl">K</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">KING POWER</span>
                <span className="text-xs -mt-1">SYSTEMS</span>
              </div>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Leading solar energy solutions provider in India. Empowering homes and businesses with clean, renewable energy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white/80 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-white/80 transition-colors">Projects</Link></li>
              <li><Link href="/subsidy" className="hover:text-white/80 transition-colors">PM Surya Ghar Subsidy</Link></li>
              <li><Link href="/testimonials" className="hover:text-white/80 transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white/80 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Residential Solar</Link></li>
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Commercial Solar</Link></li>
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Industrial Solar</Link></li>
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Solar Pumps</Link></li>
              <li><Link href="/services" className="hover:text-white/80 transition-colors">Battery Storage</Link></li>
              <li><Link href="/roi-calculator" className="hover:text-white/80 transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>King Power Systems, Solar Solutions Center, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span>info@kingpowersystems.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} King Power Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
