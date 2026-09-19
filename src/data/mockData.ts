import { ScrapedProduct, DefectItem, TestSuite, ReviewPin } from '../types';

export const HOTLINKED_IMAGES = {
  backpack: "https://lh3.googleusercontent.com/aida-public/AB6AXuAshmr1ptXXLbBoRfNRjqBdFgSjE-c730K4Jg5XFj5claeEeZJmgSQC2Zc6WM9zTEwvHUNm-ZkIXu9AUBzXcKp_q3Smbe7Ms824ScqejHluZzew_lRtmpSbv53ekLFRajwmRtU1i0TYXdqy4oD4-8CXxYF3d9ftTdQ4F9_kGC8SKsnKYd0_TtpqCLziSAlNNJbxKp-jMHTNiRnbfUa1RHICWA0tAxtExmlAEplfcMulwVdYxHYQ4y7SGQ",
  bikeLight: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHeL_Lh55sD2o8HNdDL44o2iFIrnLv-La5zBfZIaP5g_xfMRWZVnVly66DbUPBZtx2QeFRlzNDPcdNYORr0MXyHbsc9RFTde-hFPGQ90wlQVb-cujR_tEtD3x2FY4kuZ-P-a5JqgfGVZFrMgEE7gKLMDYLQKZeM1XDRWts_J1sUwjVoWNbdBj58xl3iDEKeZKWfSEmurWX-o8fuOcNlrtDp28FukKhhBq81YHkCP7NJX08CekxwrI2-Q",
  boltTShirt: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaCTsIsMrsWhMmcds_mFobUyBftLpOXLG2R6HLuExK_N9XI1XcMh5B_AZXG6MHddvyZdMIeoTbx3vEl_occ3m9OjutrmMIZKOVdIKNuea0ERoQduSrMcabPpalecdxP7_oYf_K0Rlmi4j-Ac-X4pG8y_40aeXGDBW_PRoRhlzy0TkL23__BUCwmUB8MRLiQgQ_vYG5ptUz1v8ssitBrFvdUH_Dke3BgINGXg96YAz4D7FP4igm54oesg",
  fleeceJacket: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIUKlwsRGFjvByJyVE1klSII3Z3GUlc1Au90EBpBN8zWFf3xYLoHmN54doV_d-Tq1NHNP9aaAB8QoIweGDWKTgyhVSLngbW_sJ8dmLG8GtY9l0AkMJVx5XL1vrzft-_glU7RyyknPG3rnLIEzFQ4uKF6kF20l28GyI1P1eDUXvLs-XwDmd2dUL8wLJ5Ks2bns6DYaTrpkMNsF1fQQEak3r5Qzczq1zaDp3dGnr2D01v7ylbORv_-Tw2Q",
  onesie: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpYA2uEtcCheLxPFtfxWXoKhCcPMtJbDT5qr7EqfISMbLLp0osrHz1tx_lRMiuHkAkP-aeOoIBD2s7DPoh3A3Gdvb5GIs-hAOMFk4UU_0eWdDOc311Srqebb_jwB8Is6Q0n1zAAsDsBcOg08RBmEf3dCIbVaTwjHsQ4fhTZ6YvumLgRpPrT2IqCWsczd6YymUmW-rK59kpfNHLofa_yEaQT9zgHTbw1oyZzqh5VjYU6SnSRyi-vt08cg",
  redTShirt: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8vCJQWyIz0q-_U5cxXtlRBe-pOHTCsgLdqKvK_UX-dnk8yzA4eAurdUZVWyQqsCT_INtlKuB8sWrFWq9BfKuEWVybAkcL3E1UJ2iB1GHMsibofGzTburhUIGYEWgjrAVBwhdVjsGZ6IB_S7k4eGYsppbmcuOKdbiohGi_Wz67pr5NrA_X5nexx_a7lOZS7bH9p555Q2p71QRTHLtX0RB1zNO1dNnfRaG5cnBuQlnXkxnKTR_aQF83rg",
  checkoutError: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZuZ3IgZXaIr1UNv1Alcd-HZGBNFiwopOv86WwMKkFgAXc9GtT4EK7Oyig0N0kyGCAqY0lpCtd3xCKAwBJWXHvs6WKbBQwe0e-dfcrPBg87WmQViJQPbUHwxo65NZYbLWPqqKXcuz4drR9YzqJVY_oLEejrjNwoGyOC9oI7-eTHBT7csBIA6GocUDvU_nQEmK5x-PcYkpGVpO69NEiR0mGaUdKoXo5yYWdAGxpuOIYek8h6qHHY6lng",
  reviewBackpack: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAT_pgzHKD02jTZ1udGW9BFyumlW7KKNUTUuBNUEMVSWTlMFYXerBJa8k5ibmMef5D8kuZteq0ML7s3-Y0A0cXioAj8NGKurSB9oOm-IqqOsOvHy1MpPiahCDxq-5rMRTq6RIVRS8RDjw0fC_lqiZ6xgYgLZoP2mdPdwkeI9Q9N8oQuzO_1nvUSDyaXq_FtL1JRItieLEoAeNtv6fPfLFs-aZG34Pn5JxOjqt-uq4NDWhDcelyYIJJsw",
  reviewBolt: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7a4jLYh2od4Y_0HzvXF9dsSe_xqTCCgV4Tkr9tPWrQG4ML6DoG3dK_y2w07ayRQizz4Yq4xFQZl8BmUJLkgxZYZHN_hxYk9sMn4E0eIffEc8SBxTh8vraJI766fRlvsULfsOFffVisQATxxa35nEBxwWlbccA3cgbJVdq6IdFG8apReNiCSB3HohuttSdtnnlWJ1yapkTt0oH8Ly_MDjzHl5o83G18MOEhpnETAhlIoW2A7CG3tXVpg",
  reviewJacket: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZpC7H6K_mojwkrA6RNZhl1yANZKiEoXcQiNPvs9Z1dKgf_TewGyS1Mc-LJZI4NBK9lc7krqr48Jo3I8bKG6AuPWxzHPs73kgryMWmV72bO5K7B6MI3L22QDGBaYT0Eek18UXJy9AqMAZJAdoSAe8gTaDS2SMvN0fQCqSLWKLKoNpb3bne3345GjX1D-R3owULRvszFYGOOfhZMEMH_BXrUm_Lznl3gHt1wXo0kohJVMHMp5O06SxUew",
};

