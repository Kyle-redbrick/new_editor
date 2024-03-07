function copy(value) {
  const tempElement = document.createElement("textarea");
  tempElement.value = value;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
}

const Clipboard = { copy };

export default Clipboard;
