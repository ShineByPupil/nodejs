const router = require("../router");
const connection = require("../db");

function formatMenu(menuItems, parentId = null) {
  const nestedItems = [];

  for (const menuItem of menuItems) {
    if (menuItem.parent_id === parentId) {
      const nestedItem = {
        id: menuItem.id,
        name: menuItem.name,
        label: menuItem.name,
        route: menuItem.route,
        route_name: menuItem.route_name,
        children: formatMenu(menuItems, menuItem.id),
      };

      nestedItems.push(nestedItem);
    }
  }

  return nestedItems;
}

router.get("/getMenu", (req, res) => {
  connection.query("SELECT * FROM menu", (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "操作失败", error });
    } else {
      res.json({ menu_list: formatMenu(results) });
    }
  });
});
