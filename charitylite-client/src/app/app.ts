import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationForm } from './donation-form/donation-form';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DonationForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = environment.app.name;
  protected description = environment.app.description;
  protected isDarkMode = false;

  ngOnInit() {
    // Check for saved dark mode preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
    
    // Start counter animation after component loads
    setTimeout(() => {
      this.startCounterAnimation();
    }, 1000);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private startCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const increment = target / 200;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
    });
  }
}
