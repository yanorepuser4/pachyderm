import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import DropdownCombobox, {DropdownComboboxProps} from '../DropdownCombobox';

describe('DropdownCombobox', () => {
  it('should render placeholder', async () => {
    const {getByTestId} = render(
      <DropdownCombobox
        items={[]}
        placeholder="placeholder"
        onSelectedItemChange={() => {
          // Do nothing
        }}
      />,
    );

    const input = getByTestId('DropdownCombobox-input');
    expect(input).toHaveAttribute('placeholder', 'placeholder');
  });

  it('should select initial item', async () => {
    const {getByTestId} = render(
      <DropdownCombobox
        items={['item1', 'item2', 'item3']}
        initialSelectedItem="item1"
        onSelectedItemChange={() => {
          // Do nothing
        }}
      />,
    );

    const input = getByTestId('DropdownCombobox-input');
    expect(input).toHaveValue('item1');
    const ul = getByTestId('DropdownCombobox-ul');
    expect(ul.children).toHaveLength(0);
  });

  it('should filter items based on input', async () => {
    const {getByTestId} = render(
      <DropdownCombobox
        items={['foo', 'bar']}
        onSelectedItemChange={() => {
          // Do nothing
        }}
      />,
    );

    let ul = getByTestId('DropdownCombobox-ul');
    expect(ul.children).toHaveLength(2);
    const liFoo = getByTestId('DropdownCombobox-li-foo');
    expect(liFoo).toHaveTextContent('foo');
    let liBar = getByTestId('DropdownCombobox-li-bar');
    expect(liBar).toHaveTextContent('bar');

    const input = getByTestId('DropdownCombobox-input');
    fireEvent.change(input, {target: {value: 'ba'}});

    ul = getByTestId('DropdownCombobox-ul');
    expect(ul.children).toHaveLength(1);
    liBar = getByTestId('DropdownCombobox-li-bar');
    expect(liBar).toHaveTextContent('bar');
  });

  // TODO: test for onSelectedItemChange trigger
  // TODO: test for clearing out selectedItem on isOpen
});
