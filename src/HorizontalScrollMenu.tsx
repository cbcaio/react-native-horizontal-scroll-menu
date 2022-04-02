import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  LayoutRectangle,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('window');

type MenuItem = {
  id: string;
  name: string;
};

type HorizontalScrollMenu = {
  items: Array<MenuItem>;
  onPress: (route: MenuItem) => void;
  upperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeColor: string;
  activeBackgroundColor?: string;
  selectedItemId?: string;
  selectedOpacity?: number;
  containerStyle?: object;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
};

export const HorizontalScrollMenu: React.FC<HorizontalScrollMenu> = ({
  items,
  onPress,
  upperCase = false,
  textStyle,
  buttonStyle,
  activeColor = '',
  activeBackgroundColor = '#1e1e1e',
  selectedItemId,
  selectedOpacity = 0.7,
  containerStyle = {},
  keyboardShouldPersistTaps = 'always',
}) => {
  const [activeMenuId, setActiveMenuId] = useState(selectedItemId);

  const scrollViewRef = useRef<ScrollView>(null);
  const dataSourceCords: { [key: string]: LayoutRectangle } = {};

  useEffect(() => {
    if (selectedItemId !== activeMenuId) {
      setActiveMenuId(activeMenuId);
      _scrollTo();
    }
  }, [selectedItemId]);

  const _scrollTo = () => {
    const screen1 = screenWidth / 2;
    const elementOffset = activeMenuId
      ? dataSourceCords[activeMenuId]
      : undefined;
    if (
      elementOffset !== undefined &&
      typeof scrollViewRef.current?.scrollTo === 'function'
    ) {
      let x = elementOffset.x - (screen1 - elementOffset.width / 2);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 0,
          x: x,
          animated: true,
        });
      }
    }
  };

  return (
    <View style={[styles.scrollArea, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={200}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {items.map((menuItem, i) => (
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeMenuId === menuItem.id && styles.tabItemFocused,
              buttonStyle ? buttonStyle : styles.buttonStyles,
              activeMenuId === menuItem.id && activeBackgroundColor
                ? { backgroundColor: activeBackgroundColor }
                : false,
            ]}
            key={(menuItem.id ? menuItem.id : i).toString()}
            onPress={() => {
              setActiveMenuId(menuItem.id);
              setTimeout(() => {
                _scrollTo();
                return onPress(menuItem);
              }, 50);
            }}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              dataSourceCords[menuItem.id] = layout;
            }}
            activeOpacity={selectedOpacity}
          >
            <Text
              style={[
                textStyle ? textStyle : styles.tabItemText,
                activeMenuId == menuItem.id && styles.tabItemTextFocused,
                activeMenuId == menuItem.id && activeColor
                  ? { color: activeColor }
                  : false,
              ]}
            >
              {upperCase ? menuItem.name.toUpperCase() : menuItem.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  scroll: {},
  scrollContainer: {},
  tabItem: {
    borderRadius: 18,
    borderColor: '#858585',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
  },
  tabItemText: {
    color: '#5d5d5d',
    //fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    lineHeight: 20,
  },
  tabItemFocused: {
    borderWidth: 0,
  },
  tabItemTextFocused: {
    color: '#fff',
  },
  buttonStyles: {},
});
