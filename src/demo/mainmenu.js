export const MENU = [
  {
    label: "Accounts",
    icon: "users",
    href: "/subscribers"
  },
  {
    label: "Store",
    icon: "shop",
    items: [
      {
        label: "Products",
        href: "/products"
      },
      {
        label: "Billing Plans",
        href: "/plans"
      },
      {
        label: "Asset Packages",
        href: "/packages"
      }
    ]
  },
  {
    label: "Channels",
    icon: "player",
    href: "/channels"
  },
  {
    label: "On Demand",
    icon: "database",
    href: "/channels"
  },
  {
    label: "Live Events",
    icon: "broadcast",
    href: "/channels"
  },
  {
    label: "Promotion",
    icon: "carousel",
    items: [
      {
        label: "Pages",
        href: "/promotion/pages/"
      },
      {
        label: "Collections",
        href: "/promotion/collections/"
      },
      {
        label: "Banners",
        href: "/promotion/banners/"
      }
    ]
  },
  {
    label: "Monitor",
    icon: "dashboard",
    items: [
      {
        label: "Dashboards",
        href: "/dashboards"
      }
    ]
  },
  {
    label: "Administration",
    icon: "settings",
    items: [
      {
        label: "Members",
        href: "#"
      },
      {
        label: "Regions",
        href: "/regions"
      },
      {
        label: "Custom Attributes",
        href: "/#"
      }
    ]
  }
];

export const AUX_MENU = [
  {
    label: "Nathan Young",
    icon: "profile-circle",
    items: [
      {
        label: "Sign Out",
        href: "/logout"
      }
    ]
  }
];
