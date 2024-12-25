import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, Clock, DollarSign, Recycle } from 'lucide-react';
const materials = {
  nonFerrous: {
    title: "Non-Ferrous Metals",
    categories: [
      {
        name: "Copper & Copper Wire",
        items: ["Copper pipe & fittings", "Bare copper wire", "Insulated copper wire", "Beryllium copper"]
      },
      {
        name: "Aluminum",
        items: ["Aluminum soffit & facia", "Extruded aluminum", "Aluminum cable & insulated wire", "Aluminum pipe, sheet & plate", "Automotive aluminum materials"]
      },
      {
        name: "Stainless Steel",
        items: ["Stainless pipe & structural", "Food manufacturing equipment", "Nickel bearing materials", "Machine shop turnings"]
      },
      {
        name: "Brass",
        items: ["Yellow brass", "Red brass", "Plumbing brass", "Pop off values & sprinkler heads"]
      },
      {
        name: "Mixed Alloys",
        items: ["Tungsten & cobalt", "Chrome & nickel bearings", "Inconel"]
      },
      {
        name: "Miscellaneous Materials",
        items: ["Lead acid batteries", "Catalytic converters", "Electric motors, starters & alternators", "Circuit boards"]
      }
    ]
  },
  ferrous: {
    title: "Ferrous Metals",
    categories: [
      {
        name: "Oversized Heavy Melt Steel",
        items: ["Farm equipment & machinery", "Structural steel", "Oilfield pipe and scrap metal", "Rebar", "Skeleton plate & all manufacturing scrap"]
      },
      {
        name: "Tin & Shred Feed",
        items: ["Appliances (washers, dryers, stoves & refrigerators)", "Office furniture", "Vehicles & obsolete vehicle parts", "Household metal (bicycles, lawn mowers, metal furniture)"]
      },
      {
        name: "Other Steel",
        items: ["Cast rotors & drums", "Machine shop turnings", "Rail lengths"]
      }
    ]
  }
};


// Update AnimatedCard component with scroll-triggered animations
const AnimatedCard = ({ children, delay = "0" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
const Navbar = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white flex items-center">
            <Recycle className="mr-2" />
            Metal Recycling Pro
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-green-400 transition-colors">Home</a>
            <a href="#materials" className="text-white hover:text-green-400 transition-colors">Materials</a>
            <a href="#contact" className="text-white hover:text-green-400 transition-colors">Contact</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-gradient-to-r from-purple-900 to-blue-900">
          <a href="#home" className="block py-2 text-white hover:text-green-400 transition-colors">Home</a>
          <a href="#materials" className="block py-2 text-white hover:text-green-400 transition-colors">Materials</a>
          <a href="#contact" className="block py-2 text-white hover:text-green-400 transition-colors">Contact</a>
        </div>
      )}
    </nav>
  );
};

// Update Hero component with staggered animations
const Hero = () => (
  <div id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-stone-800 to-neutral-900">
    <div className="absolute inset-0 overflow-hidden">
      <img 
        src="/api/placeholder/1920/1080" 
        alt="Metal recycling facility" 
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
    </div>
    <div className="relative max-w-6xl mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-slide-in-left" 
          style={{ animationDelay: '0.3s' }}>
        Transform Your <span className="text-amber-500">Metal</span> into Value
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-in-right"
         style={{ animationDelay: '0.6s' }}>
        Your trusted partner in sustainable metal recycling
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 animate-fade-in-up"
           style={{ animationDelay: '0.9s' }}>
        <a href="#contact" 
           className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg">
          Get Started <ArrowRight className="inline ml-2" />
        </a>
      </div>
    </div>
  </div>
);


const Features = () => (
  <div className="py-16 bg-zinc-100">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <AnimatedCard delay="200">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
              <img src="/api/placeholder/400/400" alt="Best prices" className="w-full h-full object-cover" />
            </div>
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive rates for all your metal recycling needs</p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay="400">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
              <img src="/api/placeholder/400/400" alt="Quick service" className="w-full h-full object-cover" />
            </div>
            <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
            <p className="text-gray-600">Fast and efficient processing of your materials</p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay="600">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
              <img src="/api/placeholder/400/400" alt="Eco friendly" className="w-full h-full object-cover" />
            </div>
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">Sustainable recycling practices for a better future</p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  </div>
);

// Update MaterialSection with new styling
const MaterialSection = ({ data }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
      {data.title}
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.categories.map((category, index) => (
        <AnimatedCard key={index} delay={index * 100}>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
              <img src="/api/placeholder/400/300" alt={category.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-amber-800">{category.name}</h3>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="mr-2 text-amber-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedCard>
      ))}
    </div>
  </div>
);

// Update Contact section with industrial theme
const Contact = () => (
  <div id="contact" className="relative py-16 text-white">
    <div className="absolute inset-0">
      <img 
        src="/api/placeholder/1920/600" 
        alt="Contact background" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 to-zinc-900/95"></div>
    </div>
    <div className="relative max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <AnimatedCard delay="200">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
            <Phone size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p>(555) 123-4567</p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay="400">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
            <Mail size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p>info@metalrecyclingpro.com</p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay="600">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
            <MapPin size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p>123 Metal Street<br />Recycling City, ST 12345</p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  </div>
);

// Add animation keyframes to index.css
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out forwards;
}

.animate-scale-up {
  animation: scaleUp 0.5s ease-out forwards;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
`;

// New Loading Component
const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`fixed inset-0 bg-zinc-900 z-50 flex items-center justify-center transition-opacity duration-500 ${
      isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="text-center">
        <div className="mb-4">
          <Recycle size={48} className="text-amber-500 animate-spin mx-auto" />
        </div>
        <div className="text-white text-2xl font-bold animate-pulse">
          Metal Recycling Pro
        </div>
      </div>
    </div>
  );
};

// Update the App component to include loading state
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Add animation styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content animations
      setTimeout(() => setContentLoaded(true), 300);
    }, 2000); // 2 seconds loading screen

    return () => {
      styleSheet.remove();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${
        contentLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <Hero />
        <Features />
        <div id="materials" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 animate-scale-up">
            Materials We Accept
          </h2>
          <MaterialSection data={materials.nonFerrous} />
          <MaterialSection data={materials.ferrous} />
        </div>
        <Contact />
        <footer className="bg-zinc-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 Metal Recycling Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

// Make sure this is the LAST line in your file
export default App;