export const SCRAPED_PRODUCTS: ScrapedProduct[] = [
  {
    id: 'sauce-labs-backpack',
    itemId: 4,
    name: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with...',
    price: 29.99,
    priceFormatted: '$29.99',
    imageUrl: HOTLINKED_IMAGES.backpack,
    imageAlt: 'A detailed technical close-up photograph of a modern tech backpack inside a stark dark studio with high-contrast moody cyan and crimson side rim-lighting.',
    flagged: true,
    badges: [
      { type: 'broken', label: 'BROKEN IMG: /static/media/sl-404.168b1cce.jpg' },
      { type: 'reused', label: 'REUSED ASSET: same image used on 3 products' }
    ],
    statusText: 'HTTP 404 NOT FOUND'
  },
  {
    id: 'sauce-labs-bike-light',
    itemId: 0,
    name: 'Sauce Labs Bike Light',
    description: "A red light isn't the desired state in testing but it is when cycling! 3 light modes offer...",
    price: 9.99,
    priceFormatted: '$9.99',
    imageUrl: HOTLINKED_IMAGES.bikeLight,
    imageAlt: 'A detailed commercial product shot of a sleek anodized aluminum bicycle safety light with high-intensity LEDs glowing against an obsidian dark tech laboratory surface.',
    flagged: true,
    badges: [
      { type: 'reused', label: 'REUSED ASSET: same image used on 3 products' }
    ],
    statusText: 'sl-404.jpg'
  },
  {
    id: 'sauce-labs-bolt-t-shirt',
    itemId: 1,
    name: 'Sauce Labs Bolt T-Shirt',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. 100% ringspun combed cotton...',
    price: 15.99,
    priceFormatted: '$15.99',
    imageUrl: HOTLINKED_IMAGES.boltTShirt,
    imageAlt: 'A clean product shot of a tailored charcoal black cotton crewneck t-shirt flatlayed on a dark graphite slate surface.',
    flagged: true,
    badges: [
      { type: 'reused', label: 'REUSED ASSET: same image used on 3 products' }
    ],
    statusText: 'sl-404.jpg'
  },
  {
    id: 'sauce-labs-fleece-jacket',
    itemId: 5,
    name: 'Sauce Labs Fleece Jacket',
    description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling...",
    price: 0.00,
    priceFormatted: '$0.00',
    imageUrl: HOTLINKED_IMAGES.fleeceJacket,
    imageAlt: 'A stylish technical dark gray fleece zip-up winter jacket suspended in a minimalist futuristic testing pavilion with dark obsidian walls.',
    flagged: true,
    badges: [
      { type: 'price', label: 'ZERO PRICE: $0.00' }
    ],
    statusText: 'PRICE ANOMALY',
    isPriceStriked: true
  },
  {
    id: 'sauce-labs-onesie',
    itemId: 2,
    name: 'Sauce Labs Onesie',
    description: 'Rib snaps at bottom for easy changing, suitable for automated testing junior apprentices...',
    price: 7.99,
    priceFormatted: '$7.99',
    imageUrl: HOTLINKED_IMAGES.onesie,
    imageAlt: 'A high quality product display of a comfortable infant bodysuit in deep navy fabric laid across a dark geometric surface.',
    flagged: false,
    badges: [
      { type: 'pass', label: 'All 5 Rules Validated' }
    ],
    statusText: 'PASS 200'
  },
  {
    id: 'test-allthethings-t-shirt',
    itemId: 3,
    name: 'Test.allTheThings() T-Shirt (Red)',
    description: 'This classic Sauce Labs t-shirt is perfect for checking locator integrity on custom graphic prints...',
    price: 15.99,
    priceFormatted: '$15.99',
    imageUrl: HOTLINKED_IMAGES.redTShirt,
    imageAlt: 'A clean vibrant crimson red branded t-shirt staged on a sleek matte black podium under precise soft studio lighting.',
    flagged: false,
    badges: [
      { type: 'pass', label: 'All 5 Rules Validated' }
    ],
    statusText: 'PASS 200'
  }
];

