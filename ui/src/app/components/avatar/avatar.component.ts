import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { personas } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class AvatarComponent {
  constructor(private sanitizer: DomSanitizer) {}

  @Input() size: 'large' | 'small' = 'large';
  @Input() name: string;

  get url() {
    const avatar = createAvatar(personas, {
      seed: this.name,
    });

    return this.sanitizer.bypassSecurityTrustUrl(avatar.toDataUriSync());
  }
}
