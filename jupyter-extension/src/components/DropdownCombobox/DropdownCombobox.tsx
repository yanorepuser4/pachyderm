import React from 'react';

import {useCombobox} from 'downshift';

export type DropdownComboboxProps = {
  items: string[];
  initialSelectedItem?: string | null;
  placeholder?: string;
  onSelectedItemChange?: (selectedItem: string) => void;
};

export const DropdownCombobox: React.FC<DropdownComboboxProps> = ({
  initialSelectedItem,
  items,
  placeholder,
  onSelectedItemChange,
}) => {
  const [inputItems, setInputItems] = React.useState(items);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: inputItems,
    initialIsOpen: initialSelectedItem ? false : true,
    initialSelectedItem: initialSelectedItem,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        inputValue
          ? items.filter((item) =>
              item.toLowerCase().startsWith(inputValue.toLowerCase()),
            )
          : items,
      );
    },
    onIsOpenChange: ({isOpen, selectedItem}) => {
      if (isOpen && selectedItem) {
        selectItem(null);
      }
    },
    onSelectedItemChange: ({selectedItem}) => {
      if (!selectedItem) {
        return;
      }

      onSelectedItemChange(selectedItem);
    },
  });

  // TODO: Consider clearing the text on click
  // TODO: Show the five most recents first potentially with a separator
  // TODO: Post about this in #nbredesign channel. Potentially
  return (
    <div className="pachyderm-DropdownCombobox">
      <div className="bp3-input-group jp-InputGroup">
        <input
          {...getInputProps()}
          className="bp3-input"
          data-testid="DropdownCombobox-input"
          placeholder={placeholder}
        />
      </div>
      <ul {...getMenuProps()} data-testid="DropdownCombobox-ul">
        {(isOpen || !selectedItem) &&
          inputItems.map((item, index) => (
            <li
              style={{
                backgroundColor: highlightedIndex === index ? '#bde4ff' : '',
              }}
              data-testid={`DropdownCombobox-li-${item}`}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropdownCombobox;