export const DEFECTS_DATA: DefectItem[] = [
  {
    id: 'DEF-404',
    title: 'Broken image on Sauce Labs Fleece Jacket (404)',
    area: 'PLP Inventory',
    persona: 'problem_user',
    seenTime: '10m ago',
    firstSeen: '2d ago',
    severity: 'Critical',
    status: 'Open',
    locatorError: 'GET /static/media/sauce-pullover-1200x1500.jpg 404',
    expected: 'Image resolves HTTP 200 OK with valid bitmap dimensions (1200x1500px).',
    actual: 'Image network request fires 404. Fallback missing, broken icon rendered in DOM.',
    steps: [
      '# 1. Login with assigned persona credentials',
      "await page.goto('https://www.saucedemo.com/');",
      "await page.fill('#user-name', 'problem_user');",
      "await page.fill('#password', 'secret_sauce');",
      "await page.click('#login-button');",
      '# 2. Inspect item thumbnail image tag',
      "const img = await page.locator('#item_5_img_link img');",
      "await expect(img).toHaveAttribute('src', '/static/media/sauce-pullover-1200x1500.jpg');"
    ],
    playwrightCode: `const img = await page.locator('#item_5_img_link img');\nawait expect(img).toHaveAttribute('src', '/static/media/sauce-pullover-1200x1500.jpg');`,
    jsonPayload: {
      rule: 'img_broken_src_check',
      selector: '#item_5_img_link > img',
      status_code: 404,
      resource_url: '/static/media/sauce-pullover-1200x1500.jpg',
      timestamp: '2025-02-23T14:32:04Z',
      agent_id: 'agent_alpha_worker_3'
    }
  },
  {
    id: 'DEF-ZERO',
    title: 'Sauce Labs Onesie listed at $0.00 price',
    area: 'PDP',
    persona: 'error_user',
    seenTime: '2m ago',
    firstSeen: '1h ago',
    severity: 'Major',
    status: 'Open',
    locatorError: "Assertion: price != '$0.00' failed in product_item_price",
    expected: 'Price reflects catalog value ($7.99 USD).',
    actual: "Element displays '$0.00' and permits zero-dollar cart checkout.",
    steps: [
      '# 1. Access product details directly via slug',
      "await page.goto('https://www.saucedemo.com/inventory-item.html?id=2');",
      '# 2. Assert inventory item price is non-zero',
      "const price = await page.locator('.inventory_details_price').textContent();",
      "expect(price).not.toBe('$0.00');"
    ],
    playwrightCode: `const price = await page.locator('.inventory_details_price').textContent();\nexpect(price).not.toBe('$0.00');`,
    jsonPayload: {
      rule: 'price_anomaly_detection',
      selector: '.inventory_details_price',
      extracted_value: '$0.00',
      expected_min: '$0.01',
      timestamp: '2025-02-23T14:40:12Z'
    }
  },
  {
    id: 'DEF-LASTNAME',
    title: 'Problem User checkout lastName input broken',
    area: 'Checkout Step 1',
    persona: 'problem_user',
    seenTime: '45m ago',
    firstSeen: '3d ago',
    severity: 'Critical',
    status: 'Open',
    locatorError: 'Input selector #last-name unmodifiable, throws TypeError',
    expected: 'Input field accepts keystrokes and maintains controlled value.',
    actual: 'DOM element input event handler throws Uncaught TypeError: Cannot read properties of undefined.',
    steps: [
      '# 1. Add item and enter checkout step 1',
      "await page.click('#add-to-cart-sauce-labs-backpack');",
      "await page.goto('https://www.saucedemo.com/checkout-step-one.html');",
      '# 2. Attempt typing into lastName',
      "await page.fill('#last-name', 'Doe');"
    ],
    playwrightCode: `await page.fill('#last-name', 'Doe');`,
    jsonPayload: {
      rule: 'input_mutation_integrity',
      selector: '#last-name',
      error_stack: 'TypeError: e.target.value is undefined at onChange',
      timestamp: '2025-02-23T13:58:30Z'
    }
  },
  {
    id: 'DEF-DUP',
    title: 'Duplicate bike-light.jpg used for Red T-shirt',
    area: 'PLP Inventory',
    persona: 'all_users',
    seenTime: '3h ago',
    firstSeen: '5d ago',
    severity: 'Minor',
    status: 'Open',
    locatorError: 'Heuristic perceptual hash mismatch: red-t-shirt -> bike-light',
    expected: 'Unique thumbnail graphic assigned to Red T-Shirt item card.',
    actual: 'Graphic resolves identically to bike-light.jpg thumbnail.',
    steps: [
      '# 1. Fetch item thumbnails for ID 3 and ID 0',
      "const img1 = await page.getAttribute('#item_3_img_link img', 'src');",
      "const img2 = await page.getAttribute('#item_0_img_link img', 'src');",
      'expect(img1).not.toBe(img2);'
    ],
    playwrightCode: `expect(img1).not.toBe(img2);`,
    jsonPayload: {
      rule: 'duplicate_asset_heuristic',
      primary_selector: '#item_3_img_link img',
      collision_with: '#item_0_img_link img',
      pHash_distance: 0
    }
  },
  {
    id: 'DEF-BADGE',
    title: 'Cart badge count fails to decrement on item removal',
    area: 'Cart',
    persona: 'problem_user',
    seenTime: '1d ago',
    firstSeen: '4d ago',
    severity: 'Major',
    status: 'Fixed',
    locatorError: 'Resolved in build commit #fa8932c',
    expected: 'Badge counter decrements from 2 to 1 in real time.',
    actual: "Badge retained static textContent '2' until hard reload.",
    steps: [
      '# 1. Add 2 items, then remove 1 item',
      "await page.click('#remove-sauce-labs-backpack');",
      "const badge = await page.locator('.shopping_cart_badge').textContent();",
      "expect(badge).toBe('1');"
    ],
    playwrightCode: `expect(badge).toBe('1');`,
    jsonPayload: {
      rule: 'state_decrement_verification',
      commit_fix: 'fa8932c',
      status: 'VERIFIED_RESOLVED'
    }
  }
];

