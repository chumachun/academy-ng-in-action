import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, input } from '@angular/core';
import { Avatar } from './avatar';

@Component({
  selector: 'app-test-dummy',
  template: '<app-avatar [name]="name()" />',
  imports: [Avatar],
})
class Dummy {
  readonly name = input('');
}
describe(Avatar.name, () => {
  let fixture: ComponentFixture<Dummy>;
  let component: Dummy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Dummy],
    }).compileComponents();

    fixture = TestBed.createComponent(Dummy);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the correct background url', () => {
    const name = 'Hans';
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();

    const imgAttributes = fixture.debugElement.query(By.css('img')).attributes;

    expect(imgAttributes['src']).toContain('data:image/svg+xml;utf8,');
  });
});
