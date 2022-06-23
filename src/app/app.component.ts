import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'candidateForm';
  items :any = []
  candidate : any = {};
  candidateAddedSuccess:boolean = false;
  candidateEditSuccess:boolean = false;
  constructor(private http: HttpClient) {
    
  }
  
  ngOnInit(){
    this.candidate['fname'] = "";
    this.candidate['lname'] = "";
    this.candidate['phNumber'] = "";
    this.candidate['designation'] = "";
    this.candidate['rating'] = "";
    this.getCandidates();
    
  }

  getCandidates(){
    this.http.get<any>('http://localhost:5000/get-students').subscribe(data => {
      this.items = data;
    })
  }

  editItem(item:any){
    this.http.put<any>(`http://localhost:5000/${item.id}`,this.candidate).subscribe(data => {
      console.log(data);
      this.candidateEditSuccess = true;
      this.getCandidates();
    });
    setTimeout(() => {
      this.candidateEditSuccess = false;
    },5000)
  }

  submitForm(){
    console.log(this.candidate);
    // this.candidateAddedSuccess = true;
    this.http.post<any>('http://localhost:5000/add-student',this.candidate).subscribe(data => {
      console.log(data);
      this.getCandidates();
      this.candidateAddedSuccess = true;
    })
    setTimeout(() => {
      this.candidateAddedSuccess = false;
    },5000)
  }

  deleteItem(item:any){
    this.http.delete<any>(`http://localhost:5000/${item.id}`).subscribe(data => {
      console.log(data);
      this.candidateEditSuccess = true;
      this.getCandidates();
    });
    setTimeout(() => {
      this.candidateEditSuccess = false;
    },5000)
  }

}
