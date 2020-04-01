import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import Theme from '../theme';

// TODO: search bar

export const Toolbar = (props) => {
  const { menu, onMenuItemSelect, onSearch, onBackPress, title } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuSelect = (index) => () => {
    setMenuVisible(false);
    onMenuItemSelect(index);
  };

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Appbar dark>
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {onSearch && <Appbar.Action icon="magnify" color={Theme.colors.text} />}
      {menu && (
        <>
          <Menu
            visible={menuVisible}
            onDismiss={onMenuActionPress}
            anchor={
              <Appbar.Action
                color={Theme.colors.text}
                icon="dots-vertical"
                onPress={onMenuActionPress}
              />
            }
          >
            {menu.map((item, index) => (
              <Menu.Item key={index} {...item} onPress={onMenuSelect(index)} />
            ))}
          </Menu>
        </>
      )}
    </Appbar>
  );
};
