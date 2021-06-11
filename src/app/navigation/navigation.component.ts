import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { EditorDialogComponent } from 'src/app/navigation/editor-dialog.component';
import { AppService } from 'src/app/service/app.service';
import { ClientService } from 'src/app/service/client.service';
import { ThemingService } from 'src/app/service/theming.service';
import { ViewportService } from 'src/app/service/viewport.service';
import { UserStructure } from 'src/app/util/user.structure';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	envName: ('dev' | 'stage') = 'dev';

	// List of navigation buttons which appear
	// on the right side of the toolbar
	navButtons = [
		{
			name: 'home',
			path: '/',
			icon: 'home'
		},
		{
			name: 'about',
			path: '/about',
			icon: 'info'
		},
		{
			name: 'emotes',
			path: '/emotes',
			icon: 'zulul',
			svg: true
		},
		{
			name: 'admin',
			path: '/admin',
			color: this.themingService.primary,
			condition: this.clientService.isAuthenticated().pipe(
				filter(yes => yes),
				switchMap(() => this.clientService.canAccessAdminArea())
			),
			icon: 'build'
		}
	] as NavigationComponent.NavButton[];

	constructor(
		private dialogRef: MatDialog,
		private cdr: ChangeDetectorRef,
		public clientService: ClientService,
		public viewportService: ViewportService,
		public themingService: ThemingService,
		public appService: AppService,
	) { }

	/**
	 * Whether the current environment is production
	 */
	get isEnvironmentProd(): boolean {
		return environment.production === true;
	}

	openInNewTab(btn: NavigationComponent.NavButton): void {
		window.open(btn.path, '_blank');
	}

	stopImpersonate(): void {
		this.clientService.impersonating.next(null);
		this.clientService.openSnackBar(`You are no longer acting as an editor`, 'OK', {
			verticalPosition: 'top',
			horizontalPosition: 'left'
		});
	}

	impersonate(): void {
		const dialog = this.dialogRef.open(EditorDialogComponent);

		dialog.afterClosed().pipe(
			filter((editor: UserStructure) => !!editor),
			tap(editor => this.clientService.openSnackBar(`You are now impersonating ${editor.getSnapshot()?.display_name}`, 'OK', {
				verticalPosition: 'top',
				horizontalPosition: 'left'
			})),
			map((editor: UserStructure) => this.clientService.impersonating.next(editor)),
			take(1)
		).subscribe({
			complete: () => this.cdr.markForCheck()
		});
	}

	ngOnInit(): void {}

}

export namespace NavigationComponent {
	export interface NavButton {
		name: string;
		icon: string;
		svg?: boolean;
		path: string;
		selected?: boolean;
		color?: string;
		condition?: Observable<boolean>;
	}
}
