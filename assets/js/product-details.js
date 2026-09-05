let flowerCategory = 'Fuzzy Wire';
let selectedFlowers = {};
let selectedFillers = {};
let selectedColors = [];
let selectedWrapper = WRAPPER_OPTIONS[0];
let selectedRibbon = SATIN_COLORS_DATA[0];
let selectedAddons = {};
let inspoPhotoData = null;
let customNotes = '';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const flowerId = urlParams.get('flower');
  const catParam = urlParams.get('category');
  if (catParam) flowerCategory = catParam;

  if (flowerId) {
    const fw = typeof FUZZY_WIRE_FLOWERS !== 'undefined' ? FUZZY_WIRE_FLOWERS.find(f => f.id === flowerId) : null;
    if (fw) {
      flowerCategory = 'Fuzzy Wire';
      selectedFlowers[fw.id] = { flowerObj: fw, qty: 1 };
    }
    const sr = typeof SATIN_RIBBON_FLOWERS !== 'undefined' ? SATIN_RIBBON_FLOWERS.find(f => f.id === flowerId) : null;
    if (sr) {
      flowerCategory = 'Satin Ribbon';
      selectedFlowers[sr.id] = { flowerObj: sr, qty: 1 };
    }
    const fl = typeof FILLERS_DATA !== 'undefined' ? FILLERS_DATA.find(f => f.id === flowerId) : null;
    if (fl) {
      flowerCategory = 'Fillers';
      selectedFillers[fl.id] = { fillerObj: fl, qty: 1 };
    }
  }

  renderCategoryTabs();
  renderUnifiedSelectionGrid();
  setupInspoUpload();
  renderActionButtons();
  calculateGrandTotal();
});

function renderCategoryTabs() {
  const container = document.getElementById('flower-cat-tabs');
  if (!container) return;

  container.innerHTML = `
    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-sm ${flowerCategory === 'Fuzzy Wire' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-fuzzy">
        <i class="bi bi-flower1 me-1"></i> Fuzzy Wire
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Satin Ribbon' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-satin">
        <i class="bi bi-ribbon me-1"></i> Satin Ribbon
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Colors' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-colors">
        <i class="bi bi-palette me-1"></i> Color Shades
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Fillers' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-fillers">
        <i class="bi bi-leaf me-1"></i> Fillers
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Wrappers' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-wrappers">
        <i class="bi bi-box-seam me-1"></i> Wrappers
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Ribbons' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-ribbons">
        <i class="bi bi-bookmark-heart me-1"></i> Ribbons
      </button>
      <button class="btn btn-sm ${flowerCategory === 'Addons' ? 'btn-bloom-primary' : 'btn-bloom-outline'}" id="tab-addons">
        <i class="bi bi-gift me-1"></i> Add-ons
      </button>
    </div>
  `;

  document.getElementById('tab-fuzzy').addEventListener('click', () => { flowerCategory = 'Fuzzy Wire'; updateBuilderView(); });
  document.getElementById('tab-satin').addEventListener('click', () => { flowerCategory = 'Satin Ribbon'; updateBuilderView(); });
  document.getElementById('tab-colors').addEventListener('click', () => { flowerCategory = 'Colors'; updateBuilderView(); });
  document.getElementById('tab-fillers').addEventListener('click', () => { flowerCategory = 'Fillers'; updateBuilderView(); });
  document.getElementById('tab-wrappers').addEventListener('click', () => { flowerCategory = 'Wrappers'; updateBuilderView(); });
  document.getElementById('tab-ribbons').addEventListener('click', () => { flowerCategory = 'Ribbons'; updateBuilderView(); });
  document.getElementById('tab-addons').addEventListener('click', () => { flowerCategory = 'Addons'; updateBuilderView(); });
}

function updateBuilderView() {
  renderCategoryTabs();
  renderUnifiedSelectionGrid();
  calculateGrandTotal();
}

