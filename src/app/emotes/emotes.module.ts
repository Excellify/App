import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmotesRouterModule } from 'src/app/emotes/emotes-routing.module';
import { EmotesComponent } from 'src/app/emotes/emotes.component';
import { MaterialModule } from 'src/app/material.module';
import { EmoteCardComponent } from './emote-card/emote-card.component';
import { EmoteComponent } from './emote/emote.component';
import { EmoteCreateComponent } from './emote-create/emote-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmoteListComponent } from './emote-list/emote-list.component';
import { EmoteRenameDialogComponent } from 'src/app/emotes/emote/rename-emote-dialog.component';
import { EmoteOverridesDialogComponent } from 'src/app/emotes/emote/overrides-emote-dialog.component';
import { EmoteOwnershipDialogComponent } from 'src/app/emotes/emote/transfer-emote-dialog.component';
import { EmoteDeleteDialogComponent } from 'src/app/emotes/emote/delete-emote-dialog.component';
import { TagSystemComponent } from 'src/app/util/tag-system/tag-system.component';
import { EmoteSearchComponent } from './emote-search/emote-search.component';
import { EmoteChannelCardComponent } from 'src/app/emotes/emote/emote-channel-card.component';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
	imports: [
		CommonModule,
		EmotesRouterModule,
		MaterialModule,
		ReactiveFormsModule,
		UtilModule
	],
	exports: [
		EmoteCardComponent
	],
	declarations: [
		EmotesComponent,
		EmoteCardComponent,
		EmoteComponent,
		EmoteChannelCardComponent,
		EmoteCreateComponent,
		EmoteListComponent,
		EmoteRenameDialogComponent,
		EmoteOverridesDialogComponent,
		EmoteOwnershipDialogComponent,
		EmoteDeleteDialogComponent,
		TagSystemComponent,
		EmoteSearchComponent
	],
	providers: [],
})
export class EmotesModule { }
