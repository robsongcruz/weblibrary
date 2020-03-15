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
      title: 'Dashboard',
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
          title: 'Register2',
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
          title: 'List',
          key: 'author-list',
          url: '/author-list',
        },
        {
          key: 'author-edit',
          title: 'Register',
          url: '/author-edit',
        },
        {
          key: 'author-details',
          title: 'Register1',
          url: '/author-details',
        },
        {
          key: 'author-catalog',
          title: 'Register3',
          url: '/author-catalog',
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
      title: 'Default Pages',
      key: 'defaultPages',
      icon: 'icmn icmn-file-text',
      children: [
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
      ],
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
      title: 'Dashboard',
      key: 'home',
      url: '/home/',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Titles',
      key: 'list-titles',
      url: '/titles',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'Top List',
      key: 'top-list',
      url: '/top-titles',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'AntDesign Components',
      key: 'antComponents',
      icon: 'icmn icmn-menu',
      url: '/pages/antd',
    },
    {
      title: 'Default Pages',
      key: 'defaultPages',
      icon: 'icmn icmn-file-text',
      children: [
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
      ],
    },
  ]
}
