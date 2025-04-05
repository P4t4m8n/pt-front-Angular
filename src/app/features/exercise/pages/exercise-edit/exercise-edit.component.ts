import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { TExercise } from '../../types/exercise.type';
import { ExerciseUtilService } from '../../services/util/exercise-util.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputYoutubeComponent } from '../../../../core/components/form/input-youtube/input-youtube.component';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-exercise-edit',
  imports: [
    ReactiveFormsModule,
    InputYoutubeComponent,
    NgSelectComponent,
    NgOptionComponent,
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css',
})
export class ExerciseEditComponent implements OnInit {
  @Inject('exerciseUtilService') exerciseUtilService: ExerciseUtilService =
    new ExerciseUtilService();
  @Input()
  exercise: TExercise | undefined;

  isEditOpen: boolean = false;
  buttonText: string = 'Edit';
  youtubeVideoId: string = '';
  equipmentList: string[] = [
    'Barbell',
    'Dumbbell',
    'Kettlebell',
    'Cable',
    'Bodyweight',
  ];

  targetMuscleList: string[] = [
    'Chest',
    'Back',
    'Shoulders',
    'Arms',
    'Legs',
    'Core',
  ];

  exerciseTypeList: string[] = [
    'Strength',
    'Cardio',
    'Flexibility',
    'Balance',
    'Endurance',
  ];

  exerciseImgsList: string[] = [
    'imgs/1.png',
    'imgs/2.png',
    'imgs/3.png',
    'imgs/4.png',
    'imgs/5.png',
    'imgs/6.png',
    'imgs/7.png',
    'imgs/8.png',
    'imgs/9.png',
    'imgs/10.png',
    'imgs/11.png',
    'imgs/12.png',
    'imgs/13.png',
    'imgs/14.png',
    'imgs/15.png',
    'imgs/16.png',
    'imgs/17.png',
    'imgs/18.png',
    'imgs/19.png',
    'imgs/20.png',
    'imgs/21.png',
    'imgs/22.png',
    'imgs/23.png',
    'imgs/24.png',
  ];

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', { validators: [Validators.required] }),
    youtubeUrl: new FormControl<string>(''),
    imgUrl: new FormControl<string>('imgs/1.png'),
    type: new FormControl<string>(''),
    equipment: new FormControl<string>(''),
    targetMuscle: new FormControl<string>(''),
  });
  
  ngOnInit(): void {
    if (!this.exercise) {
      this.buttonText = 'Create';
      this.exercise = this.exerciseUtilService.getEmpty();
    }
    this.form.patchValue({
      ...this.exercise,
      imgUrl: this.exercise?.imgUrl || 'imgs/1.png',
    });
  }

  toggleEdit() {
    this.isEditOpen = !this.isEditOpen;
  }

  handleVideoUrl(url: string) {
    this.form.controls.youtubeUrl.setValue(url);
    console.log(" url:",  this.form.controls)
  }

  save() {
    this.exercise = this.form.value as TExercise;
    console.log(' this.exercise:', this.exercise);
    // this.isEditOpen = false;
  }
}
