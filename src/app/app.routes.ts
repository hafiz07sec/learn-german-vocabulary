import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';

export const routes: Routes = [
    {path:'', redirectTo:'welcome',pathMatch:"full"},
    {path:"welcome", component:WelcomeComponent},
    {path:"question", component:QuestionComponent}
];
  