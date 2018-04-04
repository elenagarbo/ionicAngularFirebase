import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cont=0;
  cont2=1;

  finalizar=false;
  numcorrectas=0;

  pregunta='';
  respuesta='nada';

  noteList: Observable<Note[]>
  
  constructor(public navCtrl: NavController, private noteListService: NoteListService) {
    this.noteList = this.noteListService.getNoteList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  };

  mcqAnswer(questionID,answer){
    this.pregunta=questionID;
    this.respuesta=answer;
    };
  enviar(correcta){

    if(correcta==this.respuesta){
      this.numcorrectas++;
    }

    if (this.cont2<4) {
      this.cont++;
      this.cont2++;
    } else {
      this.finalizar=true;
      console.log("preguntas correctas"+this.numcorrectas);
      
    }
    
    }
}
