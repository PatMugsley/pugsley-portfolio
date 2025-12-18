import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Linkedin, 
  Mail, 
  Calendar, 
  Briefcase, 
  Cpu, 
  PenTool, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Download
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, href }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl border border-transparent",
    secondary: "bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50",
    outline: "bg-transparent text-white border-2 border-white/30 hover:bg-white/10"
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      href={href}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, skills }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem = ({ role, company, period, description, highlights }) => (
  <div className="relative pl-8 md:pl-0">
    {/* Timeline line for mobile */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 md:hidden"></div>
    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-600 md:hidden"></div>

    <div className="md:grid md:grid-cols-[1fr,auto,1fr] md:gap-8 items-start group">
      {/* Date (Left on desktop) */}
      <div className="hidden md:block text-right pt-1">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{period}</span>
      </div>

      {/* Center Line (Desktop) */}
      <div className="hidden md:flex flex-col items-center self-stretch">
        <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></div>
        <div className="w-px bg-slate-200 flex-grow my-2"></div>
      </div>

      {/* Content (Right on desktop) */}
      <div className="pb-12">
        <div className="md:hidden text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{period}</div>
        <h3 className="text-xl font-bold text-slate-900">{role}</h3>
        <div className="text-blue-600 font-medium mb-3">{company}</div>
        <p className="text-slate-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-600">
              <ChevronRight size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, category, description, color }) => (
  <div className="group relative overflow-hidden rounded-xl bg-slate-900 aspect-[4/3] cursor-pointer">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 transition-opacity group-hover:opacity-90`}></div>
    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">{category}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
            MATTHEW<span className="text-blue-600 font-extrabold">PUGSLEY</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              variant={isScrolled ? "primary" : "secondary"} 
              className={!isScrolled && "bg-white text-slate-900 border-none hover:bg-slate-100"}
              href="mailto:matt@pugsley.net"
            >
              Contact Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-slate-100" />
            <a href="mailto:matt@pugsley.net" className="text-blue-600 font-semibold">Contact Me</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Available for Design Consultation</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Bridging Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                & Execution
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              I am a multidisciplinary engineer specializing in the conceptual development, 
              design, and manufacturing of complex electromechanical systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#consultation">
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
              <Button variant="outline" href="#portfolio">
                View Past Projects
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Cpu size={20} />
                <span className="text-sm font-medium">Hardware</span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers size={20} />
                <span className="text-sm font-medium">Manufacturing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase size={20} />
                <span className="text-sm font-medium">Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Engineering with Business Context</h2>
              <div className="prose prose-slate text-slate-600">
                <p className="mb-4">
                  With a Master's in Engineering Management and a Bachelor's in Mechanical Engineering from Purdue, 
                  I don't just design parts—I build systems that work for the business.
                </p>
                <p className="mb-4">
                  My background spans 5 years in R&D labs and manufacturing floors at industry giants like HP, Formlabs, and Honda. 
                  I specialize in bridging the gap between abstract customer requirements and concrete engineering execution.
                </p>
                <p>
                  Whether it's scoping a new product line, designing complex fluid control systems, or optimizing 
                  robotic manufacturing cells, I bring a risk-mitigation mindset to every stage of development.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-900">5+</div>
                  <div className="text-sm text-slate-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500">Hours in CAD</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">Master's</div>
                  <div className="text-sm text-slate-500">Purdue Univ.</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative">
                 {/* Decorative technical drawing overlay */}
                 <div className="absolute inset-0 opacity-20" 
                      style={{backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    {/* Placeholder for Headshot */}
                    <div className="text-center">
                        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl">MP</span>
                        </div>
                        <p className="font-mono text-sm">Headshot Placeholder</p>
                    </div>
                 </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border border-slate-50 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Download size={16} />
                    </div>
                    <span className="font-bold text-slate-900">Resume</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Updated Dec 2025. Applications Engineer III focus.</p>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Download PDF &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Consulting Services" 
            subtitle="I offer freelance engineering services to startups and established firms looking to accelerate their hardware development."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={PenTool}
              title="Product Engineering"
              description="Full-stack hardware development from initial concept to detailed manufacturing documentation. I handle system architecture, tolerance analysis, and cost estimation."
              skills={['SolidWorks', 'Fusion 360', 'Onshape', 'System Architecture']}
            />
            <ServiceCard 
              icon={Cpu}
              title="Prototyping & Mfg"
              description="Rapid fabrication and small-batch production strategy. I have deep familiarity with 3D printing, CNC, and injection molding to help you move from CAD to physical part faster."
              skills={['3D Printing', 'CNC', 'Laser Cutting', 'Material Handling']}
            />
            <ServiceCard 
              icon={Layers}
              title="Testing & Automation"
              description="Designing custom test fixtures and automated equipment to standardize functional testing. I integrate sensors, motors, and computer vision to validate performance."
              skills={['Python', 'OpenCV', 'Sensors', 'Data Analysis']}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Professional Journey" />
          
          <div className="space-y-4">
            <ExperienceItem 
              role="R&D Hardware Design Engineer"
              company="Hewlett-Packard (HP Inc.)"
              period="Jul 2023 - Aug 2025"
              description="Led architecture development for printhead algorithms and invented novel ink pressure sensors."
              highlights={[
                "Delivered ~$4M/year savings by optimizing printhead settings algorithm.",
                "Invented novel ink pressure sensor architecture, leading mfg R&D for 300 prototypes.",
                "Managed 3 ink-tank prototype builds, overseeing tool design and timelines."
              ]}
            />
            
            <ExperienceItem 
              role="Mechanical Design Engineer"
              company="Formlabs"
              period="Jan 2022 - Aug 2022"
              description="Designed core components for SLA 3D printers and high-viscosity fluid handling systems."
              highlights={[
                "Designed compliant silicone valves to control high-viscosity fluid flow.",
                "Built automated equipment using servos and pneumatics to speed up functional testing.",
                "Prototyped initial components for the Form 4 SLA 3D printer (Resin tank, Build plate)."
              ]}
            />
            
            <ExperienceItem 
              role="Electromechanical Test Engineer"
              company="Honda R&D Americas"
              period="Aug 2019 - Dec 2019"
              description="Validation and environmental testing for vehicle electrical systems."
              highlights={[
                "Designed test fixtures with motors and transducers for alternator testing.",
                "Conducted thermal tests on battery cooling systems for design validation."
              ]}
            />

            <ExperienceItem 
              role="Robotics Engineer"
              company="Honda Engineering North America"
              period="Jan 2019 - Apr 2019"
              description="Programming and validation for mass production robotic cells."
              highlights={[
                "Owned programming/validation for 180 robotic welds for 2021 Acura MDX.",
                "Documented cable simulation techniques to reduce deployment overtime."
              ]}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Projects</h2>
              <p className="text-slate-400 max-w-xl">A glimpse into my work in automation, consumer electronics, and additive manufacturing.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-400 hover:text-white transition-colors font-semibold">
              View All Projects <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard 
              title="Ink Pressure Sensor"
              category="R&D / Sensing"
              description="A novel architecture for HP ink tanks resulting in $500K annual savings. Involved pneumatic fixture design and statistical validation."
              color="from-blue-600 to-indigo-900"
            />
            <ProjectCard 
              title="Form 4 Resin System"
              category="Product Design"
              description="Prototyping and testing of the resin tank and wiper systems for Formlabs' latest SLA printer, focusing on chemical compatibility."
              color="from-emerald-600 to-teal-900"
            />
            <ProjectCard 
              title="Robotic Weld Validation"
              category="Automation"
              description="Simulation and programming for 180 weld points on the Acura MDX chassis, optimizing cycle time and cable management."
              color="from-orange-600 to-red-900"
            />
             <ProjectCard 
              title="Automated Fluid Dispenser"
              category="Mechatronics"
              description="Custom test rig utilizing servos and load cells to characterize fluid dispensing accuracy for high-viscosity resins."
              color="from-purple-600 to-violet-900"
            />
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" href="#">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="consultation" className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Engineer a Solution?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            I am currently accepting new consulting projects. Whether you need a design review, a prototype built, or a full system architecture, let's connect.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button onClick={() => window.open('https://calendly.com', '_blank')}>
              Book a 30-min Consultation
            </Button>
            <Button variant="secondary" href="mailto:matt@pugsley.net">
              matt@pugsley.net
            </Button>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://linkedin.com/in/matt-pugsley/" className="text-slate-400 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:matt@pugsley.net" className="text-slate-400 hover:text-blue-600 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://mattpugsley.net" className="text-slate-400 hover:text-blue-600 transition-colors">
              <ExternalLink size={24} />
            </a>
          </div>
          
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Matthew Pugsley. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;