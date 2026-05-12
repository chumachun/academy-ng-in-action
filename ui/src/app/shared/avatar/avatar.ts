import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { personas } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  private readonly sanitizer = inject(DomSanitizer);

  readonly small = input(false);
  readonly name = input.required<string>();

  get url() {
    const avatar = createAvatar(personas, {
      seed: this.name(),
    });

    return this.sanitizer.bypassSecurityTrustUrl(avatar.toDataUri());
  }
}
