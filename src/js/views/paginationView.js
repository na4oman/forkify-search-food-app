import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    // console.log(this._data); // -> state.search obj
    const { results, curPage, resultsPerPage } = this._data;

    const numPages = Math.ceil(results.length / resultsPerPage);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this.#generateNextButton(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this.#generatePrevButton(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return `${this.#generatePrevButton(curPage)}${this.#generateNextButton(
        curPage
      )}`;
    }

    // Page 1, no other pages
    return '';
  }

  // type is 'prev' or 'next'
  #generatePrevButton(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
  }

  #generateNextButton(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
