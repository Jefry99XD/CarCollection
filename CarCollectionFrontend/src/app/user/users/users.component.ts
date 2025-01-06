import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[] = [];

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.service.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data.map((user) => ({
          id: user.id,
          username: user.username,
          photo: user.photo || 'https://via.placeholder.com/150', // Placeholder si no tiene foto
          friendsCount: user.friendsCount,
          CarCollectionCount: user.CarCollectionCount,
        }));
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
}
