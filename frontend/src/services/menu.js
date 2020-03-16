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
    {
      divider: true,
    },
    // {
    //   title: 'AntDesign Components',
    //   key: 'antComponents',
    //   icon: 'icmn icmn-menu',
    //   url: '/pages/antd',
    // },
    // {
    //   title: 'Default Pages',
    //   key: 'defaultPages',
    //   icon: 'icmn icmn-file-text',
    //   children: [
    //     {
    //       key: 'register',
    //       title: 'Register',
    //       url: '/pages/register',
    //       pro: true,
    //     },
    //     {
    //       key: 'lockscreen',
    //       title: 'Lockscreen',
    //       url: '/pages/lockscreen',
    //       pro: true,
    //     },
    //   ],
    // },
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
