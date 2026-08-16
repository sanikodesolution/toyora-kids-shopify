if (!customElements.get("m-product-details-tabs")) {
  class MProductDetailsTabs extends HTMLElement {
    constructor() {
      super();
      this.tabs = new MinimogTheme.Tabs(this);
      this.querySelectorAll("[data-toyora-readmore]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const wrap = btn.closest(".m-tab-content__inner").querySelector("[data-toyora-desc]");
          if (!wrap) return;
          const open = wrap.classList.toggle("is-expanded");
          btn.classList.toggle("is-open", open);
          const label = btn.querySelector("span");
          if (label) label.textContent = open ? "Read Less" : "Read More";
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
  }
  customElements.define("m-product-details-tabs", MProductDetailsTabs);
}
