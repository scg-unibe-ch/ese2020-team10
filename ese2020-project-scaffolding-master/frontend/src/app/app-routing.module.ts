import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { SearchUIComponent } from './search-UI/search-UI.component';
import {CategoryCatalogComponent} from "./landing-page/category-catalog/category-catalog.component";
import { WishlistComponent} from './wishlist/wishlist.component'
import {ProfileUpdateComponent} from "./profile/profile-update/profile-update.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'profile/:userName', component: ProfileComponent },
  { path: 'createOffer', component: CreateOfferComponent},
  { path: 'search', component: SearchUIComponent},
  { path: 'catalog/:category', component: CategoryCatalogComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'update/:userId', component: ProfileUpdateComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
