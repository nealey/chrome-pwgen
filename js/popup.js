// I don't use "O01Il" because they are difficult to distinguish in many fonts :(
var letters = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var numbers = "23456789";
var symbols = "!@#$^&*()~+-=_/?.:";

function randint(range) {
  let a = new Uint32Array(1);
  window.crypto.getRandomValues(a);
  return (a % range);
}

function choice(items) {
  let n = randint(items.length);
  return items[n];
}

function shuffle(items) {
  for (let i = 0; i < items.length; i += 1) {
    let p = randint(items.length);
    let c = items[p];
    items[p] = items[i];
    items[i] = c;
  }
}

function regen() {
  let num = document.getElementById('num').checked;
  let sym = document.getElementById('sym').checked;
  let len = document.getElementById('len').value;
  let pw = document.getElementById('password');
  let chars = [];
  
  let nnums = num?(randint(len/3)+1):0;
  let nsyms = sym?(randint(len/5)+1):0;
  
  for (let i = 0; i < nnums; i += 1) {
    chars.push(choice(numbers));
  }
  for (let i = 0; i < nsyms; i += 1) {
    chars.push(choice(symbols));
  }
  for (let i = chars.length; i < len; i += 1) {
    chars.push(choice(letters));
  }
  shuffle(chars);
  password.value = chars.join("");
  
  // Put it on the clipboard
  pw.select();
  document.execCommand('copy');
  
  document.getElementById('lentxt').textContent = len;
}

function setup() {
  document.getElementById('regen').addEventListener('click', regen);
  document.getElementById('num').addEventListener('change', regen);
  document.getElementById('sym').addEventListener('change', regen);
  document.getElementById('len').addEventListener('input', regen);
  if (chrome.i18n) {
    document.getElementById('clipboard').textContent = chrome.i18n.getMessage("clipboard");
  }
  regen();
}

document.addEventListener('DOMContentLoaded', setup);
