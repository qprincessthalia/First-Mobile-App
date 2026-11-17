import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'; // Handles the navigation of the whole app.
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Creates a stack system that manages the order of screens.
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { ThemeProvider, useTheme, fonts } from './theme/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

import HomeScreen from './Screen/HomeScreen';
import LogIn from './Screen/LogIn';
import Choose from './Screen/Choose';
import EnterTask from './Screen/EnterTask';
import ConfirmTask from './Screen/ConfirmTask';
import MyTask from './Screen/MyTask';
import SortedActivity from './Screen/SortedActivity';
import MenuBar from './Screen/MenuBar';
import StatusUpdate from './Screen/StatusUpdate';
import Status from './Screen/Status';

const Stack = createNativeStackNavigator();
// Creates the Stack Navigator that will manage the screens.

// All screens live here. It reads the current theme (light or dark).
function AppNavigator() {
  const { isDark, colors } = useTheme();

  // Gives React Navigation the same colors as the app theme.
  const base = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  // Shared look for every screen. The back arrow is hidden, and the
  // header shows the theme button + the menu button on the right.
  const screenOptions = ({ navigation }) => ({
    headerBackVisible: false, // removes the arrow on the left
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    headerTitleStyle: { fontFamily: fonts.semiBold, fontSize: 18 },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.background },
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeToggle />
        <MenuBar navigation={navigation} />
      </View>
    ),
  });

  // Screens that only show the theme button (no menu).
  const themeOnly = { headerRight: () => <ThemeToggle /> };

  return (
    <NavigationContainer theme={navigationTheme}>

      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>

        <Stack.Screen name="Home" component={HomeScreen} options={themeOnly} />

        <Stack.Screen name="Start" component={LogIn} options={themeOnly} />

        <Stack.Screen name="Activity" component={Choose} />

        <Stack.Screen name="Enter Task" component={EnterTask} />

        <Stack.Screen name="Confirm Task" component={ConfirmTask} />

        <Stack.Screen name="My Tasks" component={MyTask} />

        <Stack.Screen name="Sorted Activity" component={SortedActivity} />

        <Stack.Screen name="Status Update" component={StatusUpdate} />

        <Stack.Screen name="Status" component={Status} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  // Loads Poppins before showing any screen.
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}


// ---- COMPONENTS:
//HomeScreen
//LogIn
//Choose
//EnterTask
//ConfirmTask
//MyTask
//SortedActivity
//MenuBar
//StatusUpdate
//Status

// -----React Navigation components — 3
//NavigationContainer
//Stack.Navigator
//Stack.Screen

//main component
//app