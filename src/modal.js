export const modal = (options) => {
  const modal = document.createElement('div');

  modal.classList.add('modal');
  modal.insertAdjacentHTML("afterbegin", `
    <div class="modal-overlay" data-close>
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">${options.title}</span>
          <span class="modal-close" data-close>&times;</span>
        </div>
        <div class="modal-body">
          <p>${options.content}</p>
        </div>
        <div class="modal-footer">
          <button data-close>OK</button>
        </div>
      </div>
    </div>
  `)
  
  document.body.append(modal);

  modal.addEventListener('click', event => {
    if (event.target.hasAttribute('data-close')) {
      modal.remove();
    }
  });
};