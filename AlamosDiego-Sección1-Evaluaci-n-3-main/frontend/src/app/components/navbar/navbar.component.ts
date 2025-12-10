import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RoleService, UserRole } from '../../services/role.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    currentRole: UserRole = 'user';

    constructor(public roleService: RoleService, private router: Router) {
        this.roleService.currentRole$.subscribe(role => {
            this.currentRole = role;
        });
    }

    toggleRole() {
        const newRole = this.currentRole === 'admin' ? 'user' : 'admin';
        this.roleService.setRole(newRole);
        if (newRole === 'user') {
            this.router.navigate(['/public']);
        } else {
            this.router.navigate(['/admin/catalog']);
        }
    }
}
