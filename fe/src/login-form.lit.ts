import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'

import PanElement from './utils/PanElement'

@customElement('login-form')
export default class LoginForm extends PanElement {

  private readonly username: { value: string, valid: boolean, dirty: boolean } = { value: '', valid: false, dirty: false }
  private readonly session: { value: string, valid: boolean } = { value: '', valid: true }

  private updateUsername({ target }: { target: HTMLInputElement }): void {
    this.username.value = target.value
    this.username.valid = target.value.length >= 1
    this.username.dirty = true
    this.requestUpdate()
  }

  private updateSession({ target }: { target: HTMLInputElement }): void {
    this.session.value = target.value
    this.session.valid = target.value === '' || /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(target.value)
    this.requestUpdate()
  }

  render(): TemplateResult {
    return html`<div class="bg-base-200 p-8 rounded shadow-md w-full sm:w-96">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      <form class="space-y-5">
        <label class="input flex items-center gap-2 ${this.username.dirty && (this.username.valid ? 'input-success' : 'input-error')}">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 15C8.8299 15 6.01077 16.5306 4.21597 18.906C3.82968 19.4172 3.63653 19.6728 3.64285 20.0183C3.64773 20.2852 3.81533 20.6219 4.02534 20.7867C4.29716 21 4.67384 21 5.4272 21H18.5727C19.3261 21 19.7028 21 19.9746 20.7867C20.1846 20.6219 20.3522 20.2852 20.3571 20.0183C20.3634 19.6728 20.1703 19.4172 19.784 18.906C17.9892 16.5306 15.17 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51469 3 7.49997 5.01472 7.49997 7.5C7.49997 9.98528 9.51469 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <input type="text" id="username" name="username" .value=${this.username.value} class="grow" placeholder="Username" required @input=${this.updateUsername} />
        </label>
        <div class="indicator w-full">
          <span class="indicator-item badge badge-neutral">optional</span>
          <label class="input flex items-center gap-2 w-full ${this.session.value !== '' && (this.session.valid ? 'input-success' : 'input-error')}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M10 8V7M10 12.5V11.5M10 17V16M5.2 4H18.8C19.9201 4 20.4802 4 20.908 4.21799C21.2843 4.40973 21.5903 4.71569 21.782 5.09202C22 5.51984 22 6.0799 22 7.2V8.5C20.067 8.5 18.5 10.067 18.5 12C18.5 13.933 20.067 15.5 22 15.5V16.8C22 17.9201 22 18.4802 21.782 18.908C21.5903 19.2843 21.2843 19.5903 20.908 19.782C20.4802 20 19.9201 20 18.8 20H5.2C4.0799 20 3.51984 20 3.09202 19.782C2.71569 19.5903 2.40973 19.2843 2.21799 18.908C2 18.4802 2 17.9201 2 16.8V15.5C3.933 15.5 5.5 13.933 5.5 12C5.5 10.067 3.933 8.5 2 8.5V7.2C2 6.0799 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.71569 4.40973 3.09202 4.21799C3.51984 4 4.0799 4 5.2 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <input type="text" id="session" name="session" .value=${this.session.value} class="grow" placeholder="Session ID" @input=${this.updateSession} />
          </label>
        </div>
        <div class="form-control">
          <button type="submit" class="btn btn-primary" .disabled=${(this.username.dirty && !this.username.valid) || !this.session.valid}>
            Log in
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 17C6 17.3513 6 17.5269 6.01567 17.6796C6.14575 18.9474 7.0626 19.9946 8.30206 20.2911C8.45134 20.3268 8.6255 20.35 8.97368 20.3965L15.5656 21.2754C17.442 21.5256 18.3803 21.6507 19.1084 21.3611C19.7478 21.1069 20.2803 20.6407 20.6168 20.0406C21 19.357 21 18.4105 21 16.5175V7.48244C21 5.5894 21 4.64288 20.6168 3.95935C20.2803 3.35923 19.7478 2.893 19.1084 2.6388C18.3803 2.34926 17.442 2.47435 15.5656 2.72455L8.97368 3.60347C8.62546 3.6499 8.45135 3.67311 8.30206 3.70883C7.0626 4.00532 6.14575 5.05254 6.01567 6.3203C6 6.47301 6 6.64866 6 6.99996M12 7.99996L16 12M16 12L12 16M16 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>`
  }

}
