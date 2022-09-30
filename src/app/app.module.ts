import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from './menu/menu.component';
import { Burgers } from './burgers/burgers.component';
import { Combos } from './combos/combos.component';
import { Cart } from './cart/sidebar-menu/cart.component';
import { Extras } from './Extras/extras.component';
import { Order} from './order/order.component';
import { Monitor } from './monitor/monitor.component';
import { AuthGuard } from './services/authguard.service';
import { OrdersList } from './monitor/orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    Cart,
    Menu,
    Burgers,
    Combos,
    Extras,
    Order,
    OrdersList,
    Monitor,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'burgers', pathMatch: 'full' },
      { path: 'burgers', component: Burgers },
      { path: 'combos', component: Combos },
      { path: 'monitor', component: Monitor, canActivate:[AuthGuard] },
    ]),
  ],
  providers: [NgbActiveModal, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
