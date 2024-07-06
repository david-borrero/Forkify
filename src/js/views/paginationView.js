import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupPrev() {
    const currentPage = this._data.page;
    return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }

  _generateMarkupNext() {
    const currentPage = this._data.page;
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    // Page 1 and no other
    if (currentPage === 1 && numPages === 1) {
      return ``;
    }

    // Page1 and other
    if (currentPage === 1 && numPages > 1) {
      return `${this._generateMarkupNext()}`;
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return `${this._generateMarkupPrev()}`;
    }

    // Other Page
    if (currentPage < numPages && currentPage > 1) {
      return `
        ${this._generateMarkupPrev()}
        ${this._generateMarkupNext()}
      `;
    }
  }
}

export default new PaginationView();
