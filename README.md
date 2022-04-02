# react-native-horizontal-scroll-menu

React native scrolling button horizontal

## Installation

```bash
npm i react-native-horizontal-scroll-menu
```

```bash
yarn add react-native-horizontal-scroll-menu
```

## Usage

```JavaScript

import HorizontalScrollMenu from 'react-native-horizontal-scroll-menu';


let menus = [
    {
        id: 'id-1',
        name: 'Menu Item 1',
    },
    {
        id: 'id-2',
        name: 'Menu Item 2',
    }
];

<ScrollingButtonMenu
    items={menus}
    onPress={(e) => {
        console.log(e);
    }}
    selected={"id-2"}
/>

```
