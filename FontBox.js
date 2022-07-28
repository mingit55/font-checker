export class FontBox {
  constructor({ text, file, url }) {
    this.url = url;
    this.file = file;
    this.text = text;

    this.elem = document.createElement("div");
    this.elem.classList.add("font-box");
    this.elem.innerHTML = `
      <style>
        @font-face {
          font-family: '${this.file.name}';
          src: url(${url});
        }
      </style>
      <div class="font-box__title">
        ${this.file.name}
      </div>
      <div
        class="font-box__content"
        style="font-family: '${this.file.name}'"
      >
        ${text}
      </div>
    `;
  }

  setText(text) {
    this.text = text;
    this.render();
  }

  setSize(size) {
    this.size = size;
    this.render();
  }

  render() {
    const contElem = this.elem.querySelector(".font-box__content");
    contElem.innerText = this.text;
    contElem.style.fontSize = this.size + "px";
  }
}
