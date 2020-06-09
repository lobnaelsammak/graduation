import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './homestack';
import HistoryStack from './aboutStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Requests: {
    screen: HomeStack,
  },
  History: {
    screen: HistoryStack,
  },
});

export default createAppContainer(RootDrawerNavigator);