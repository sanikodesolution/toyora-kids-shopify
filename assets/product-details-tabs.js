if (!customElements.get("m-product-details-tabs")) {
  class MProductDetailsTabs extends HTMLElement {
    constructor() {
      super();
      this.tabs = new MinimogTheme.Tabs(this);
      this.querySelectorAll("[data-toyora-readmore]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const desc = this.closest(".m-tab-content__inner").querySelector("[data-toyora-desc]");
          if (!desc) return;
          const open = desc.classList.toggle("is-expanded");
          this.classList.toggle("is-open", open);
          const label = this.querySelector("span");
          if (label) label.textContent = open ? "Read Less" : "Read More";
        });
      });
      this.querySelectorAll("[data-toyora-faq]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const item = this.closest(".toyora-faq__item");
          if (!item) return;
          const open = item.classList.toggle("is-open");
          this.setAttribute("aria-expanded", open ? "true" : "false");
        });
      });

      if (Shopify.designMode) {
        document.addEventListener("shopify:block:select", (event) => {
          const tabHeader = event && event.target;
          const index = (tabHeader && Number(tabHeader.dataset.index)) || 0;
          this.tabs && this.tabs.setActiveTab(index);
        });
      }
    }

    openReviewsTab() {
      const header = this.querySelector('.m-tab-header[data-block-type="reviews"]');
      if (!header) return;
      const index = Number(header.dataset.index);
      if (this.tabs && !Number.isNaN(index)) {
        this.tabs.setActiveTab(index);
      } else {
        header.click();
      }
      this.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  customElements.define("m-product-details-tabs", MProductDetailsTabs);

  if (!window.toyoraReviewsBound) {
    window.toyoraReviewsBound = true;
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-toyora-open-reviews]");
      if (!trigger) return;
      event.preventDefault();
      const tabs = document.querySelector("m-product-details-tabs");
      if (tabs && typeof tabs.openReviewsTab === "function") {
        tabs.openReviewsTab();
      } else if (tabs) {
        const header = tabs.querySelector('.m-tab-header[data-block-type="reviews"]');
        if (header) header.click();
        tabs.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}
