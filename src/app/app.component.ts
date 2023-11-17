import { Component } from '@angular/core';
import { ApiHttpService } from './service/api-http.service';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
const Diff = require('text-diff');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  text = '';
  correctedText = '';
  loading = false;
  liveText = new FormControl('');
  loadingLive = false;
  correctedLiveText = '';
  diff;

  constructor(
    private apiHttpService: ApiHttpService
  ) {
    this.diff = new Diff();
  }

  ngOnInit() {
    const liveCorrection = this.liveText.valueChanges.pipe(debounceTime(1000));
    liveCorrection.subscribe(uncorrectedtext => this.correctLiveText(uncorrectedtext));
  }

  async correctText() {
    this.loading = true;
    const { text } = await this.apiHttpService.getCorrectedText(this.text);
    this.loading = false;
    this.correctedText = text;
  }

  async correctLiveText(textToCorrect: string | null) {
    if (textToCorrect) {
      this.loadingLive = true;
      const { text } = await this.apiHttpService.getCorrectedText(textToCorrect);
      var textDiff = this.diff.main(textToCorrect, text);
      this.loadingLive = false;
      this.correctedLiveText = this.diff.prettyHtml(textDiff)
        .replaceAll('<del>', '<del class="del">')
        .replaceAll('<ins>', '<ins class="ins">');;
    }
  }
}