export const TEST_SUITES: TestSuite[] = [
  {
    id: 'suite-1',
    title: '1. Authentication Flow',
    specPath: 'tests/auth.spec.ts',
    passRatio: '3/3 Pass',
    duration: '420ms',
    status: 'pass',
    steps: [
      { stepNumber: 1, status: 'PASS', command: "page.goto('/')", durationMs: 110 },
      { stepNumber: 2, status: 'PASS', command: "page.fill('#user-name', 'standard_user')", durationMs: 65 },
      { stepNumber: 3, status: 'PASS', command: "page.fill('#password', 'secret_sauce')", durationMs: 50 },
      { stepNumber: 4, status: 'PASS', command: "page.click('#login-button')", durationMs: 140 },
      { stepNumber: 5, status: 'PASS', command: "expect(page.url()).toContain('/inventory.html')", durationMs: 55 }
    ]
  },
  {
    id: 'suite-2',
    title: '2. Add to Cart & Inventory',
    specPath: 'tests/cart.spec.ts',
    passRatio: '2/2 Pass',
    duration: '310ms',
    status: 'pass',
    steps: [
      { stepNumber: 1, status: 'PASS', command: "page.goto('/inventory.html')", durationMs: 95 },
      { stepNumber: 2, status: 'PASS', command: "page.click('[data-test=\"add-to-cart-sauce-labs-backpack\"]')", durationMs: 80 },
      { stepNumber: 3, status: 'PASS', command: "expect(page.locator('.shopping_cart_badge')).toHaveText('1')", durationMs: 65 },
      { stepNumber: 4, status: 'PASS', command: "page.click('[data-test=\"add-to-cart-sauce-labs-bike-light\"]')", durationMs: 70 }
    ]
  },
  {
    id: 'suite-3',
    title: '3. Multi-Step Checkout Journey',
    specPath: 'tests/checkout.spec.ts',
    passRatio: '1/2 Fail',
    duration: '980ms',
    status: 'fail',
    subtitle: 'problem_user fails at postalCode',
    steps: [
      { stepNumber: 1, status: 'PASS', command: "page.goto('/inventory.html')", durationMs: 210 },
      { stepNumber: 2, status: 'PASS', command: "page.click('[data-test=\"add-to-cart-sauce-labs-backpack\"]')", durationMs: 145 },
      { stepNumber: 3, status: 'PASS', command: "page.click('.shopping_cart_link')", durationMs: 180 },
      { stepNumber: 4, status: 'PASS', command: "page.click('[data-test=\"checkout\"]')", durationMs: 160 },
      { stepNumber: 5, status: 'PASS', command: "page.fill('[data-test=\"firstName\"]', 'Jane')", highlightArg: "'Jane'", durationMs: 90 },
      { stepNumber: 6, status: 'ERROR', command: "page.fill('[data-test=\"lastName\"]', 'Doe')", highlightArg: "'Doe'", durationMs: 195, note: 'Input field rejected keystrokes / value empty' },
      { stepNumber: 7, status: 'FAIL', command: "page.click('[data-test=\"continue\"]')", durationMs: 0, note: "Form error banner 'Error: Last Name is required'" }
    ],
    stackTrace: `Error: expect(received).toBe(expected) // Object.is equality

Expected: "https://www.saucedemo.com/checkout-step-two.html"
Received: "https://www.saucedemo.com/checkout-step-one.html"

Call log:
  - waiting for locator('[data-test="continue"]')
  - locator resolved to <input type="submit" value="Continue" data-test="continue"/>
  - attempting click action
  - waiting for element to be visible, enabled and stable
  - element is visible, enabled and stable
  - scrolling into view if needed
  - done with click action
  - waiting for navigation to "**/checkout-step-two.html"
  - DOM error message observed: "Error: Last Name is required"
    at CheckoutPage.continue (/tests/pages/checkout.ts:32:21)
    at /tests/specs/checkout.spec.ts:58:24`,
    domSnapshot: `<!-- Captured DOM State at Failure: problem_user lock -->
<div class="checkout_info">
  <input id="first-name" data-test="firstName" value="Jane" />
  <input id="last-name" data-test="lastName" value="" class="input_error form_input error" />
  <input id="postal-code" data-test="postalCode" disabled />
  <h3 data-test="error"><span class="text-error font-bold">Error: Last Name is required</span></h3>
</div>`,
    screenshotUrl: HOTLINKED_IMAGES.checkoutError,
    hotspotLabel: 'Element: [data-test="lastName"] problem_user Bug Verified'
  },
  {
    id: 'suite-4',
    title: '4. Error State & Edge Cases',
    specPath: 'tests/edge_cases.spec.ts',
    passRatio: '4/4 Pass',
    duration: '890ms',
    status: 'pass',
    steps: [
      { stepNumber: 1, status: 'PASS', command: "page.goto('/inventory-item.html?id=999')", durationMs: 240 },
      { stepNumber: 2, status: 'PASS', command: "expect(page.locator('.error-message-container')).toBeVisible()", durationMs: 120 },
      { stepNumber: 3, status: 'PASS', command: "page.click('#back-to-products')", durationMs: 190 },
      { stepNumber: 4, status: 'PASS', command: "expect(page.locator('.inventory_list')).toBeVisible()", durationMs: 140 }
    ]
  },
  {
    id: 'suite-5',
    title: '5. Cart Badge Mutation',
    specPath: 'tests/badge_sync.spec.ts',
    passRatio: 'Fail - desync',
    duration: '180ms',
    status: 'fail',
    subtitle: 'Cart count mismatch after rapid item deletions',
    steps: [
      { stepNumber: 1, status: 'PASS', command: "page.goto('/cart.html')", durationMs: 90 },
      { stepNumber: 2, status: 'FAIL', command: "page.click('#remove-sauce-labs-backpack')", durationMs: 90, note: 'Badge counter remains 2 instead of decrementing to 1' }
    ]
  }
];

