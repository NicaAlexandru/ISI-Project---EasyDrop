import { TestBed } from '@angular/core/testing';
import { AppLoginForm } from './app.loginForm';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppLoginForm
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppLoginForm);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'EasyDrop'`, () => {
    const fixture = TestBed.createComponent(AppLoginForm);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('EasyDrop');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppLoginForm);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('EasyDrop app is running!');
  });
});
