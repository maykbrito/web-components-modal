const styles = `<style>
    .modal-wrapper.active{
        visibility: visible;
        opacity: 1;
    }
    
    .modal-wrapper{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        display: flex;
    
        background: rgba(4, 9, 17, .8);
    
        visibility: hidden;
        opacity: 0;
    }
    
    .modal-wrapper .modal{
        background: var(--bg-color, #fff);
        margin: auto;
    
        border-radius: .8rem;
    
        font-family: 'Poppins', sans-serif;
        text-align: center;
    
        padding: 6.4rem;
    }
  
    </style>`

const html = `<div class="modal-wrapper">
    <div class="modal">
        <slot></slot>
    </div>
</div>`

const template = document.createElement('template')
template.innerHTML = styles + html

class McModal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  // is invoked each time the custom element is
  // appended into a document-connected element
  connectedCallback() {
    this._escape()
  }

  _escape() {
    const modalWrapper = this.shadowRoot.querySelector('.modal-wrapper')

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalWrapper.classList.contains('active')) {
        this.close()
      }
    })
  }

  open() {
    this.shadowRoot.querySelector('.modal-wrapper').classList.add('active')
  }

  close() {
    this.shadowRoot.querySelector('.modal-wrapper').classList.remove('active')
  }
}

customElements.define('mc-modal', McModal)