export const REVIEW_PINS: ReviewPin[] = [
  {
    id: 1,
    title: 'Missing inventory item image',
    description: 'Image source returns 404; container collapses to 0x0px causing layout shifts during responsive resizing on staging.',
    severity: 'CRITICAL',
    severityClass: 'bg-error/15 text-[#fb7185] border-error/30',
    badgeBg: 'bg-error text-on-error',
    selector: '#inventory_container > div:nth-child(2) img.inventory_item_img',
    targetUrl: '/inventory.html',
    author: 'QA Engineer - Alex',
    timestamp: 'Today, 14:32:09',
    tag: '<IMG> (404 ERROR)',
    page: 'inventory'
  },
  {
    id: 2,
    title: '$0.00 Corrupted Product Price',
    description: 'Bolt T-Shirt pricing element renders zero dollars due to faulty currency conversion service payload in staging catalog database.',
    severity: 'HIGH',
    severityClass: 'bg-[#facc15]/15 text-[#facc15] border-[#facc15]/30',
    badgeBg: 'bg-[#facc15] text-[#051424]',
    selector: '.inventory_item:nth-child(3) .inventory_item_price',
    targetUrl: '/inventory.html',
    author: 'QA Engineer - Maria',
    timestamp: 'Today, 13:48:15',
    tag: '<DIV.PRICE> (NUMERIC DISCREPANCY)',
    page: 'inventory'
  },
  {
    id: 3,
    title: 'Misaligned / Overflowing Button',
    description: 'CSS flex layout breaks on jacket item card; Add to Cart button translates out of bounds and overlaps adjacent card boundaries.',
    severity: 'MEDIUM',
    severityClass: 'bg-primary/15 text-primary border-primary/30',
    badgeBg: 'bg-primary text-on-primary',
    selector: '#inventory_container button.btn_inventory',
    targetUrl: '/inventory.html',
    author: 'Frontend QA - David',
    timestamp: 'Today, 11:15:40',
    tag: '<BUTTON> (CSS OVERFLOW)',
    page: 'inventory'
  }
];
