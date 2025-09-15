import Link from "next/link"
import { Shield, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section - Centered at Top */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">DisasterReady</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Empowering communities with comprehensive disaster preparedness education and training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/modules" className="text-muted-foreground hover:text-foreground">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="/drills" className="text-muted-foreground hover:text-foreground">
                  Virtual Drills
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="text-muted-foreground hover:text-foreground">
                  Live Alerts
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-muted-foreground hover:text-foreground">
                  Emergency Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gamification" className="text-muted-foreground hover:text-foreground">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@disasterready.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 7897 4266 29</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Gorakhpur, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DisasterReady. Built for Smart India Hackathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
