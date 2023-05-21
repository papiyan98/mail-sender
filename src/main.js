'use strict';

import { modal } from "./modal";

const formElem = document.forms.mailForm;

const addLoader = () => {
  const spinner = document.createElement('div');

  spinner.classList.add('spinner');
  spinner.insertAdjacentHTML('afterbegin', `
    <div class="spinner-overlay">
      <div class="spinner-window">
        <img src="/public/images/spinner.png" alt="Spinner"/>
      </div>
    </div>
  `);

  document.body.append(spinner);

  return spinner;
};
    
formElem.onsubmit = async (event) => {
  event.preventDefault();
  
  const loader = addLoader();
  const formData = new FormData(formElem);
  const userData = {};

  for (let [key, value] of formData.entries()) {
    userData[key] = value;
  }

  const response = await fetch(location.href, {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(userData)
  });

  if (response.ok) {
    const message = await response.text();

    loader.remove();
    modal({ title: "Sending status", content: message });

    formElem.reset();
  }
};