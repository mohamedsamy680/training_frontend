import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UploadModule } from '@progress/kendo-angular-upload';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgImageSliderModule } from 'ng-image-slider';

const appearance: MatFormFieldDefaultOptions = {
    hideRequiredMarker: false
};

@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTreeModule,
        MatStepperModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatListModule,
        MatChipsModule,
        MatGridListModule,
        MatToolbarModule,
        MatMenuModule,
        DragDropModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        ScrollingModule,
        MatBottomSheetModule,
        ExcelExportModule,
        UploadModule,
        MatAutocompleteModule,
        NgImageSliderModule
    ],
    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTreeModule,
        MatStepperModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatListModule,
        MatChipsModule,
        MatGridListModule,
        MatToolbarModule,
        MatMenuModule,
        DragDropModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        ScrollingModule,
        MatBottomSheetModule,
        ExcelExportModule,
        UploadModule,
        MatAutocompleteModule,
        NgImageSliderModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance
        }
    ]
})
export class MatModulesModule { }
