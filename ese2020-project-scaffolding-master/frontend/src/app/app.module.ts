import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { ProductUpdateComponent } from './product-item/product-update/product-update.component';
import { SearchUIComponent } from './search-UI/search-UI.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductfilterPipe } from './productfilter.pipe';
import { PurchaseDialogComponent } from './product-item/purchase-dialog/purchase-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatStepperModule} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { CategoryCatalogComponent } from './landing-page/category-catalog/category-catalog.component';
import { ToastrModule } from 'ngx-toastr';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';
import { ProductDescriptionComponent } from './product-item/product-description/product-description.component';
import { ProductDetailsComponent } from './product-item/product-description/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    NavBarComponent,
    LandingPageComponent,
    AdminComponent,
    ProfileComponent,
    ProductItemComponent,
    CreateOfferComponent,
    ProductUpdateComponent,
    SearchUIComponent,
    ProductfilterPipe,
    PurchaseDialogComponent,
    CategoryCatalogComponent,
    WishlistComponent,
    ProfileUpdateComponent,
    ProductDescriptionComponent,
    ProductDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatRadioModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatStepperModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    [CurrencyPipe],
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
