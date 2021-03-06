class Topmenu {
  constructor(id, modules, items) {
    this.id = id;
    this.modules = modules;
    this.items = items;
    this.menu = document.getElementById(id);
    // this.menu.addEventListener('click', this.onClick.bind(this));

    this.menu.innerHTML = this.items
      .map((item) => {
        return `<div class="menu-item" data-title="${item.title}">
      <div class="menu-item-title">${item.title}</div>
      <div class="menu-item-items">
      ${item.items
        .map((subItem) => {
          return (
            `<div class="menu-item-item">` +
            (subItem.type == 'divider'
              ? `<div class="menu-item-items-divider"></div>`
              : `<div class="menu-item-item-title" data-action="${
                  subItem.action
                }"><div>${subItem.title}</div><div>${
                  subItem.shortcut || ''
                }</div></div>`) +
            `</div>`
          );
        })
        .join('')}
      </div>
      </div>`;
      })
      .join('');

    this.menu.querySelectorAll('.menu-item').forEach((item) => {
      item.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      item.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    });
    this.menu.querySelectorAll('.menu-item-items').forEach((item) => {
      item.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      item.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    });

    this.menu.querySelectorAll('.menu-item-item-title').forEach((item) => {
      item.addEventListener('click', this.onItemClick.bind(this));
    });
  }

  onMouseEnter(e) {
    this.menu.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.toggle('active', item == e.currentTarget);
    });
    this.menu.querySelectorAll('.menu-item-items').forEach((item) => {
      item.classList.toggle('active', item == e.currentTarget);
    });
  }
  onMouseLeave(e) {
    this.hideAll();
  }

  hideAll() {
    this.menu.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.toggle('active', false);
    });
    this.menu.querySelectorAll('.menu-item-items').forEach((item) => {
      item.classList.toggle('active', false);
    });
  }

  onItemClick(e) {
    let action =
      e.target.getAttribute('data-action') ||
      e.target.parentElement.getAttribute('data-action');
    this.modules.events.emit('top-menu-item-click', action);
    this.hideAll();
    // dm.router.goto(href);
  }
}

export default Topmenu;
