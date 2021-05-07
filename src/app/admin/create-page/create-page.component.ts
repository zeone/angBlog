import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;
  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  isInvalid(key: string) {
    return this.form.get(key)?.touched && this.form.get(key)?.invalid;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      author: this.form.value.author,
      date: new Date(),
      text: this.form.value.content,
      title: this.form.value.title,
    };
    console.log(post);

  }
}