function renderUnifiedSelectionGrid() {
  const container = document.getElementById('flower-selection-grid');
  if (!container) return;

  if (flowerCategory === 'Fuzzy Wire') {
    renderItemsGrid(container, FUZZY_WIRE_FLOWERS, selectedFlowers, 'flower');
  } else if (flowerCategory === 'Satin Ribbon') {
    renderItemsGrid(container, SATIN_RIBBON_FLOWERS, selectedFlowers, 'flower');
  } else if (flowerCategory === 'Colors') {
    renderFuzzyColorsTab(container);
  } else if (flowerCategory === 'Fillers') {
    renderItemsGrid(container, FILLERS_DATA, selectedFillers, 'filler');
  } else if (flowerCategory === 'Wrappers') {
    renderWrappersTab(container);
  } else if (flowerCategory === 'Ribbons') {
    renderRibbonsTab(container);
  } else if (flowerCategory === 'Addons') {
    renderAddonsTab(container);
  }
}

function renderItemsGrid(container, dataset, selectedMap, type) {
  container.innerHTML = dataset.map(item => {
    const isSelected = !!selectedMap[item.id];
    const qty = isSelected ? selectedMap[item.id].qty : 1;

    return `
      <div class="col-6 col-md-4 col-lg-3 mb-3">
        <div class="item-select-card ${isSelected ? 'selected' : ''}" data-id="${item.id}">
          <div class="item-check-indicator"><i class="bi bi-check"></i></div>
          <div class="item-card-img-wrapper">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-card-body p-2 text-center">
            <div class="item-card-name small fw-bold text-truncate">${item.name}</div>
            <div class="item-card-price text-dark-rose small fw-bold">${formatCurrency(item.price)} / pc</div>

            <div class="mt-2 pt-2 border-top d-flex align-items-center justify-content-center" onclick="event.stopPropagation();">
              <div class="quantity-control">
                <button type="button" class="quantity-btn" onclick="updateItemQuantity('${type}', '${item.id}', ${qty - 1})">-</button>
                <input type="text" class="quantity-input" value="${qty}" readonly />
                <button type="button" class="quantity-btn" onclick="updateItemQuantity('${type}', '${item.id}', ${qty + 1})">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.item-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = dataset.find(i => i.id === id);

      if (selectedMap[id]) {
        delete selectedMap[id];
      } else {
        selectedMap[id] = { [type === 'filler' ? 'fillerObj' : 'flowerObj']: item, qty: 1 };
      }
      renderUnifiedSelectionGrid();
      calculateGrandTotal();
    });
  });
}

function updateItemQuantity(type, id, newQty) {
  const selectedMap = (type === 'filler') ? selectedFillers : selectedFlowers;
  const dataset = (type === 'filler') ? FILLERS_DATA : ((flowerCategory === 'Fuzzy Wire') ? FUZZY_WIRE_FLOWERS : SATIN_RIBBON_FLOWERS);

  if (newQty <= 0) {
    delete selectedMap[id];
  } else {
    if (!selectedMap[id]) {
      const item = dataset.find(i => i.id === id);
      selectedMap[id] = { [type === 'filler' ? 'fillerObj' : 'flowerObj']: item, qty: newQty };
    } else {
      selectedMap[id].qty = newQty;
    }
  }
  renderUnifiedSelectionGrid();
  calculateGrandTotal();
}

function renderFuzzyColorsTab(container) {
  container.innerHTML = `
    <div class="col-12 mb-3">
      <label class="form-label small fw-bold text-dark-rose">Select Fuzzy Wire Color Shades:</label>
      <select class="form-select form-select-sm" id="color-select-dropdown">
        <option value="">-- Choose Fuzzy Wire Color --</option>
        ${FUZZY_COLORS_DATA.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
      </select>
    </div>

    ${FUZZY_COLORS_DATA.map(c => {
      const isSelected = selectedColors.includes(c.name);
      return `
        <div class="col-4 col-md-3 col-lg-2 mb-3">
          <div class="color-swatch-card ${isSelected ? 'active' : ''}" data-color="${c.name}">
            <div class="swatch-img-box mb-1" style="height: 65px; border-radius: 8px; overflow: hidden; background: #fff; border: 1.5px solid var(--pink-soft);">
              <img src="${c.image}" alt="${c.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div class="small fw-bold text-center text-truncate px-1" style="font-size: 0.75rem; color: #25161c;">${c.name}</div>
          </div>
        </div>
      `;
    }).join('')}
  `;

  const dropdown = document.getElementById('color-select-dropdown');
  if (dropdown) {
    dropdown.addEventListener('change', (e) => {
      const val = e.target.value;
      if (!val) return;
      if (!selectedColors.includes(val)) selectedColors.push(val);
      renderFuzzyColorsTab(container);
      calculateGrandTotal();
    });
  }

  container.querySelectorAll('.color-swatch-card').forEach(card => {
    card.addEventListener('click', () => {
      const colorName = card.getAttribute('data-color');
      const idx = selectedColors.indexOf(colorName);
      if (idx >= 0) selectedColors.splice(idx, 1);
      else selectedColors.push(colorName);

      renderFuzzyColorsTab(container);
      calculateGrandTotal();
    });
  });
}

function renderWrappersTab(container) {
  container.innerHTML = WRAPPER_OPTIONS.map(wrapper => `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="wrapper-swatch-card ${selectedWrapper.id === wrapper.id ? 'active' : ''}" data-id="${wrapper.id}">
        <div class="swatch-img-box mb-2 p-1" style="height: 135px; border-radius: 14px; overflow: hidden; background: #fff; border: 1px solid var(--pink-soft); display: flex; align-items: center; justify-content: center;">
          <img src="${wrapper.image}" alt="${wrapper.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />
        </div>
        <div class="fw-bold small mb-1 text-center">${wrapper.name}</div>
        <small class="text-muted d-block text-center">${wrapper.price > 0 ? '+' + formatCurrency(wrapper.price) : 'Standard'}</small>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.wrapper-swatch-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      selectedWrapper = WRAPPER_OPTIONS.find(w => w.id === id);
      renderWrappersTab(container);
      calculateGrandTotal();
    });
  });
}

