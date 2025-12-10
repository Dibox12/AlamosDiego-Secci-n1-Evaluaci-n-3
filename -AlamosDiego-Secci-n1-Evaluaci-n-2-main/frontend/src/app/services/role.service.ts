import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'admin' | 'user';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private roleSubject = new BehaviorSubject<UserRole>('user');
    public currentRole$ = this.roleSubject.asObservable();

    constructor() {
        // Default to user
    }

    setRole(role: UserRole) {
        this.roleSubject.next(role);
    }

    getRole(): UserRole {
        return this.roleSubject.value;
    }
}
