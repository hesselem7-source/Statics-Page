import { useState, useCallback } from "react";

/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @param {Object} props
 * @param {string[]} props.initialMenuItems - Initial array of menu item strings
 * @returns Component
 */
export default function Sidebar({ initialMenuItems = [] }) {
  // State to hold the current menu items, initialized from prop
  let [menuItems, setMenuItems] = useState(initialMenuItems);

  // State to hold the new menu item input value
  let [newMenuItem, setNewMenuItem] = useState("");

  // State to hold the filter text
  let [filter, setFilter] = useState("");

  // Callback to add a new menu item
  let addMenuItem = useCallback(() => {
    if (newMenuItem.trim()) {
      setMenuItems([...menuItems, newMenuItem]);
      setNewMenuItem("");
    }
  }, [menuItems, newMenuItem]);

  // Filter menu items based on the filter text using case-insensitive regex
  let filteredMenuItems = menuItems.filter((item) => {
    if (!filter) return true;
    const regex = new RegExp(filter, "i");
    return regex.test(item);
  });

  return (
    <div>
      {/* Input to add a new menu item */}
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
      />
      <br />

      {/* Button to add the new menu item */}
      <button onClick={addMenuItem}>Add Item</button>
      <br />

      {/* Input to filter the menu items */}
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..."
      />

      {/* Render the filtered menu items */}
      <ul>
        {filteredMenuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
