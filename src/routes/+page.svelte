<script lang="ts">
    import { onMount } from 'svelte';
    
    // For smooth scrolling to sections
    function scrollToSection(id: string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // For mobile menu toggle
    let mobileMenuOpen = false;
    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
    }
    
    // Basic form handling
    let contactForm = {
      name: '',
      email: '',
      eventType: '',
      message: ''
    };
    
    let isSubmitting = false;
    let submitSuccess = false;
    let submitError = false;
    
    async function handleSubmit() {
      isSubmitting = true;
      submitSuccess = false;
      submitError = false;
      
      try {
        // Get credentials from environment variables
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
        
        // Validate required credentials
        if (!botToken || !chatId) {
          console.error('Missing Telegram credentials');
          submitError = true;
          return;
        }
        
        // Format message for Telegram
        const text = `
New Contact Form Submission
---------------------------
Name: ${contactForm.name}
Email: ${contactForm.email}
Event Type: ${contactForm.eventType}
---------------------------
Message:

${contactForm.message}
---------------------------
EJentertainment.co
        `;
        
        // Send to Telegram API
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
          })
        });
        
        const result = await response.json();
        
        if (result.ok) {
          submitSuccess = true;
          // Reset form
          contactForm = {
            name: '',
            email: '',
            eventType: '',
            message: ''
          };
        } else {
          submitError = true;
          console.error('Error sending to Telegram:', result);
        }
      } catch (error) {
        submitError = true;
        console.error('Error submitting form:', error);
      } finally {
        isSubmitting = false;
      }
    }
  </script>
  
  <svelte:head>
    <title>EJ Entertainment | Event Planning & Hosting</title>
    <meta name="description" content="Specializing in house parties, private gatherings, and hip-hop music & fashion experiences in Addis.">
  </svelte:head>
  
  <header class="header">
    <div class="container header-container">
      <div class="logo-container">
        <img src="./ej-logo.png" alt="EJ Entertainment Logo" class="logo" />
        <div>
          <h1 class="site-title">EJ Entertainment</h1>
          <p class="site-tagline">Bring Your Event To Life</p>
        </div>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-list">
          <li><button on:click={() => scrollToSection('home')} class="nav-link">Home</button></li>
          <li><button on:click={() => scrollToSection('services')} class="nav-link">Services</button></li>
          <li><button on:click={() => scrollToSection('events')} class="nav-link">Events</button></li>
          <li><button on:click={() => scrollToSection('contact')} class="nav-link">Contact</button></li>
        </ul>
      </nav>
      
      <!-- Mobile menu button -->
      <button on:click={toggleMobileMenu} class="mobile-menu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="mobile-nav-overlay" class:active={mobileMenuOpen} on:click={toggleMobileMenu}></div>
    <nav class="mobile-nav" class:active={mobileMenuOpen}>
      <div class="mobile-nav-header">
        <div class="logo-container">
          <img src="./ej-logo.png" alt="EJ Entertainment Logo" class="mobile-logo" />
          <h2 style="font-size: 1.1rem;">EJ Entertainment</h2>
        </div>
        <button class="close-btn" on:click={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul class="mobile-nav-list">
        <li>
          <button on:click={() => {scrollToSection('home'); toggleMobileMenu();}} class="mobile-nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
        </li>
        <li>
          <button on:click={() => {scrollToSection('services'); toggleMobileMenu();}} class="mobile-nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Services
          </button>
        </li>
        <li>
          <button on:click={() => {scrollToSection('events'); toggleMobileMenu();}} class="mobile-nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Public Events
          </button>
        </li>
        <li>
          <button on:click={() => {scrollToSection('contact'); toggleMobileMenu();}} class="mobile-nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </button>
        </li>
      </ul>
      <div class="mobile-nav-footer">
        <div class="social-icons">
          <a href="https://www.instagram.com/addis_event/" target="_blank" rel="noopener noreferrer" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://www.instagram.com/opm_addis/" target="_blank" rel="noopener noreferrer" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  </header>
  
  <main>
    <!-- Hero Section -->
    <section id="home" class="hero-section">
      <div class="container">
        <h2 class="hero-title gradient-text">Elevate your experience</h2>
        <p class="hero-subtitle">Specializing in exclusive, bespoke private gatherings with personalized services that fulfill your every desire</p>
        <div class="button-group">
          <button on:click={() => scrollToSection('contact')} class="btn-primary">Plan Your Event</button>
          <button on:click={() => scrollToSection('events')} class="btn-secondary events-btn">Public Events</button>
        </div>
      </div>
    </section>
    <!-- Services Section -->
    <section id="services" class="services-section">
      <div class="container">
        <h2 class="section-title gradient-text-2">Our Services</h2>
        <p class="section-subtitle">What we offer to make your event special</p>
        
        
        <!-- Right decoration (using a GIF instead of Lottie) -->
        <div class="right-decoration">
          <img src="./1743618253745.gif" alt="Decorative animation" style="width: 100%; height: auto;">
        </div>
        
        <div class="services-grid">
          <!-- Service 1 -->
          <div class="service-card">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <h3 class="service-title">Private Parties</h3>
            <p class="service-description">Exclusive gatherings tailored to your needs with premium beverages, entertainment, and personalized experiences in select venues.</p>
          </div>
          
          <!-- Service 2 -->
          <div class="service-card">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="service-title">Corporate Events</h3>
            <p class="service-description">Professional gatherings, corporate celebrations, and customized experiences tailored to your company culture.</p>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- Featured Event Section -->
    <section id="events" class="events-section">
      <div class="container">
        <h2 class="section-title gradient-text-2">Featured Experience</h2>
        <p class="section-subtitle">Upcoming flagship event by EJ Entertainment</p>
        
        <div class="event-card">
          <div class="event-grid">
            <div class="event-info">
              <h3 class="event-title">OPM ADDIS</h3>
              <p class="event-tagline">THE UNDERGROUND RAP & TRAP CULTURE IN ADDIS</p>
              <ul class="event-features">
                <li class="feature-item">
                  <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  DJ-powered trap, hip-hop, and underground music
                </li>
                <li class="feature-item">
                  <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Urban streetwear and hip-hop fashion aesthetic
                </li>
                <li class="feature-item">
                  <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Authentic underground atmosphere and vibe
                </li>
              </ul>
              <a href="/OPMADDIS"  rel="noopener noreferrer" class="btn-primary">Get Tickets</a>
            </div>
            <div class="event-image-container">
              <img src="./opm.png" alt="OPM ADDIS Event" class="event-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section  class="contact-section">
      <div class="container" id="contact">
        <h2 class="section-title light gradient-text-2">Get In Touch</h2>
        <p class="section-subtitle light">Let's create an unforgettable event together</p>
        
        <div class="contact-grid" >
          <div class="contact-info">
            <h3 class="contact-title hide-in-mobile">Contact Information</h3>
            <p class="contact-intro hide-in-mobile">Connect with us to bring your event to life!</p>
            
            <div class="contact-details">
                <!-- TODO: Add contact details 
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 class="item-title">Phone</h4>
                  <p>+251 XX XXX XXXX</p>
                </div>
              </div>
              -->
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 class="item-title">Email</h4>
                  <p>support@ejentertainment.co</p>
                </div>
              </div>
              
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 class="item-title">Location</h4>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
            
            <div class="social-media">
              <h4 class="social-title">Follow Us</h4>
              <div class="social-icons">
                <a href="https://www.instagram.com/addis_event/" target="_blank" rel="noopener noreferrer" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.instagram.com/opm_addis/" target="_blank" rel="noopener noreferrer" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="contact-form-container">
            <h3 class="form-title">Send a Message</h3>
            
            <form on:submit|preventDefault={handleSubmit} class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={contactForm.name} 
                  required 
                  class="form-input" 
                />
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={contactForm.email} 
                  required 
                  class="form-input" 
                />
              </div>
              
              <div class="form-group">
                <label for="eventType" class="form-label">Event Type</label>
                <select 
                  id="eventType" 
                  bind:value={contactForm.eventType} 
                  required 
                  class="form-select"
                >
                  <option value="">Select an option</option>
                  <option value="private">Private Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">Your Message</label>
                <textarea 
                  id="message" 
                  bind:value={contactForm.message} 
                  rows="4" 
                  required 
                  class="form-textarea"
                  placeholder="Tell us about your event vision and let EJ Entertainment bring it to life..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn-primary full-width" disabled={isSubmitting}>
                {#if isSubmitting}
                  Sending...
                {:else}
                  Send Message
                {/if}
              </button>
              
              {#if submitSuccess}
                <div class="form-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Thanks for your message! We'll be in touch soon.</p>
                </div>
              {/if}
              
              {#if submitError}
                <div class="form-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Something went wrong. Please try again or contact us directly.</p>
                </div>
              {/if}
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="./ej-logo.png" alt="EJ Entertainment Logo" class="footer-logo-img" />
          <div>
            <h2 class="footer-title">EJ Entertainment</h2>
            <p class="footer-tagline">Bring Your Event To Life</p>
          </div>
        </div>
        
        <div class="footer-info">
          <a href="https://ejentertainment.co" class="footer-link">ejentertainment.co</a>
          <p class="copyright">© 2023 EJ Entertainment. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  
  <style>
    /* General Styles */
  
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* Decorative animations */
    .services-section {
      position: relative;
      overflow: hidden;
    }
    
    
    
    .left-decoration {
      position: absolute;
      left: -35px;
      top: 40%;
      transform: translateY(-50%);
      width: 350px;
      height: 350px;
      z-index: 0;
      display: none;
    }
    
    .right-decoration {
      position: absolute;
      right: -35px;
      top: 40%;
      transform: translateY(-50%);
      width: 350px;
      height: 350px;
      z-index: 0;
      display: none;
    }
    
    @media (min-width: 1024px) {
      .left-decoration, .right-decoration {
        display: block;
      }
    }
    
    /* Header and Navigation */
    .header {
      background: linear-gradient(to right, #006d6d, #20b2aa);
      color: white;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1rem;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
    }
    
    .logo {
      height: 3.5rem;
      width: 3.5rem;
      margin-right: 0.5rem;
    }
    
    .site-title {
      font-size: 1.5rem;
      font-weight: 400;
    }
    
    .site-tagline {
      font-size: 0.875rem;
      opacity: 0.9;
      font-weight: 300;
    }
    
    .desktop-nav {
      display: none;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      gap: 1.5rem;
    }
    
    .nav-link {
      color: white;
      font-weight: 400;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      transition: color 0.3s;
    }
    
    .nav-link:hover {
      color: #b2f5ea;
    }
    
    .mobile-menu-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }
    
    .menu-icon {
      height: 1.5rem;
      width: 1.5rem;
    }
    
    /* Mobile Navigation Styles */
    .mobile-nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }
    
    .mobile-nav-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 300px;
      height: 100%;
      background: linear-gradient(135deg, #006d6d, #20b2aa);
      color: white;
      z-index: 999;
      transition: right 0.25s cubic-bezier(0.77, 0.2, 0.05, 1.0);
      display: flex;
      flex-direction: column;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    }
    
    .mobile-nav.active {
      right: 0;
    }
    
    .mobile-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-nav-header .logo-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .mobile-nav-header h2 {
      font-size: 1.2rem;
      font-weight: 400;
    }
    
    .mobile-logo {
      width: 2.5rem;
      height: 2.5rem;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 0.3s ease;
    }
    
    .close-btn:hover .close-icon {
      transform: rotate(90deg);
    }
    
    .mobile-nav-list {
      list-style: none;
      padding: 1.5rem;
      flex: 1;
    }
    
    .mobile-nav-list li {
      margin-bottom: 1.5rem;
      transform: translateX(20px);
      opacity: 0;
      animation: slideIn 0.25s forwards;
    }
    
    .mobile-nav-list li:nth-child(1) { animation-delay: 0.1s; }
    .mobile-nav-list li:nth-child(2) { animation-delay: 0.2s; }
    .mobile-nav-list li:nth-child(3) { animation-delay: 0.3s; }
    .mobile-nav-list li:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes slideIn {
      to { 
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: none;
      border: none;
      color: white;
      font-size: 1.1rem;
      padding: 0.5rem 0;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: color 0.3s;
    }
    
    .mobile-nav-link:hover {
      color: #b2f5ea;
    }
    
    .nav-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    .mobile-nav-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
    }
    
    .mobile-nav-footer .social-icons {
      display: flex;
      gap: 1.5rem;
    }
    
    /* Hero Section */
    .hero-section {
      padding: 5rem 1rem;
      background: linear-gradient(to bottom, #1a202c, #2d3748);
      color: white;
      text-align: center;
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
      max-width: 36rem;
      margin-left: auto;
      margin-right: auto;
      font-weight: 300;
    }
    
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    
    /* Buttons */
    .btn-primary {
      background-color: #1ea49d;
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 0.5rem;
      font-weight: 400;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }
    
    .btn-primary:hover {
      background-color: #008b8b;
    }
    
    .btn-secondary {
      background-color: transparent;
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 0.5rem;
      font-weight: 400;
      border: 2px solid white;
      cursor: pointer;
      display: inline-block;
      transition: all 0.3s;
    }
    
    .btn-secondary:hover {
      color: #b2f5ea;
      border-color: #b2f5ea;
    }
    
    .full-width {
      width: 100%;
    }
    
    /* Public Events Button with gradient border */
    .btn-secondary.events-btn {
      border: none;
      background: 
        linear-gradient(#1a202c, #1a202c) padding-box,
        linear-gradient(45deg, #00fff2, #006d6d, #20b2aa, #00fff2) border-box;
      background-size: 300% 300%;
      border-radius: 0.5rem;
      border: 2px solid transparent;
      position: relative;
      animation: animateGradient 5s ease infinite;
    }
    
    .btn-secondary.events-btn:hover {
      background: 
        linear-gradient(#1a202c, #1a202c) padding-box,
        linear-gradient(45deg, #35efd0, #b2f5ea, #35efd0, #b2f5ea) border-box;
      background-size: 300% 300%;
      animation: animateGradient 3s ease infinite;
    }
    
    @keyframes animateGradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    /* Services Section */
    .services-section {
      padding: 4rem 1rem;
      background-color: white;
    }
    
    .section-title {
      font-size: 2.8rem;
      font-weight: 400;
      text-align: center;
    }
    
    .section-title.light {
      color: white;
    }
    
    .section-subtitle {
      text-align: center;
      color: #666;
      margin-top: 0.5rem;
      max-width: 36rem;
      margin-left: auto;
      margin-right: auto;
      font-weight: 300;
    }
    
    .section-subtitle.light {
      color: #e2e8f0;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5rem;
      margin-top: 3rem;
      justify-content: center;
    }
    
    .service-card {
      background-color: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: box-shadow 0.3s;
    }
    
    .service-card:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    
    .icon-circle {
      height: 4rem;
      width: 4rem;
      background-color: #e6fffa;
      color: #20b2aa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    
    .service-icon {
      height: 2rem;
      width: 2rem;
    }
    
    .service-title {
      font-size: 1.25rem;
      font-weight: 400;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .service-description {
      color: #666;
      font-weight: 300;
    }
    
    /* Events Section */
    .events-section {
      padding: 4rem 1rem 12rem;
      background-color: #f7fafc;
      position: relative;
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
      margin-bottom: -8rem;
      z-index: 1;
    }
    
    .event-card {
      margin-top: 3rem;
      background-color: white;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .event-grid {
      display: grid;
      grid-template-columns: 1fr;
    }
    
    .event-info {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .event-title {
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    
    .event-tagline {
      color: #666;
      margin-bottom: 1.5rem;
      font-weight: 300;
    }
    
    .event-features {
      margin-bottom: 1.5rem;
      list-style: none;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-weight: 300;
    }
    
    .check-icon {
      height: 1.25rem;
      width: 1.25rem;
      color: #20b2aa;
      margin-right: 0.5rem;
    }
    
    .event-image-container {
      background-color: #e2e8f0;
      height: 300px;
    }
    
    .event-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    /* Contact Section */
    .contact-section {
      padding: 12rem 1rem 5rem;
      background: linear-gradient(to bottom, #008f8f, #005e5e);
      color: white;
      position: relative;
      z-index: 0;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-top: 3rem;
    }
    
    .contact-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 400;
    }
    
    .contact-intro {
      margin-bottom: 1.5rem;
      font-weight: 300;
    }
    
    .contact-details {
      margin-bottom: 2rem;
    }
    
    .contact-item {
      display: flex;
      margin-bottom: 1rem;
    }
    
    .contact-icon {
      height: 1.25rem;
      width: 1.25rem;
      margin-top: 0.25rem;
      margin-right: 0.75rem;
    }
    
    .item-title {
      font-weight: 400;
    }
    
    .social-title {
      font-size: 1.125rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
    
    .social-icons {
      display: flex;
      gap: 1rem;
    }
    
    .social-icon {
      height: 2.5rem;
      width: 2.5rem;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    
    .social-icon:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    .contact-form-container {
      background-color: white;
      color: #333;
      border-radius: 0.5rem;
      padding: 1.7rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .form-title {
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-label {
      font-size: 0.875rem;
      font-weight: 400;
      color: #4a5568;
      margin-bottom: 0.5rem;
    }
    
    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      background-color: #f8fafc;
      color: #1a202c;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      border-color: #20b2aa;
      outline: none;
      box-shadow: 0 0 0 3px rgba(32, 178, 170, 0.2);
    }
    
    .form-textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    /* Form feedback */
    .form-success,
    .form-error {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .form-success {
      background-color: rgba(32, 178, 170, 0.1);
      border: 1px solid #20b2aa;
      color: #008b8b;
    }
    
    .form-error {
      background-color: rgba(220, 38, 38, 0.1);
      border: 1px solid rgba(220, 38, 38, 0.5);
      color: #dc2626;
    }
    
    .success-icon,
    .error-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }
    
    .success-icon {
      color: #20b2aa;
    }
    
    .error-icon {
      color: #dc2626;
    }
    
    /* Footer Section */
    .footer {
      background-color: #1a202c;
      color: white;
      padding: 3rem 1rem;
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      text-align: center;
    }
    
    .footer-logo {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-logo-img {
      height: 3rem;
      width: 3rem;
    }
    
    .footer-title {
      font-size: 1.25rem;
      font-weight: 400;
    }
    
    .footer-tagline {
      font-size: 0.875rem;
      opacity: 0.9;
      font-weight: 300;
    }
    
    .footer-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .copyright {
      font-size: 0.875rem;
      opacity: 0.8;
      font-weight: 300;
    }
    
    .footer-link {
      color: #4fd1c5;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-link:hover {
      color: #38b2ac;
      text-decoration: underline;
    }
    
    /* Media Queries for Responsiveness */
    @media (min-width: 640px) {
      .button-group {
        flex-direction: row;
        justify-content: center;
      }
      
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .event-image-container {
        height: 400px;
      }
    }
    
    @media (min-width: 768px) {
      .hero-title {
        font-size: 3.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
      }
      
      .desktop-nav {
        display: block;
      }
      
      .mobile-menu-btn {
        display: none;
      }
      
      .event-grid {
        grid-template-columns: 1fr 1fr;
      }
      
      .contact-grid {
        grid-template-columns: 1fr 1fr;
      }
      
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
      
      .footer-logo {
        flex-direction: row;
      }
    }
    
    @media (min-width: 1024px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .event-image-container {
        height: 500px;
      }
    }
    @media (max-width: 768px) {
      .section-title {
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
    .hide-in-mobile {
      display: none;
    }
    .form-success {
      font-size: 0.9rem;
    }
    .services-grid {
      gap: 3rem;
    }
    .btn-primary {
      font-size: 1.1rem;
      padding: 0.8rem 4rem;
    }
    .btn-secondary {
      background-color: transparent;
      color: white;
      font-size: 1.1rem;
      padding: 0.8rem 5rem;
    }
    }
  
  </style>
  