function renderRibbonsTab(container) {
  container.innerHTML = `
    <div class="col-12 mb-3">
      <label class="form-label small fw-bold text-dark-rose">Select Satin Ribbon Style / Color for Tying Bouquet:</label>
      <select class="form-select form-select-sm" id="ribbon-select-dropdown">
        ${SATIN_COLORS_DATA.map(r => `<option value="${r.name}" ${selectedRibbon.name === r.name ? 'selected' : ''}>${r.name}</option>`).join('')}
      </select>
    </div>

    ${SATIN_COLORS_DATA.map(ribbon => `
      <div class="col-6 col-md-4 col-lg-3 mb-3">
        <div class="wrapper-swatch-card ${selectedRibbon.name === ribbon.name ? 'active' : ''}" data-name="${ribbon.name}">
          <div class="swatch-img-box mb-2" style="height: 105px; border-radius: 12px; overflow: hidden; background: #fff; border: 1.5px solid var(--pink-soft);">
            <img src="${ribbon.image}" alt="${ribbon.name}" class="w-100 h-100" style="object-fit: cover; display: block;" />
          </div>
          <div class="fw-bold small mb-1 text-center">${ribbon.name}</div>
          <small class="text-muted d-block text-center">Included</small>
        </div>
      </div>
    `).join('')}
  `;

  const dropdown = document.getElementById('ribbon-select-dropdown');
  if (dropdown) {
    dropdown.addEventListener('change', (e) => {
      const name = e.target.value;
      selectedRibbon = SATIN_COLORS_DATA.find(r => r.name === name) || SATIN_COLORS_DATA[0];
      renderRibbonsTab(container);
      calculateGrandTotal();
    });
  }

  container.querySelectorAll('.wrapper-swatch-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      selectedRibbon = SATIN_COLORS_DATA.find(r => r.name === name) || SATIN_COLORS_DATA[0];
      renderRibbonsTab(container);
      calculateGrandTotal();
    });
  });
}

