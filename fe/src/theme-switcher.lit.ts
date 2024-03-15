import { html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'

import { isOneOf } from '../../utils/maybe'

import PanElement from './utils/PanElement'

type Mode = 'light' | 'dark' | 'system'
type Theme = 'nord' | 'dim'
type Option = { label: string, mode: Mode, icon: TemplateResult }
const isValid = isOneOf('light', 'dark', 'system')

@customElement('theme-switcher')
export default class ThemeSwitcher extends PanElement {

  static OPTIONS: Record<Mode, Option> = {
    light: {
      mode: 'light',
      label: 'Light',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    dark: {
      mode: 'dark',
      label: 'Dark',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    system: {
      mode: 'system',
      label: 'System',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M7.57181 21C8.90661 20.3598 10.41 20 12 20C13.59 20 15.0934 20.3598 16.4282 21M6.8 17H17.2C18.8802 17 19.7202 17 20.362 16.673C20.9265 16.3854 21.3854 15.9265 21.673 15.362C22 14.7202 22 13.8802 22 12.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V12.2C2 13.8802 2 14.7202 2.32698 15.362C2.6146 15.9265 3.07354 16.3854 3.63803 16.673C4.27976 17 5.11984 17 6.8 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
  }

  private readonly root = document.documentElement
  private options: Option = ThemeSwitcher.OPTIONS.system

  render(): TemplateResult {
    return html`<div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1">${this.options.icon}${this.options.label}</div>
      <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-base-200 rounded-box">
        ${Object.values(ThemeSwitcher.OPTIONS).map(({ label, mode, icon }) => html`
          <li><a class="${this.options.label === label ? 'active' : ''}" @click=${() => this.setMode(mode)}>${icon}${label}</a></li>
        `)}
      </ul>
    </div>`
  }

  connectedCallback(): void {
    super.connectedCallback()
    const theme = localStorage.getItem('theme')
    this.setMode(isValid(theme) ? theme : 'system')
    window.matchMedia('(prefers-color-scheme: dark)') // Ideally, you should remove the listener when the element is disconnected
      .addEventListener('change', () => { if (this.options.mode === 'system') { this.setMode('system') } })
  }

  private setMode(mode: Mode): void {
    localStorage.setItem('theme', mode)
    this.root.dataset.theme = ThemeSwitcher.for(mode)
    this.options = ThemeSwitcher.OPTIONS[mode]
    this.requestUpdate()
  }

  private static for(mode: Mode): Theme {
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const effective = mode === 'system' ? sys : mode
    return effective === 'light' ? 'nord' : 'dim'
  }

}
