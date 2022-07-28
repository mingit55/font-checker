import { FontBox } from "./FontBox.js";

export class FontCompare {
  constructor() {
    this.text = "Hello World";
    this.size = 16;
    this.colCount = 3;
    this.fontBoxes = [];

    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      this.initEvent();
    });
  }

  initEvent() {
    // File Input
    let fileInputElem = document.querySelector("#file-upload");
    fileInputElem.addEventListener("input", async () => {
      const files = Array.from(fileInputElem.files);
      await Promise.all(
        files.map(
          (file) =>
            new Promise((res, rej) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                const text = this.text;
                const size = this.size;
                const url = fileReader.result;
                const fontBox = new FontBox({ text, size, file, url });
                this.fontBoxes.push(fontBox);
                res(fontBox);
              };
              fileReader.onerror = () => {
                rej(new Error("파일을 불러오는데에 실패했습니다."));
              };
              fileReader.readAsDataURL(file);
            })
        )
      );

      this.fontBoxes = this.fontBoxes.sort((a, b) =>
        a.file.name.localeCompare(b.file.name)
      );

      this.render();
    });

    // Text Input
    let textInputElem = document.querySelector("#text-input");
    textInputElem.addEventListener("input", (e) => {
      this.text = e.target.value;
      this.fontBoxes.forEach((box) => box.setText(this.text));
    });

    // Size Input
    let sizeInputElem = document.querySelector("#size-input");
    sizeInputElem.addEventListener("input", (e) => {
      this.size = Number(e.target.value);
      this.fontBoxes.forEach((box) => box.setSize(this.size));
    });

    // Column Count Input
    let colInputElem = document.querySelector("#col-input");
    colInputElem.addEventListener("input", (e) => {
      this.colCount = Number(e.target.value);
      this.render();
    });
  }

  render() {
    const wrapElem = document.querySelector(".font-wrap");
    wrapElem.innerHTML = `<style>.font-wrap { grid-template-columns: repeat(${
      this.colCount
    }, calc(${100 / this.colCount}% - ${3 * this.colCount}px));  }</style>`;

    this.fontBoxes.forEach((fontBox) => {
      fontBox.render();
      wrapElem.append(fontBox.elem);
    });
  }
}
