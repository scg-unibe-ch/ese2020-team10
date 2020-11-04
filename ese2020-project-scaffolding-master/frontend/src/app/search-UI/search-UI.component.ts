import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'search',
    templateUrl: './search-UI.component.html',
    styleUrls: ['./search-UI.component.css']
  })

  export class SearchUIComponent {

    formatLabel(value: number) {
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
  
      return value;
    }

    search() {
      
    }
  }