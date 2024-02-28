import { LitElement } from 'lit'

export default class PanElement extends LitElement {

  createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

}
