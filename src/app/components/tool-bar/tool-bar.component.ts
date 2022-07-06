import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private router: Router,private auth: AuthService) { }
  routes = this.router.config.map((route: Route) => route?.path || 'Home');
  routesToGo = this.routes.filter(r => r !== 'home/movies/:id' && r!=='**' && r!=='home' && r!=='admin' && r!=='user');
  pageTitle = 'Home';
  log = 'LogOut';

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.addMovieRoute();
  }

  addMovieRoute(){
    this.routesToGo = this.routesToGo.filter(r => r !== 'addMovie');
    if(this.auth.isAdminLoggedIn()){
      this.routesToGo.push('addMovie');
    }
  }

  changeRoute(route: string): void {
    this.pageTitle = route;
    const pathToGo = route === 'Home' ? '/' : route;
    this.router.navigate([pathToGo]);
  }

  logOut(): void{
    this.auth.logout();
  }
}