function renderAddonsTab(container) {
  container.innerHTML = CRAFT_ADDONS.map(addon => {
    const isSelected = !!selectedAddons[addon.id];
    const imageHTML = addon.image
      ? `<div class="item-card-img-wrapper mb-2" style="height: 90px;"><img src="${addon.image}" alt="${addon.name}" /></div>`
      : `<div class="my-2 text-center"><i class="bi ${addon.icon} fs-2 text-pink"></i></div>`;

    return `
      <div class="col-6 col-md-4 col-lg-4 mb-3">
        <div class="item-select-card ${isSelected ? 'selected' : ''}" data-id="${addon.id}">
          <div class="item-check-indicator"><i class="bi bi-check"></i></div>
          ${imageHTML}
          <div class="item-card-body p-2 text-center">
            <div class="item-card-name small fw-bold">${addon.name}</div>
            <div class="item-card-price text-dark-rose small fw-bold">+${formatCurrency(addon.price)}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.item-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const addon = CRAFT_ADDONS.find(a => a.id === id);

      if (selectedAddons[id]) delete selectedAddons[id];
      else selectedAddons[id] = addon;

      renderAddonsTab(container);
      calculateGrandTotal();
    });
  });
}

function setupInspoUpload() {
  const input = document.getElementById('inspo-file-input');
  const preview = document.getElementById('inspo-preview-img');
  const notesInput = document.getElementById('custom-notes-input');

  if (input) {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          inspoPhotoData = evt.target.result;
          if (preview) {
            preview.src = inspoPhotoData;
            preview.style.display = 'block';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (notesInput) {
    notesInput.addEventListener('input', (e) => {
      customNotes = e.target.value;
    });
  }
}

function calculateGrandTotal() {
  let flowersTotal = 0;
  let flowerItemsList = [];
  Object.values(selectedFlowers).forEach(item => {
    const cost = item.flowerObj.price * item.qty;
    flowersTotal += cost;
    flowerItemsList.push(`${item.flowerObj.name} (${item.qty}x @ ${formatCurrency(item.flowerObj.price)})`);
  });

  let fillersTotal = 0;
  let fillerItemsList = [];
  Object.values(selectedFillers).forEach(item => {
    const cost = item.fillerObj.price * item.qty;
    fillersTotal += cost;
    fillerItemsList.push(`${item.fillerObj.name} (${item.qty}x)`);
  });

  const wrapperCost = selectedWrapper ? selectedWrapper.price : 0;
  const ribbonName = selectedRibbon ? selectedRibbon.name : 'Cream';

  let addonsTotal = 0;
  let addonsList = [];
  Object.values(selectedAddons).forEach(addon => {
    addonsTotal += addon.price;
    addonsList.push(addon.name);
  });

  const chosenColorsList = [...selectedColors];

  const materialsSubtotal = flowersTotal + fillersTotal + wrapperCost + addonsTotal;

  const laborFee = Math.round(materialsSubtotal * 0.15);
  const grandTotal = materialsSubtotal + laborFee;

  const breakdownContainer = document.getElementById('craft-itemized-summary');
  if (breakdownContainer) {
    let html = `
      <div class="itemized-row d-flex justify-content-between mb-1">
        <span>Flowers Material (${Object.keys(selectedFlowers).length} types)</span>
        <span class="fw-bold">${formatCurrency(flowersTotal)}</span>
      </div>
      <div class="itemized-row d-flex justify-content-between mb-1">
        <span>Fillers Material (${Object.keys(selectedFillers).length} types)</span>
        <span class="fw-bold">${formatCurrency(fillersTotal)}</span>
      </div>
      <div class="itemized-row d-flex justify-content-between mb-1">
        <span>Wrapper (${selectedWrapper.name})</span>
        <span class="fw-bold">${wrapperCost > 0 ? '+' + formatCurrency(wrapperCost) : 'Free'}</span>
      </div>
      <div class="itemized-row d-flex justify-content-between mb-1">
        <span>Ribbon (${ribbonName})</span>
        <span class="fw-bold">Included</span>
      </div>
      <div class="itemized-row d-flex justify-content-between mb-1">
        <span>Optional Add-ons (${Object.keys(selectedAddons).length})</span>
        <span class="fw-bold">${formatCurrency(addonsTotal)}</span>
      </div>
      <div class="itemized-row d-flex justify-content-between text-primary mb-1">
        <span>Labor & Craft Fee (15%)</span>
        <span class="fw-bold">+${formatCurrency(laborFee)}</span>
      </div>
    `;

    if (chosenColorsList.length > 0) {
      html += `
        <div class="small text-muted mt-2 pt-2 border-top">
          <strong>Chosen Color Palette:</strong> ${chosenColorsList.join(', ')}
        </div>
      `;
    }

    breakdownContainer.innerHTML = html;
  }

  const grandTotalEl = document.getElementById('craft-grand-total');
  if (grandTotalEl) grandTotalEl.textContent = formatCurrency(grandTotal);

  return {
    flowersTotal,
    fillersTotal,
    wrapperCost,
    addonsTotal,
    laborFee,
    grandTotal,
    flowerItemsList,
    fillerItemsList,
    chosenColorsList,
    ribbonName
  };
}

function renderActionButtons() {
  const container = document.getElementById('craft-action-buttons-container');
  if (!container) return;

  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;

  if (buyer) {
    container.innerHTML = `
      <button class="btn-bloom-primary py-3" id="btn-craft-add-cart">
        <i class="bi bi-cart-plus-fill me-1"></i> Add Custom Bouquet to Cart
      </button>
      <button class="btn-bloom-dark py-2.5" id="btn-craft-buy-now">
        <i class="bi bi-lightning-charge-fill me-1"></i> Proceed to Order Form
      </button>
    `;
    setupActionButtons();
  } else {
    container.innerHTML = `
      <button class="btn btn-bloom-outline py-2.5 w-100 rounded-pill fw-semibold" onclick="openBuyerLoginModal()" style="font-size: 0.88rem; border-width: 1.5px;">
        <i class="bi bi-lock-fill me-1 text-pink"></i> Log In to Add to Cart
      </button>
      <div class="text-center mt-1">
        <small class="text-muted" style="font-size: 0.74rem;">Log in to your buyer account to save and order this custom bouquet.</small>
      </div>
    `;
  }
}

function setupActionButtons() {
  const btnAddToCart = document.getElementById('btn-craft-add-cart');
  const btnBuyNow = document.getElementById('btn-craft-buy-now');

  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', () => {
      const cartObj = buildCustomCraftCartObject();
      if (!cartObj) return;
      addToCart(cartObj);
    });
  }

  if (btnBuyNow) {
    btnBuyNow.addEventListener('click', () => {
      const cartObj = buildCustomCraftCartObject();
      if (!cartObj) return;
      const added = addToCart(cartObj);
      if (added) {
        window.location.href = 'checkout.html';
      }
    });
  }
}

function buildCustomCraftCartObject() {
  if (Object.keys(selectedFlowers).length === 0 && Object.keys(selectedFillers).length === 0) {
    showToast("Please select at least 1 flower stem or filler to build your bouquet!", "danger");
    return null;
  }

  const calc = calculateGrandTotal();

  const addOnsList = Object.values(selectedAddons).map(a => ({ name: a.name, price: a.price }));

  return {
    productId: 'custom-craft-' + Date.now(),
    name: `Custom ${flowerCategory} Handcrafted Bouquet`,
    category: flowerCategory,
    image: Object.values(selectedFlowers)[0]?.flowerObj?.image || Object.values(selectedFillers)[0]?.fillerObj?.image || "assets/images/fw-1.png",
    basePrice: calc.flowersTotal,
    unitPrice: calc.grandTotal,
    color: calc.chosenColorsList.join(', ') || "Custom Choice",
    size: `${Object.keys(selectedFlowers).length} Flower Types`,
    wrapper: selectedWrapper.name,
    ribbon: calc.ribbonName,
    addOns: addOnsList,
    flowerDetails: calc.flowerItemsList,
    fillerDetails: calc.fillerItemsList,
    quantity: 1,
    inspoPhoto: inspoPhotoData,
    notes: customNotes
  };
}
