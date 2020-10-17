import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string;
  private sub: any;
  constructor(private activatedRoute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.userName = params['userName'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }
}
