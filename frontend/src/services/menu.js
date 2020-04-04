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
  ]
}
