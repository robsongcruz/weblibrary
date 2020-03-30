export async function getLeftMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      divider: true,
    },
    {
      title: 'Catalog',
      key: 'home',
      url: '/home/',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Book',
      key: 'book',
      icon: 'icmn icmn-menu',
      children: [
        {
          title: 'Listing',
          key: 'book-list',
          url: '/book-list',
        },
        {
          key: 'book-edit',
          title: 'Register',
          url: '/book-edit',
        },
        /* {
          key: 'book-link',
          title: 'Link Author',
          url: '/book-link',
        }, */
      ],
    },
    {
      title: 'Author',
      key: 'author',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'author-list',
          title: 'Listing',
          url: '/author-list',
        },
        {
          key: 'author-edit',
          title: 'Register',
          url: '/author-edit',
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'AntDesign Components',
      key: 'antComponents',
      icon: 'icmn icmn-menu',
      url: '/pages/antd',
    },
    {
      title: 'Icons',
      key: 'icons',
      icon: 'icmn icmn-star-full',
      children: [
        {
          title: 'FontAwesome',
          key: 'fontAwesome',
          url: '/icons/fontawesome',
        },
        {
          title: 'Linear',
          key: 'linear',
          url: '/icons/linear',
        },
        {
          title: 'Icomoon',
          key: 'icoMoon',
          url: '/icons/icomoon',
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Dashboard Beta',
      key: 'dashboardBeta',
      url: '/dashboard/beta',
      icon: 'icmn icmn-home',
      pro: true,
    },
    {
      title: 'Dashboard Crypto',
      key: 'dashboardCrypto',
      url: '/dashboard/crypto',
      icon: 'icmn icmn-home',
      pro: true,
    },
    {
      title: 'Dashboard Gamma',
      key: 'dashboardGamma',
      url: '/dashboard/gamma',
      icon: 'icmn icmn-home',
      pro: true,
    },
    {
      title: 'Dashboard Docs',
      key: 'dashboardDocs',
      url: '/dashboard/docs',
      icon: 'icmn icmn-home',
      pro: true,
    },
    {
      divider: true,
    },
    {
      title: 'Default Pages',
      key: 'defaultPages',
      icon: 'icmn icmn-file-text',
      children: [
        {
          key: 'loginAlpha',
          title: 'Login Alpha',
          url: '/pages/login-alpha',
          pro: true,
        },
        {
          key: 'loginBeta',
          title: 'Login Beta',
          url: '/pages/login-beta',
          pro: true,
        },
        {
          key: 'register',
          title: 'Register',
          url: '/pages/register',
          pro: true,
        },
        {
          key: 'lockscreen',
          title: 'Lockscreen',
          url: '/pages/lockscreen',
          pro: true,
        },
        {
          key: 'pricingTable',
          title: 'Pricing Tables',
          url: '/pages/pricing-table',
          pro: true,
        },
        {
          key: 'invoice',
          title: 'Invoice',
          url: '/pages/invoice',
          pro: true,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Charts',
      key: 'charts',
      icon: 'icmn icmn-stats-bars',
      children: [
        {
          title: 'Chartist',
          key: 'chartist',
          url: '/charts/chartist',
        },
        {
          title: 'Chart',
          key: 'chart',
          url: '/charts/chart',
          pro: true,
        },
        {
          title: 'Peity',
          key: 'peity',
          url: '/charts/peity',
          pro: true,
        },
        {
          title: 'C3',
          key: 'c3',
          url: '/charts/c3',
          pro: true,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Apps',
      key: 'apps',
      icon: 'icmn icmn-database',
      children: [
        {
          title: 'Messaging',
          key: 'messaging',
          url: '/apps/messaging',
          pro: true,
        },
        {
          title: 'Mail',
          key: 'mail',
          url: '/apps/mail',
          pro: true,
        },
        {
          title: 'Profile',
          key: 'profile',
          url: '/apps/profile',
          pro: true,
        },
        {
          title: 'Gallery',
          key: 'gallery',
          url: '/apps/gallery',
          pro: true,
        },
      ],
    },
    {
      title: 'Ecommerce',
      key: 'ecommerce',
      icon: 'icmn icmn-cart',
      children: [
        {
          title: 'Dashboard',
          key: 'dashboard',
          url: '/ecommerce/dashboard',
          pro: true,
        },
        {
          title: 'Products Catalog',
          key: 'productsCatalog',
          url: '/ecommerce/products-catalog',
          pro: true,
        },
        {
          title: 'Products Details',
          key: 'productsDetails',
          url: '/ecommerce/product-details',
          pro: true,
        },
        {
          title: 'Products Edit',
          key: 'productsEdit',
          url: '/ecommerce/product-edit',
          pro: true,
        },
        {
          title: 'Products List',
          key: 'productsList',
          url: '/ecommerce/products-list',
          pro: true,
        },
        {
          title: 'Orders',
          key: 'orders',
          url: '/ecommerce/orders',
          pro: true,
        },
        {
          title: 'Cart',
          key: 'cart',
          url: '/ecommerce/cart',
          pro: true,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Mail Templates',
      key: 'mailTemplates',
      url: '/layout/mail-templates',
      icon: 'icmn icmn-envelop',
      pro: true,
    },
    {
      title: 'Bootstrap Grid',
      key: 'bootstrap',
      url: '/layout/bootstrap',
      icon: 'icmn icmn-html-five',
    },
    {
      title: 'Bootstrap Card',
      key: 'card',
      url: '/layout/card',
      icon: 'icmn icmn-stack',
    },
    {
      title: 'Typography',
      key: 'typography',
      url: '/layout/typography',
      icon: 'icmn icmn-font-size',
    },
    {
      title: 'Utilities',
      key: 'utilities',
      url: '/layout/utilities',
      icon: 'icmn icmn-magic-wand',
    },
    {
      divider: true,
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Main List',
      key: 'home',
      url: '/home/',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Book',
      key: 'book',
      icon: 'icmn icmn-menu',
      children: [
        {
          title: 'Listing',
          key: 'book-list',
          url: '/book-list',
        },
        {
          key: 'book-edit',
          title: 'Register',
          url: '/book-edit',
        },
      ],
    },
    {
      title: 'Author',
      key: 'author',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'author-edit',
          title: 'Register',
          url: '/author-edit',
        },
      ],
    },
  ]
}
