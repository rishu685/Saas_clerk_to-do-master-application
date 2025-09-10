import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Github, Twitter, Users, Sparkles, Shield, Zap, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TaskFlow Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover-lift">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover-lift">
                <Link href="/sign-up">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text-premium">Elevate Your</span>
              <br />
              <span className="text-slate-900">Productivity</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of task management with our premium, AI-powered platform designed for ambitious professionals and high-performing teams.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 shadow-premium hover-lift"
            >
              <Link href="/sign-up">
                Start Free Trial
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover-lift"
            >
              <Link href="/sign-in">
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>Trusted by 10,000+ professionals</span>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Powerful Features for <span className="gradient-text">Modern Teams</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to streamline workflows, boost productivity, and achieve your goals faster than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed with instant sync across all devices. Experience zero lag and maximum efficiency.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and security protocols. Your data is protected with military-grade encryption.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Smart Collaboration",
                description: "AI-powered team insights and real-time collaboration tools that adapt to your workflow patterns.",
                color: "from-blue-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group border-0 shadow-premium hover:shadow-premium-lg transition-all duration-500 hover-lift animate-fade-in-up bg-white/70 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-premium-lg">
          <div className="text-center space-y-12">
            <h2 className="text-4xl font-bold">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "1M+", label: "Tasks Completed" },
                { number: "99.9%", label: "Uptime" },
                { number: "50+", label: "Countries" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                  <div className="text-blue-100 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Ready to <span className="gradient-text">Transform</span> Your Workflow?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized their productivity with TaskFlow Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 shadow-premium hover-lift"
            >
              <Link href="/sign-up">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500">No credit card required • 14-day free trial • Cancel anytime</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-700">TaskFlow Pro</span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" asChild>
                <Link href="#" className="text-slate-600 hover:text-slate-900">
                  <Github className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#" className="text-slate-600 hover:text-slate-900">
                  <Twitter className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-500 text-sm">
            © 2025 TaskFlow Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
