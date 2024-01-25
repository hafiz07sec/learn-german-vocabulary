import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { ChangeBgDirective } from '../change-bg.directive';
@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ChangeBgDirective
  ],
  providers:[QuestionService],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  public name : string =" ";

  public questionList: any = [];
  public currentQuestion: number =0;
  public points: number = 0;
  counter = 60;
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;

  interval$:any;

  progress:string = '0';

  isQuizCompleted : boolean =false;
  

  constructor(private questionService : QuestionService){

  }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
      this.questionService.getQuestionJson()
      .subscribe((res)=>{
       // console.log(res.questions);
        this.questionList = res.questions;
       
      });
  }

  nextQuestion(){
      this.currentQuestion++;
      // this.resetCounter();
  
  }

  previousQuestion(){
    this.currentQuestion--;
    // this.resetCounter();
   
  }

  answer(currentQno:number, option:any){

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.startCounter();
    }

    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
     
     
    }else{
      setTimeout(()=>{
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points-=10;
    }
  }

  startCounter(){
    this.interval$=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points -=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 6000000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;

  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress = "0";
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
